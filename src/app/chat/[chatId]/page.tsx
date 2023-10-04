import React from 'react'
import { auth } from "@clerk/nextjs";
import { redirect } from 'next/navigation';
import { db } from '@/lib/db';
import { chats } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

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
		<div>{chatId}</div>
	)
};