import React from 'react'
import { auth } from "@clerk/nextjs";
import { redirect } from 'next/navigation';
import { db } from '@/lib/db';
import { chats } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import PDFViewer from '@/components/PDFViewer';
import ChatSideBar from '@/components/ChatSideBar';
import ChatComponent from '@/components/ChatComponent';

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

	// if (!_chats) {
	// 	return redirect("/");
	// };
	// if (_chats.find((chat) => chat.id !== parseInt(chatId))) {
	// 	return redirect("/");
	// }
	const currentChat = _chats.find((chat) => chat.id === parseInt(chatId));

	return (
		<div className="flex h-screen overflow-hidden">
			<div className="flex w-full h-screen">
				{/* chat sidebar */}
				<div className=" basis-1/5">
					<ChatSideBar chats={_chats} chatId={parseInt(chatId)} />
				</div>
				{/* pdf viewer */}
				<div className="basis-2/5">
					<PDFViewer pdf_url={currentChat?.pdfUrl || ""} />
				</div>
				{/* chat component */}
				<div className="basis-2/5">
					<ChatComponent chatId={parseInt(chatId)} />
				</div>
			</div>
		</div>
	)
};