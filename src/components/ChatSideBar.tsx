"use client";
import { DrizzleChat } from "@/lib/db/schema";
import Link from "next/link";
import React from "react";
import { Button, buttonVariants } from "./ui/button";
import { MessageCircle, PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import axios from "axios";
import { Card, CardContent } from "./ui/card";

type Props = {
	chats: DrizzleChat[];
	chatId: number;
	limit: number,
};

const ChatSideBar = ({ chats, chatId, limit }: Props) => {
	const [loading, setLoading] = React.useState(false);
	const fullLimit = 4;

	return (
		<div className="w-full p-4 text-gray-200 bg-gray-900 min-h-screen py-4 relative">
			<div className="">
				<Link href="/">
					<Button className="w-full border-dashed border-white border">
						<PlusCircle className="mr-2 w-4 h-4" />
						New Chat
					</Button>
				</Link>
			</div>
			<div className="flex overscroll-auto pb-20 flex-col gap-2 mt-4">
				{chats?.map((chat) => (
					<Link key={chat.id} href={`/chat/${chat.id}`}>
						<div
							className={cn("rounded-lg p-3 text-slate-300 flex items-center", {
								"bg-blue-600 text-white": chat.id === chatId,
								"hover:text-white": chat.id !== chatId,
							})}
						>
							<MessageCircle className="mr-2" />
							<p className="w-full overflow-hidden text-sm truncate whitespace-nowrap text-ellipsis">
								{chat.pdfName}
							</p>
						</div>
					</Link>
				))}
			</div>
			<div className="absolute bottom-0 left-0 p-4">
				<Card className="bg-white/10 border-0">
					<CardContent className="py-6">
						<div className="text-center text-sm text-white mb-4 space-y-2">
							<p>{limit}/{fullLimit}Free Generations</p>
						</div>
					</CardContent>
				</Card>

				<Link href='/' className={buttonVariants({ variant: "outline" })}>Click here</Link>
			</div>
		</div>
	);
};

export default ChatSideBar;