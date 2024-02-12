"use client";

import { MutableRefObject, useEffect, useRef, useState } from "react";
import { applyDelayCorrection, delay_correction_interval, teleportDelayCorrection} from "../utils/delay_correction";
import styles from "./audio_stream_player.module.scss";
import { getSnowflake } from "../utils/snowflake";
import Volume, { VolumeHandle } from "./volume";
import { TouchRef, onTouchEnd, onTouchMove, onTouchStart } from "../utils/touch_detection";

// snowflake ensures we do not cache a previously served stream
const snowflake = getSnowflake();

export default function AudioStreamPlayer({hidden}: {hidden: boolean}) {
	const audio = useRef<HTMLAudioElement | null>(null);
	const [playing, setPlaying] = useState(false);
	const volume = useRef<VolumeHandle | null> (null);

	const [touch, setTouch] = useState(false);
	const touches = useRef<Array<TouchRef>>([]);
	const touchTimeout = useRef(-1);

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

	function onVolumeChange(volume: number) {
		if(audio.current == null) {
			return;
		}
		audio.current.volume = volume;
	}

	function onMuteChange(muted: boolean) {
		if(audio.current == null) {
			return;
		}
		audio.current.muted = muted;
	}

	useEffect(() => {
		if(hidden) {
			setPlaying(false);
			if(audio.current != null) {
				audio.current.pause();
			}
		}
	}, [hidden]);

	useEffect(() => {
		if(volume.current == null) {
			return;
		}
		volume.current.setMuted(false);
		volume.current.setVolume(1.0);
	}, []);

	return (
		<div className={styles.player}
			onTouchStart={onTouchStart.bind(null, touches, touchTimeout, setTouch)}
			onTouchEnd={onTouchEnd.bind(null, touches, touchTimeout, () => {}, setTouch, null)}
			onTouchMove={onTouchMove.bind(null, touches)}>
			<audio src={`https://stream.njit.edu:8000/stream1.mp3?${snowflake}`}
				ref={audio} onPause={onAudioPause} onPlaying={onAudioPlaying}></audio>
			<button onClick={togglePlaying} className={playing?styles.pause_button:styles.play_button}>
				{playing?"Pause":"Play"}
				<div className={styles.pause_icon}></div>
			</button>
			<div className={styles.volume_container}>
				<Volume ref={volume} hidden={false} touch={touch} media={audio} volumeChangeEvent={onVolumeChange} muteChangeEvent={onMuteChange}/>
			</div>
		</div>
	);
}