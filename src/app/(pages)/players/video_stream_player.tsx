"use client";

import {
	forwardRef,
	useCallback,
	useEffect,
	useImperativeHandle,
	useRef,
	useState,
} from "react";
import {
	applyDelayCorrection,
	delay_correction_interval,
	teleportDelayCorrection,
} from "../../utils/delay_correction";
import styles from "./video_stream_player.module.scss";
import Volume from "./volume";
import Hls from "hls.js";
import {
	TouchRef,
	onTouchEnd,
	onTouchMove,
	onTouchStart,
} from "../../utils/touch_detection";
import { getSnowflake } from "@/app/utils/snowflake";

export type VideoStreamPlayerHandle = {
	reloadVideo: () => void;
};

type Props = {
	videoErrorEvent: () => void;
	hidden: boolean;
};

const VideoStreamPlayer = forwardRef<VideoStreamPlayerHandle, Props>(
	function VideoStreamPlayer({ videoErrorEvent, hidden }, ref) {
		const video = useRef<HTMLVideoElement | null>(null);
		const [playing, setPlaying] = useState(false);
		const [hovering, setHovering] = useState(false);
		const [fullscreen, setFullscreen] = useState(false);
		const [touch, setTouch] = useState(false);
		const touches = useRef<Array<TouchRef>>([]);
		const touchTimeout = useRef(-1);
		const hoverTimeout = useRef(-1);
		const player = useRef<HTMLDivElement | null>(null);

		useEffect(() => {
			const id = setInterval(() => {
				applyDelayCorrection(video.current);
			}, delay_correction_interval);
			return () => {
				clearInterval(id);
			};
		});

		function interact() {
			setHovering(true);
			startHoverTimer();
		}

		function startHoverTimer() {
			if (hoverTimeout.current != -1) {
				window.clearTimeout(hoverTimeout.current);
			}
			const timeout = window.setTimeout(() => {
				setHovering(false);
				hoverTimeout.current = -1;
			}, 3000);
			hoverTimeout.current = timeout;
		}

		function onVideoPause() {
			if (video.current == null) {
				return;
			}
			setPlaying(false);
			interact();
		}

		function onVideoPlaying() {
			if (video.current == null) {
				return;
			}
			teleportDelayCorrection(video.current);
			setPlaying(true);
			interact();
		}

		function togglePlaying() {
			if (video.current == null) {
				return;
			}
			if (playing) {
				video.current.pause();
			} else {
				video.current.play().catch(() => {
					onVideoError();
				});
			}
		}

		function onMouseMove(event: React.MouseEvent) {
			if (touch) {
				return;
			}
			interact();
		}

		function onTap() {
			if (!hovering) {
				startHoverTimer();
			}
			setHovering(!hovering);
		}

		function onMouseLeave() {
			setHovering(false);
		}

		function toggleFullscreen() {
			if (player.current == null) {
				return;
			}
			interact();
			if (fullscreen) {
				document.exitFullscreen();
			} else {
				player.current.requestFullscreen({ navigationUI: "hide" });
			}
		}

		useEffect(() => {
			if (player.current == null) {
				return;
			}
			const p = player.current;
			function onFullscreenChanged() {
				if (document.fullscreenElement == null) {
					setFullscreen(false);
				} else {
					setFullscreen(true);
				}
			}
			p.addEventListener("fullscreenchange", onFullscreenChanged);
			return () => {
				p.removeEventListener("fullscreenchange", onFullscreenChanged);
			};
		});

		function onVolumeChange(volume: number) {
			if (video.current == null) {
				return;
			}
			video.current.volume = volume;
			interact();
		}

		function onMuteChange(muted: boolean) {
			if (video.current == null) {
				return;
			}
			video.current.muted = muted;
			interact();
		}

		const videoSrc =
			"https://stream.alarabread.fun:8888/stream2/index.m3u8";

		const onVideoError = useCallback(() => {
			videoErrorEvent();
		}, [videoErrorEvent]);

		const loadVideo = useCallback(() => {
			if (video.current == null) {
				return;
			}
			if (Hls.isSupported()) {
				let hls = new Hls();
				hls.loadSource(videoSrc + `?${getSnowflake()}`);
				hls.attachMedia(video.current);
				hls.on(Hls.Events.ERROR, (event, data) => {
					console.error(event, data);
					hls.detachMedia();
					onVideoError();
				});
				hls.on(Hls.Events.MANIFEST_PARSED, () => {
					if (video.current == null) {
						return;
					}
					video.current.muted = true;
					video.current.play().catch(() => {
						onVideoError();
					});
				});
			} else if (
				video.current.canPlayType("application/vnd.apple.mpegurl")
			) {
				video.current.src = videoSrc;
			} else {
				videoErrorEvent();
			}
		}, [onVideoError, videoErrorEvent]);

		useEffect(() => {
			loadVideo();
		}, [loadVideo]);

		useEffect(() => {
			if (hidden) {
				setPlaying(false);
				if (video.current != null) {
					video.current.pause();
				}
			}
		}, [hidden]);

		useImperativeHandle(
			ref,
			() => {
				return {
					reloadVideo() {
						loadVideo();
					},
				};
			},
			[loadVideo]
		);

		return (
			<div
				className={styles.player}
				onMouseMove={onMouseMove}
				onMouseLeave={onMouseLeave}
				onTouchStart={onTouchStart.bind(
					null,
					touches,
					touchTimeout,
					setTouch
				)}
				onTouchEnd={onTouchEnd.bind(
					null,
					touches,
					touchTimeout,
					onTap,
					setTouch,
					player
				)}
				onTouchMove={onTouchMove.bind(null, touches)}
				ref={player}
			>
				<video
					tabIndex={-1}
					title="WJTB Radio video stream."
					className={styles.video}
					onError={onVideoError}
					ref={video}
					onPause={onVideoPause}
					onPlaying={onVideoPlaying}
				></video>
				<div
					className={`${styles.video_shadow} ${
						!hovering && styles.hidden
					}`}
				></div>
				<button
					onClick={togglePlaying}
					onFocus={interact}
					className={`${
						playing ? styles.pause_button : styles.play_button
					} ${!hovering && styles.hidden}`}
				>
					{playing ? "Pause Video" : "Play Video"}
					<div className={styles.pause_icon}></div>
				</button>
				<div className={styles.volume}>
					<Volume
						hidden={!hovering}
						touch={touch}
						muteChangeEvent={onMuteChange}
						volumeChangeEvent={onVolumeChange}
						media={video}
					/>
				</div>
				{/*
					// fullscreen crashes playback on firefox for some reason
					globalThis?.navigator?.userAgent?.includes("Firefox") ? (
						<></>
					) : (
						<button
							onClick={toggleFullscreen}
							onFocus={interact}
							className={`${styles.fullscreen_button} ${
								fullscreen ? styles.enabled : styles.disabled
							} ${!hovering && styles.hidden}`}
						>
							{fullscreen
								? "Disable Fullscreen Video"
								: "Enable Fullscreen Video"}
							<div className={styles.fullscreen_icon}></div>
						</button>
					)
				*/}
			</div>
		);
	}
);

export default VideoStreamPlayer;
