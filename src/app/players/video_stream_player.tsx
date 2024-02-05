"use client";

import { MouseEventHandler, MutableRefObject, Ref, useEffect, useRef, useState } from "react";
import { applyDelayCorrection, delay_correction_interval, teleportDelayCorrection} from "../utils/delay_correction";
import styles from "./video_stream_player.module.scss";
import { getSnowflake } from "../utils/snowflake";

// snowflake ensures we do not cache a previously served stream
const snowflake = getSnowflake();

export default function VideoStreamPlayer() {
	const video: MutableRefObject<HTMLVideoElement> | MutableRefObject<null> = useRef(null);
	const [playing, setPlaying] = useState(false);
	const [hovering, setHovering] = useState(false);
	const [fullscreen, setFullscreen] = useState(false);
	const touch = useRef(false);
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
		if(hoverTimeout.current != -1) {
			window.clearTimeout(hoverTimeout.current);
		}
		const timeout = window.setTimeout(() => {
			setHovering(false);
			hoverTimeout.current = -1;
		}, 1000);
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
		if(video.current == null || touch.current) {
			return;
		}
		if(playing) {
			video.current.pause();
		} else {
			video.current.play();
		}
	}

	function onMouseMove(event: React.MouseEvent) {
		if(touch.current) {
			return;
		}
		touch.current = false;
		interact();
	}

	function onTouchStart(event: React.TouchEvent) {
		if(event.target != player.current) {
			return;
		}
		touch.current = event.touches.length > 0;
		if(!hovering) {
			startHoverTimer();
		}
		setHovering(!hovering);
	}

	function onTouchEnd(event: React.TouchEvent) {
		window.setTimeout(() => {
			touch.current = event.touches.length > 0;
		}, 5);
	}

	function onMouseLeave() {
		setHovering(false);
	}

	function toggleFullscreen() {
		if(player.current == null || touch.current) {
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

	return (
		<div className={styles.player} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd} ref={player}>
			<video className={styles.video} src={`https://upload.wikimedia.org/wikipedia/commons/d/d5/Affectionate_lions.webm?${snowflake}`}
			ref={video} onPause={onVideoPause} onPlaying={onVideoPlaying}></video>
			<div className={`${styles.video_shadow} ${!hovering && styles.hidden}`}></div>
			<button onClick={togglePlaying} onFocus={interact} className={`${playing?styles.pause_button:styles.play_button} ${!hovering && styles.hidden}`}>
				{playing?"Pause Video":"Play Video"}
				<div className={styles.pause_icon}></div>
			</button>
			<button onClick={toggleFullscreen} onFocus={interact} className={`${styles.fullscreen_button} ${fullscreen?styles.enabled:styles.disabled} ${!hovering && styles.hidden}`}>
				{fullscreen?"Disable Fullscreen Video":"Enable Fullscreen Video"}
			</button>
		</div>
	);
}