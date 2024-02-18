// https://stackoverflow.com/questions/32216383/in-react-how-do-i-detect-if-my-component-is-rendering-from-the-client-or-the-se
export function isClient(): boolean {
	return (typeof window !== 'undefined' && !!window.document && !!window.document.createElement);
}