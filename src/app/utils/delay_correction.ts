export const delay_seconds = 100.0;//5.0;
// delay correction time warps audio to target a specific stream delay
// playback speed = b*(-ax/sqrt(1+(ax)^2))+1
// where b = delay_correction_max, a = delay_correction_aggressiveness, x is how many seconds we have to correct
const delay_correction_agressiveness = 0.1;
const delay_correction_max = 0.2; // must be <= 1.0
export const delay_correction_interval = 100; // in ms

export function applyDelayCorrection(media: HTMLMediaElement | null) {
	if(media == null) {
		return;
	}
	const timeRanges = media.seekable;
	if(timeRanges.length == 0) {
		return;
	}
	// x is how much we need to correct
	const x = delay_seconds - (timeRanges.end(timeRanges.length-1) - media.currentTime);
	const a = delay_correction_agressiveness;
	const b = delay_correction_max;
	const ax = a*x;
	let rate = b*(-ax/Math.sqrt(1.0+ax*ax))+1.0;
	// we dont want to slow down if we are ahead
	if(rate < 1.0) {
		rate = 1.0;
	}
	media.playbackRate = rate;
}

export function teleportDelayCorrection(media: HTMLMediaElement | null) {
	if(media == null) {
		return;
	}
	const timeRanges = media.seekable;
	if(timeRanges.length == 0) {
		return;
	}
	const desired = timeRanges.end(timeRanges.length-1) - delay_seconds;
	if(desired < timeRanges.start(timeRanges.length-1)) {
		// regular buffer correction should handle this case
		return;
	}
	// dont seek unless we have to
	if(Math.abs(media.currentTime - desired) > 100000*Number.EPSILON) {
		media.currentTime = desired;
	}
}