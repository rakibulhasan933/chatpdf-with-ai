"use client";
import React from 'react';
import { useChat } from "ai/react"
import MessageList from './MessageList';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Send } from 'lucide-react';

type Props = { chatId: number };

export default function ChatComponent({ chatId }: Props) {

	const { input, handleInputChange, handleSubmit, messages } = useChat()

	return (
		<div
			className="relative max-h-screen overflow-x-hidden overflow-scroll"
			id="message-container"
		>
			<div className="sticky top-0 inset-x-0 p-2 bg-white h-fit">
				<h3 className="text-xl font-bold">Chat</h3>
			</div>
			<MessageList messages={messages} />
			<form
				onSubmit={handleSubmit}
				className="sticky bottom-0 inset-x-0 px-2 py-4 bg-white"
			>
				<div className="flex">
					<Input
						value={input}
						onChange={handleInputChange}
						placeholder="Ask any question..."
						className="w-full"
					/>
					<Button className="bg-blue-600 ml-2">
						<Send className="h-4 w-4" />
					</Button>
				</div>
			</form>
		</div>
	)
}
