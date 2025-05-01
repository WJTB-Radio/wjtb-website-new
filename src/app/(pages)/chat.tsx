"use client";

import { useRef, useState } from "react";
import useWebsocket from "react-use-websocket";
import styles from "./chat.module.scss";
import Link from "next/link";
import { useLocalStorage } from "usehooks-ts";
import { defaultTheme, themes } from "./themes/themes";
import { getReadableForegroundColor } from "../utils/readable_colors";

interface ChatMessage {
	content: string;
	user: string;
	id: string;
	color: string | undefined;
}

type SocketMessage =
	| { type: "full"; messages: ChatMessage[] }
	| {
			type: "message";
			message: ChatMessage;
	  }
	| { type: "delete"; id: string }
	| { type: "edit"; id: string; content: string };

export function Chat() {
	const [messages, setMessages] = useState<ChatMessage[]>([]);
	const container = useRef<HTMLDivElement>(null);
	function scrollToBottom(smooth = true) {
		if (!container.current) return;
		const clientRect = container.current.getBoundingClientRect();
		if (clientRect.bottom < 0) return;
		if (clientRect.right < 0) return;
		if (clientRect.top > document.documentElement.clientHeight) return;
		if (clientRect.left > document.documentElement.clientWidth) return;
		container.current.lastElementChild?.scrollIntoView({
			behavior: smooth ? "smooth" : "instant",
			block: "end",
			inline: "end",
		});
	}
	useWebsocket("https://wjtbradio.com/chat/", {
		retryOnError: true,
		onMessage: (message) => {
			const m = JSON.parse(message.data) as SocketMessage;
			switch (m.type) {
				case "full":
					setMessages(m.messages);
					setTimeout(() => scrollToBottom(false), 0);
					break;
				case "message":
					messages.push(m.message);
					setMessages([...messages]);
					setTimeout(scrollToBottom, 0);
					break;
				case "delete":
					setMessages(
						messages.filter((message) => message.id != m.id)
					);
					break;
				case "edit":
					setMessages(
						messages.map((message) => {
							if (message.id == m.id) {
								message.content = m.content;
							}
							return message;
						})
					);
					break;
			}
		},
	});
	const [themeCookie] = useLocalStorage("theme", defaultTheme, {
		initializeWithValue: false,
	});
	const bgColor = (themes[themeCookie as keyof typeof themes] as any).style[
		"--bg2-color"
	] as string;
	return (
		<div className={styles.container} ref={container}>
			{messages.length == 0 ? (
				<div className={styles.message}>loading chat...</div>
			) : (
				messages.map((message) => (
					<div key={message.id} className={styles.message}>
						<span
							className={styles.messageUser}
							style={
								message.color
									? {
											color: getReadableForegroundColor(
												"#" + message.color,
												bgColor,
												0.5
											),
									  }
									: {}
							}
						>
							{message.user}
						</span>
						:{" "}
						<span className={styles.messageContent}>
							{message.content}
						</span>
					</div>
				))
			)}
			<div className={styles.join}>
				join our{" "}
				<Link href="/discord-chat" target="_blank">
					discord
				</Link>{" "}
				to chat
			</div>
		</div>
	);
}
