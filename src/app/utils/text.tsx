// https://stackoverflow.com/questions/55541031/how-do-you-put-a-line-break-in-a-react-string
export function addLineBreaks(str: string): React.JSX.Element[] {
	return str.split("\n").map((subStr) => {
		return (
			<>
				{subStr}
				<br />
			</>
		);
	});
}
