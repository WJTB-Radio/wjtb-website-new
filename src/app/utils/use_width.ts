import { useEffect, useState } from "react";

export const defaultWidth = 2000;

// from https://blog.logrocket.com/developing-responsive-layouts-with-react-hooks/
export function useWidth() {
	const [width, setWidth] = useState(defaultWidth);

	useEffect(() => {
		const handleWindowResize = () => setWidth(window.innerWidth);
		window.addEventListener("resize", handleWindowResize);
		handleWindowResize();
		return () => window.removeEventListener("resize", handleWindowResize);
	}, []);

	return { width };
}