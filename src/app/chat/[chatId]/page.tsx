import React from 'react'
import { auth } from "@clerk/nextjs";
import { redirect } from 'next/navigation';
import { db } from '@/lib/db';
import { chats } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import ChatSideBar from '@/components/ChatSideBar';

interface ParamsIProps {
	params: IDIProps
};
interface IDIProps {
	chatId: string;
}

export default async function ChatID({ params }: ParamsIProps) {
	const chatId = params.chatId;
	const { userId } = await auth();

	if (!userId) {
		return redirect("/sign-in");
	};


	const _chats = await db.select().from(chats).where(eq(chats.userId, userId));

	if (!_chats) {
		return redirect("/");
	};
	if (_chats.find((chat) => chat.id !== parseInt(chatId))) {
		return redirect("/");
	}
	const currentChat = _chats.find((chat) => chat.id === parseInt(chatId));

	return (
		<div className="flex max-h-screen overflow-scroll">
			<div className="flex w-full max-h-screen overflow-scroll">
				<div className="flex-[1] max-w-xs">
					{/* Chat SideBar */}
					<ChatSideBar />
				</div>
				<div className="max-h-screen p-4 oveflow-scroll flex-[5]">
					{/* PDF Viewer */}
					<h2>PDF Viewers</h2>
				</div>
				<div className="flex-[3] border-l-4 border-l-slate-200">
					{/* Chat Components */}
					<h2>Chat Components</h2>
				</div>
			</div>
		</div>
	)
};