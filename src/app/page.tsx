import AudioStreamPlayer from "./players/audio_stream_player";
import VideoStreamPlayer from "./players/video_stream_player";
import styles from "./page.module.scss";

export default function Home() {
	return (
		<main className={styles.main}>
			<VideoStreamPlayer />
		</main>
	);
}
