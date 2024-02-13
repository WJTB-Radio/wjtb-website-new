"use client";

import { useRef, useState } from "react";
import styles from "./players.module.scss";
import VideoStreamPlayer, { VideoStreamPlayerHandle } from "./video_stream_player";
import AudioStreamPlayer from "./audio_stream_player";

export default function Players() {
	const [videoEnabled, setVideoEnabled] = useState(true);
	const videoPlayer = useRef<null | VideoStreamPlayerHandle>(null);

	function onVideoError() {
		setVideoEnabled(false);
	}

	function reloadVideo() {
		if(videoPlayer.current == null) {
			return;
		}
		videoPlayer.current.reloadVideo();
		setVideoEnabled(true);
	}

	return (
		<div className={styles.players}>
			<div className={`${styles.video_player} ${!videoEnabled && styles.hidden}`}>
				<VideoStreamPlayer videoErrorEvent={onVideoError} ref={videoPlayer} hidden={!videoEnabled}/>
			</div>
			<div className={`${styles.audio_player} ${videoEnabled && styles.hidden}`}>
				<p>Video couldn&apos;t load. Here is a fallback audio stream.</p>
				<AudioStreamPlayer hidden={videoEnabled}/>
				<button onClick={reloadVideo} className={`${styles.styled_button} ${styles.reload_button}`}>
					Try Reloading Video
				</button>
			</div>
		</div>
	);
}