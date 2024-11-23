import { Fragment } from "react";

// https://stackoverflow.com/questions/55541031/how-do-you-put-a-line-break-in-a-react-string
export function addLineBreaks(str: string): React.JSX.Element[] {
	return str.split("\n").map((subStr, i) => {
		return (
			<Fragment key={i}>
				{subStr}
				<br />
			</Fragment>
		);
	});
}
