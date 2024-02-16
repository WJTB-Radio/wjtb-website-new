import styles from "../global.module.scss";

export default function Join() {
	return (
		<div className={styles.main_content}>
			<h1>For members and fans</h1>
			<p>
				The best way to connect with us is through <a href="https://wjtb.njit.edu/discord" target="_blank">Discord</a> or through <a href="https://www.tiktok.com/@wjtbradio" target="_blank">TikTok</a>, <a href="https://www.instagram.com/wjtb_radio/"target="_blank">Instagram</a>, and <a href="https://www.twitch.tv/wjtb" target="_blank">Twitch</a>.
			</p>
			<p>
				Not a member yet? Join us! WJTB is always looking for new members to help out at live shows, help around the studio, and
				spread their love of music. All members must be registered on <a href=
					"https://njit.campuslabs.com/engage/organization/wjtb" target="_blank">Highlander Hub</a>.
			</p>
			<h1>Want your music played?</h1>
			<p>
				Send us an <a href="mailto:wjtbradio@gmail.com">email</a> at wjtbradio@gmail.com.
			</p>
		</div>
	);
}