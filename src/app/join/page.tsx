import Link from "next/link";
import styles from "../global.module.scss";

export default function Join() {
	return (
		<div className={styles.main_content}>
			<h1>Want to become a member?</h1>

			<p>Go to our <a href="https://njit.campuslabs.com/engage/organization/wjtb" target="_blank">Highlander Hub</a> to
				request membership. Membership is extended to every NJIT student, regardless of major or class.
				Non-students can still enjoy associative membership, but cannot host their own shows.</p>
			<p>After you&apos;ve submitted your application on Highlander Hub, join us on our <a href="https://wjtb.njit.edu/discord" target="_blank">discord</a>! This is where you&apos;ll
				find all of our members and be able to reach out to us if you need anything.</p>
			<h1>Why Join?</h1>
			<p>There are a ton of reasons to join WJTB! Not every member needs to have a show, but every member
				<i>can</i> have a show, assuming time permits and they agree to a few basic rules. Members get access
				to the club space, our recording room, members-only events, trainings, studio time, and more!
			</p>
			<h1>Want air time?</h1>
			<p>Every semester we open up time slots to active members of WJTB. Time slots are first reserved for
				Executive Board, Senior DJs, and other student organizations. The remaining time slots operate on a
				first-come, first-served basis.</p>
			<p>All DJs have to follow some basic rules for airtime. To learn more, read our <a href="./docs/WJTB_Gen_Member_Contract_2022.pdf" target="_blank">General Member Contract</a>.
			</p>
			<p>To apply for air time, you&apos;ll need to fill out a form. Ready to get heard? Fill out the <Link href="/request">form</Link> today!</p>
			<h1>What to know</h1>
			<p>WJTB <b>does</b> have a few rules. To learn more about our rules, you can take a look at our
				constitution, membership contract, and Highlander Hub. </p>
			<p>If you&apos;re too busy to look at there, our summarized basic rules include (but are not limited to):
			</p><ol>
				<li>No discrimination.</li>
				<li>Keep eachother safe!</li>
				<li>No hate speech.</li>
				<li>Work together.</li>
				<li>Follow NJIT rules.</li>
				<li>No sexual harassment as covered by Title IX.</li>
				<li>Respect the office - clean up!</li>
				<li>Be liable for your own actions.</li>
			</ol>
			<p></p>
			<p>If you&apos;re interested, you can also take a look at our entire <a href="./docs/wjtbConstitution.pdf" target="_blank">WJTB Constitution</a>.</p>
		</div>
	);
}