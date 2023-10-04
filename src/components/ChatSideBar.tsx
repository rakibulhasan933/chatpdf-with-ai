"use client";
import { Send } from 'lucide-react';
import React from 'react'
import { Button } from './ui/button';
import { Input } from './ui/input';

export default function ChatSideBar() {
	return (
		<div
			className="relative max-h-screen overflow-scroll"
			id="message-container"
		>
			<div className="sticky top-0 inset-x-0 p-2 bg-white h-fit">
				<h3 className="text-xl font-bold">Chat</h3>
			</div>
			{/* Message List */}
			<h2>Message List 1</h2>
			<form

				className="sticky bottom-0 inset-x-0 px-2 py-4 bg-white"
			>
				<div className="flex">
					<Input

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
