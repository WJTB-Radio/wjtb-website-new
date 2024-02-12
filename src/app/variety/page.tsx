import styles from "../global.module.scss";

export default function Variety() {
	return (
		<div className={styles.main_content}>
			<h1>Want a show, but can't commit every week? <br />
			That's why Variety Hour exists.</h1>
			<p>Variety hour is a timeslot that anyone can reserve.</p>
			<p>In order to host a show, you need to <a>be a member</a>.</p>
			<p>You also need to be trained before you go on air. Training takes about 10 minutes. If you are not trained, your show will be canceled.</p>
			<p>Once you're ready, you can head over to <a href="https://calendly.com/wjtbradio/variety-hour-host" target="_blank" keyboard_enabled="1" tabindex="0">this link</a> to book a time! If you see it, you can book it. </p>
		</div>
	);
}