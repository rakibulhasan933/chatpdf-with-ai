"use client";
import { DrizzleChat } from "@/lib/db/schema";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { MessageCircle, PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Progress } from "./ui/progress";
import SubscriptionButton from "./SubscriptionButton";
import { ScrollArea } from "./ui/scroll-area";

type Props = {
	chats: DrizzleChat[];
	chatId: number;
	limit: number,
	isPro: boolean,
};

const ChatSideBar = ({ chats, chatId, limit, isPro }: Props) => {
	const [loading, setLoading] = React.useState(false);
	const fullLimit = 4;

	return (
		<div className="w-full p-4 text-gray-200 bg-gray-900 min-h-screen py-4 relative">
			<div className="">
				<Link href="/chat">
					<Button className="w-full border-dashed border-white border">
						<PlusCircle className="mr-2 w-4 h-4" />
						New Chat
					</Button>
				</Link>
			</div>
			<ScrollArea className="flex overscroll-auto pb-20 flex-col gap-2 mt-4">
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
			</ScrollArea>
			<div className="absolute  bottom-4 left-6 py-3 px-2  justify-center  bg-purple-400 rounded">
				<div className="w-full px-4">
					{isPro ? (
						<h2 className="text-lg font-semibold text-center mb-2 text-black">Unlimited</h2>
					) : (
						<>
							<Progress className="mb-1 bg-white" value={(limit / fullLimit) * 100} />
							<p className=" text-sm font-medium mb-2 text-black">{limit}/{fullLimit} Free Generations</p>
						</>
					)}
					<SubscriptionButton isPro={isPro} />
				</div>
			</div>
		</div>
	);
};

export default ChatSideBar;