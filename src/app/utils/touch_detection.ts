import { MutableRefObject } from "react";

export type TouchRef = {identifier: number, lastX: number, lastY: number, accumulatedDist: number};

function vectorDistance(aX: number, aY: number, bX: number, bY: number): number {
	const rX = aX-bX;
	const rY = aY-bY;
	return rX*rX+rY*rY;
}

export function onTouchStart(
			touches: MutableRefObject<TouchRef[]>,
			touchTimeout: MutableRefObject<number>,
			setTouch: (t: boolean) => void, event: React.TouchEvent) {
	for(let i = 0; i < event.changedTouches.length; i++) {
		const t = event.changedTouches[i]
		touches.current.push({
			identifier: t.identifier,
			lastX: t.clientX,
			lastY: t.clientY,
			accumulatedDist: 0,
		});
	}
	if(touchTimeout.current != -1) {
		window.clearTimeout(touchTimeout.current);
	}
	setTouch(true);
}

export function onTouchEnd(touches: MutableRefObject<TouchRef[]>,
			touchTimeout: MutableRefObject<number>, onTap: () => void,
			setTouch: (t: boolean) => void,
			event: React.TouchEvent) {
	// check if this was a drag or a tap
	let foundTouch = false;
	for(let i = 0; i < event.changedTouches.length; i++) {
		const touch = event.changedTouches[i];
		for(let j = 0; j < touches.current.length; j++) {
			const other = touches.current[j];
			if(touch.identifier == other.identifier) {
				if(other.accumulatedDist < 100) {
					foundTouch = true;
				}
			}
		}
	}
	touches.current = []; //FIXME: this isnt correct, it wont correctly handle multitouch
	if(!foundTouch) {
		return;
	}
	if(touchTimeout.current != -1) {
		window.clearTimeout(touchTimeout.current);
	}
	touchTimeout.current = window.setTimeout(() => {
		setTouch(false);
	}, 500);
	window.setTimeout(onTap, 0);
}

export function onTouchMove(touches: MutableRefObject<TouchRef[]>, event: React.TouchEvent) {
	for(let i = 0; i < event.changedTouches.length; i++) {
		const t = event.changedTouches[i]
		for(let j = 0; j < touches.current.length; j++) {
			const r = touches.current[j];
			if(r.identifier == t.identifier) {
				r.accumulatedDist += vectorDistance(r.lastX, r.lastY, t.clientX, t.clientY);
			}
		}
	}
}