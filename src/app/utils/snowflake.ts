export function getSnowflake() {
	// this prevents the dev environment from freaking out
	return Math.round(new Date().getTime()/10000);
}