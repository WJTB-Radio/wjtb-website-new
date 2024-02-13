import Link from "next/link";
import styles from "../global.module.scss";

export default function Join() {
	return (
		<div className={styles.main_content}>
			<h1>Want to become a member?</h1>

			<p>Go to our <a href="https://njit.campuslabs.com/engage/organization/wjtb" target="_blank">highlander hub</a> to
				request membership. Membership is extended to every NJIT student.
				Non-students are welcome to join our <a href="https://wjtb.njit.edu/discord" target="_blank">discord</a>, but they cannot host their own shows.</p>
			<p>After you&apos;ve submitted your application on Highlander Hub, join us on <a href="https://wjtb.njit.edu/discord" target="_blank">discord</a>! This is where you&apos;ll
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
			<p>All DJs have to follow some basic rules for airtime. To learn more, read our <a href="/docs/WJTB_Gen_Member_Contract_2022.pdf" target="_blank">general member contract</a>.
			</p>
			<p>To apply for air time, you&apos;ll need to fill out the show request form. Join the <a href="https://wjtb.njit.edu/discord" target="_blank" rel="noreferrer noopener">discord</a> and <a href="https://njit.campuslabs.com/engage/organization/wjtb" target="_blank">highlander hub</a> to get notified when the form drops.</p>
			<p>Having a show is a weekly commitment. You are expected to run your show every week. If you can&apos;t make that commitment, you can utilize our <Link href="/variety">variety hours</Link> instead.</p>
			<h1>Rules</h1>
			<p>WJTB <b>does</b> have a few rules. To learn more about our rules, you can take a look at our
				constitution, membership contract, and Highlander Hub. </p>
			<p>Our summarized rules include (but are not limited to):
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
			<p>A full list of rules is available in our <a href="/docs/WJTB_Gen_Member_Contract_2022.pdf" target="_blank">general member contract</a>. If you&apos;re interested, you can also take a look at our entire <a href="/docs/WJTBconstitution.pdf" target="_blank">WJTB constitution</a>.</p>
		</div>
	);
}