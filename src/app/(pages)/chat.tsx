"use client";

import { useLayoutEffect, useRef, useState } from "react";
import useWebsocket from "react-use-websocket";
import styles from "./chat.module.scss";
import Link from "next/link";

interface ChatMessage {
	content: string;
	user: string;
	id: string;
}

type SocketMessage =
	| { type: "full"; messages: ChatMessage[] }
	| {
			type: "message";
			message: ChatMessage;
	  }
	| { type: "delete"; id: string };

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
		console.log(smooth ? "smooth" : "instant");
		container.current.lastElementChild?.scrollIntoView({
			behavior: smooth ? "smooth" : "instant",
			block: "end",
			inline: "end",
		});
	}
	useWebsocket("https://wjtbradio.com/chat/", {
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
			}
		},
	});
	return (
		<div className={styles.container} ref={container}>
			{messages.length == 0 ? (
				<div className={styles.message}>loading chat...</div>
			) : (
				messages.map((message) => (
					<div key={message.id} className={styles.message}>
						<span className={styles.messageUser}>
							{message.user}
						</span>{" "}
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
