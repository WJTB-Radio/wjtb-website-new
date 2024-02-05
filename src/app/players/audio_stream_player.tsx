"use client";

import { MutableRefObject, Ref, useEffect, useRef, useState } from "react";
import { applyDelayCorrection, delay_correction_interval, teleportDelayCorrection} from "../utils/delay_correction";
import styles from "./audio_stream_player.module.scss";
import { getSnowflake } from "../utils/snowflake";

// snowflake ensures we do not cache a previously served stream
const snowflake = getSnowflake();

export default function AudioStreamPlayer() {
	const audio: MutableRefObject<HTMLAudioElement> | MutableRefObject<null> = useRef(null);
	const [playing, setPlaying] = useState(false);

	useEffect(() => {
		const id = setInterval(() => {
			applyDelayCorrection(audio.current);
		}, delay_correction_interval);
		return () => {
			clearInterval(id);
		};
	});

	function onAudioPause() {
		if(audio.current == null) {
			return;
		}
		setPlaying(false);
	}

	function onAudioPlaying() {
		if(audio.current == null) {
			return;
		}
		teleportDelayCorrection(audio.current);
		setPlaying(true);
	}

	function togglePlaying() {
		if(audio.current == null) {
			return;
		}
		if(playing) {
			audio.current.pause();
		} else {
			audio.current.play();
		}
	}

	return (
		<div className={styles.player}>
			<audio src={`https://stream.njit.edu:8000/stream1.mp3?${snowflake}`}
			ref={audio} onPause={onAudioPause} onPlaying={onAudioPlaying}></audio>
			<button onClick={togglePlaying} className={playing?styles.pause_button:styles.play_button}>
				{playing?"Pause":"Play"}
				<div className={styles.pause_icon}></div>
			</button>
		</div>
	);
}