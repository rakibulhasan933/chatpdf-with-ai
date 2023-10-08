"use client";
import { DrizzleChat } from "@/lib/db/schema";
import Link from "next/link";
import React from "react";
import { Button, buttonVariants } from "./ui/button";
import { MessageCircle, PlusCircle, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import axios from "axios";
import { Card, CardContent } from "./ui/card";
import { Progress } from "./ui/progress";

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
			<div className="absolute  bottom-4 left-16 py-3 px-2  justify-center  bg-purple-400 rounded-lg">
				<div className="w-full px-4">
					<Progress className="mb-2" value={(limit / fullLimit) * 100} />
					<p className=" text-sm font-medium mb-2 text-black">{limit}/{fullLimit} Free Generations</p>

					<Link href='/'>
						<Button className=" bg-slate-500" variant="outline">
							Upgrade
							<Zap className="w-4 h-4 ml-2 fill-white" />
						</Button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default ChatSideBar;