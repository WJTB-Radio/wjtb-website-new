"use client";

import { useState } from "react";
import styles from "./players.module.scss";
import VideoStreamPlayer from "./video_stream_player";
import AudioStreamPlayer from "./audio_stream_player";

export default function Players() {
	const [videoEnabled, setVideoEnabled] = useState(true);
	function onVideoError() {
		setVideoEnabled(false);
	}
	return (
		<div className={styles.players}>
			<div className={`${styles.video_player} ${!videoEnabled && styles.hidden}`}>
				<VideoStreamPlayer videoErrorEvent={onVideoError}/>
			</div>
			<div className={`${styles.audio_player} ${videoEnabled && styles.hidden}`}>
				<p>Video couldn't load. Here is a fallback audio stream.</p>
				<AudioStreamPlayer />
			</div>
		</div>
	);
}