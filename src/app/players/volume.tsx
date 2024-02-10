"use client";

import { MutableRefObject, useEffect, useRef, useState } from "react";
import styles from "./volume.module.scss"

export default function Volume({hidden, touch, volumeChangeEvent, muteChangeEvent, media}:
			{hidden: boolean, touch: boolean, media: MutableRefObject<HTMLVideoElement | null>,
			volumeChangeEvent: (volume: number) => void, muteChangeEvent: (muted: boolean) => void}) {
	const [sliderShown, setSliderShown] = useState(false);
	const [muted, setMuted] = useState(true);
	const [volume, setVolume] = useState(1.0);
	const sliderTimer = useRef(-1);
	const button = useRef<null | HTMLButtonElement>(null);
	const slider = useRef<null | HTMLInputElement>(null);

	function onMouseEnter() {
		volumeChangeEvent(volume);
		if(touch) {
			setSliderShown(false);
			return;
		}
		if(sliderTimer.current != -1) {
			window.clearTimeout(sliderTimer.current);
			sliderTimer.current = -1;
		}
		setSliderShown(true);
	}

	function onMouseLeave() {
		if(sliderTimer.current != -1) {
			window.clearTimeout(sliderTimer.current);
			sliderTimer.current = -1;
		}
		sliderTimer.current = window.setTimeout(() => {
			setSliderShown(false);
		}, 1500);
	}

	function onVolumeChange(event: React.ChangeEvent) {
		if(!(event.target instanceof HTMLInputElement)) {
			return;
		}
		const v = parseFloat(event.target.value)/100.0;
		onMouseEnter();
		volumeChangeEvent(v);
		setVolume(v);
		muteChangeEvent(false);
		setMuted(false);
	}

	function onButtonClick(event: React.MouseEvent) {
		if(button.current == null || !(event.target instanceof Element)) {
			return;
		}
		if(!button.current.contains(event.target)) {
			return;
		}
		onMouseEnter();
		onMouseLeave();
		muteChangeEvent(!muted);
		setMuted(!muted);
	}

	useEffect(() => {
		if(media.current == null) {
			return;
		}
		console.log("effect");
		function volumeChangeEvent() {
			if(media.current == null) {
				return;
			}
			console.log("changed");
			setMuted(media.current.muted);
			setVolume(media.current.volume);
			if(slider.current != null) {
				slider.current.value = ""+media.current.volume*100;
			}
		}

		media.current.addEventListener("volumechange", volumeChangeEvent);
		return () => {
			if(media.current == null) {
				return;
			}
			media.current.removeEventListener("volumechange", volumeChangeEvent);
		}
	}, [media]);

	return (
		<div className={`${styles.container} ${hidden && styles.hidden}`}
				onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
			<button ref={button} className={`${styles.volume_button}
					${muted?styles.muted:(volume > 0.25?(volume > 0.5?(volume > 0.75?styles.volume3:styles.volume2):styles.volume1):styles.volume0)}`}
					onClick={onButtonClick} onFocus={onMouseEnter} onBlur={onMouseLeave}>
				<div className={styles.volume_icon}></div>
				{muted?'Unmute video':'Mute video'}
			</button>
			<label>
				Volume
				<input type="range" name="volume" min={0} max={100} defaultValue={100} onChange={onVolumeChange} onFocus={onMouseEnter} onBlur={onMouseLeave}
					className={`${(!sliderShown || touch) && styles.hidden} ${styles.slider}`}
					ref={slider}/>
			</label>
		</div>
	);
}