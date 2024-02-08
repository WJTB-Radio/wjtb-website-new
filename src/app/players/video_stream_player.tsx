"use client";

import { MutableRefObject, useEffect, useRef, useState } from "react";
import { applyDelayCorrection, delay_correction_interval, teleportDelayCorrection} from "../utils/delay_correction";
import styles from "./video_stream_player.module.scss";
import Volume from "./volume";
import Hls from "hls.js";

type TouchRef = {identifier: number, startX: number, startY: number};

export default function VideoStreamPlayer({videoErrorEvent}: {videoErrorEvent: () => void}) {
	const video = useRef<HTMLVideoElement | null>(null);
	const [playing, setPlaying] = useState(false);
	const [hovering, setHovering] = useState(false);
	const [fullscreen, setFullscreen] = useState(false);
	const [touch, setTouch] = useState(false);
	const touches = useRef<Array<TouchRef>>([]);
	const hoverTimeout = useRef(-1);
	const touchTimeout = useRef(-1);
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
		if(hoverTimeout.current != -1) {
			window.clearTimeout(hoverTimeout.current);
		}
		const timeout = window.setTimeout(() => {
			setHovering(false);
			hoverTimeout.current = -1;
		}, 3000);
		hoverTimeout.current = timeout;
	}

	function onVideoPause() {
		if(video.current == null) {
			return;
		}
		setPlaying(false);
		interact();
	}

	function onVideoPlaying() {
		if(video.current == null) {
			return;
		}
		teleportDelayCorrection(video.current);
		setPlaying(true);
		interact();
	}

	function togglePlaying() {
		if(video.current == null) {
			return;
		}
		if(playing) {
			video.current.pause();
		} else {
			video.current.play();
		}
	}

	function onMouseMove(event: React.MouseEvent) {
		if(touch) {
			return;
		}
		interact();
	}

	function onTouchStart(event: React.TouchEvent) {
		for(let i = 0; i < event.changedTouches.length; i++) {
			const t = event.changedTouches[i]
			touches.current.push({
				identifier: t.identifier,
				startX: t.clientX,
				startY: t.clientY,
			});
		}
		if(touchTimeout.current != -1) {
			window.clearTimeout(touchTimeout.current);
		}
		setTouch(true);
	}

	function onTouchEnd(event: React.TouchEvent) {
		if(event.touches.length > 0) {
			return;
		}
		if(touchTimeout.current != -1) {
			window.clearTimeout(touchTimeout.current);
		}
		touchTimeout.current = window.setTimeout(() => {
			setTouch(false);
		}, 500);
		window.setTimeout(() => {
			if(!hovering) {
				startHoverTimer();
			}
			setHovering(!hovering);	
		}, 1);
	}

	function onTouchMove(event: React.TouchEvent) {
		for(let i = 0; i < event.changedTouches.length; i++) {
			const t = event.changedTouches[i]
			touches.current.push({
				identifier: t.identifier,
				startX: t.clientX,
				startY: t.clientY,
			});
		}
	}

	function onMouseLeave() {
		setHovering(false);
	}

	function toggleFullscreen() {
		if(player.current == null) {
			return;
		}
		interact();
		if(fullscreen) {
			document.exitFullscreen();
		} else {
			player.current.requestFullscreen({navigationUI: "hide"});
		}
	}

	useEffect(() => {
		if(player.current == null) {
			return;
		}
		function onFullscreenChanged() {
			if(document.fullscreenElement == null) {
				setFullscreen(false);
			} else {
				setFullscreen(true);
			}
		}
		player.current.addEventListener("fullscreenchange", onFullscreenChanged);
		return () => {
			if(player.current == null) {
				return;
			}
			player.current.removeEventListener("fullscreenchange", onFullscreenChanged);
		};
	});

	function onVolumeChange(volume: number) {
		if(video.current == null) {
			return;
		}
		video.current.volume = volume;
		interact();
	}

	function onMuteChange(muted: boolean) {
		if(video.current == null) {
			return;
		}
		video.current.muted = muted;
		interact();
	}

	const videoSrc = "http://127.0.0.1:8888/test/stream.m3u8";

	useEffect(() => {
		if(video.current == null) {
			return;
		}
		if (Hls.isSupported()) {
			var hls = new Hls();
			hls.loadSource(videoSrc);
			hls.attachMedia(video.current);
			hls.on(Hls.Events.ERROR, () => {
				onVideoError();
			});
			hls.on(Hls.Events.MANIFEST_PARSED, () => {
				if(video.current == null) {
					return;
				}
				video.current.muted = true;
				video.current.play();
			});
		} else if (video.current.canPlayType('application/vnd.apple.mpegurl')) {
			video.current.src = videoSrc;
		}
	}, []);

	function onVideoError() {
		videoErrorEvent();
	}

	return (
		<div className={styles.player} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd} onTouchMove={onTouchMove} ref={player}>
			<video tabIndex={-1} title="WJTB Radio video stream." className={styles.video} onError={onVideoError}
			ref={video} onPause={onVideoPause} onPlaying={onVideoPlaying}></video>
			<div className={`${styles.video_shadow} ${!hovering && styles.hidden}`}></div>
			<button onClick={togglePlaying} onFocus={interact} className={`${playing?styles.pause_button:styles.play_button} ${!hovering && styles.hidden}`}>
				{playing?"Pause Video":"Play Video"}
				<div className={styles.pause_icon}></div>
			</button>
			<div className={styles.volume}>
				<Volume hidden={!hovering} touch={touch} muteChangeEvent={onMuteChange} volumeChangeEvent={onVolumeChange}/>
			</div>
			<button onClick={toggleFullscreen} onFocus={interact} className={`${styles.fullscreen_button} ${fullscreen?styles.enabled:styles.disabled} ${!hovering && styles.hidden}`}>
				{fullscreen?"Disable Fullscreen Video":"Enable Fullscreen Video"}
				<div className={styles.fullscreen_icon}></div>
			</button>
		</div>
	);
}