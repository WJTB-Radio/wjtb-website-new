// i tried something stateless and it clicked way too much.
// i think this is the simplest thing that works.

// we become unhappy if latency grows larger than unhappy_delay_seconds.
// we stay unhappy until latency becomes smaller than happy_delay_seconds.
// while we are unhappy, we speed up the stream to correction_speed.

// these values are pretty arbitrary, some fine tuning could help here
// happy_delay_seconds should be < unhappy_delay_seconds
const happy_delay_seconds = 10.0;
const unhappy_delay_seconds = 12.0;
const correction_speed = 1.1;
export const delay_correction_interval = 1000; // in ms

// global state is fine here since we will only ever have one stream active.
let happy = true;

export function applyDelayCorrection(media: HTMLMediaElement | null) {
	if(media == null) {
		return;
	}
	const timeRanges = media.seekable;
	if(timeRanges.length == 0) {
		return;
	}
	const current_delay = timeRanges.end(timeRanges.length-1) - media.currentTime;
	if(!happy || current_delay > unhappy_delay_seconds) {
		happy = false;
		if(current_delay < happy_delay_seconds) {
			happy = true;
		}
		media.playbackRate = correction_speed;
	} else {
		happy = true;
		media.playbackRate = 1.0;
	}
}

export function teleportDelayCorrection(media: HTMLMediaElement | null) {
	if(media == null) {
		return;
	}
	const timeRanges = media.seekable;
	if(timeRanges.length == 0) {
		return;
	}
	const desired = timeRanges.end(timeRanges.length-1) - happy_delay_seconds;
	if(desired < timeRanges.start(timeRanges.length-1)) {
		// regular buffer correction should handle this case
		return;
	}
	// dont seek unless we have to
	if(Math.abs(media.currentTime - desired) > 100000*Number.EPSILON) {
		media.currentTime = desired;
	}
}