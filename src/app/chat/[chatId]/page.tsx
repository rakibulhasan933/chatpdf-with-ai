import React from 'react'
import { auth } from "@clerk/nextjs";
import { redirect } from 'next/navigation';
import { db } from '@/lib/db';
import { chats } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import ChatSideBar from '@/components/ChatSideBar';
import PDFViewer from '@/components/PDFViewer';

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
		<div className="flex h-screen overflow-scroll mx-4">
			<div className="flex w-full h-screen overflow-scroll">
				{/* chat sidebar */}
				<div className="basis-1/5">
					<div className="w-full">
						<h2>Menu Bar</h2>
					</div>

				</div>
				{/* pdf viewer */}
				<div className="max-h-screen oveflow-scroll basis-2/5">
					<PDFViewer pdf_url={currentChat?.pdfUrl || ""} />
				</div>
				{/* chat component */}
				<div className="basis-2/5 border-l-slate-200">
					{/* Chat Components */}
					<ChatSideBar />
				</div>
			</div>
		</div>
	)
};