import { NextResponse, NextRequest } from "next/server";
import { loadIntoPinecone } from "@/lib/pinecone";
import { getAuth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { chats } from "@/lib/db/schema";

export async function POST(request: NextRequest, response: NextResponse) {
	const { userId } = await getAuth(request);
	if (!userId) {
		return NextResponse.json({ error: "unauthorized" }, { status: 401 });
	}
	try {
		const body = await request.json();
		const { file_url, file_name, file_key } = body;
		await loadIntoPinecone({ file_url });
		const chat_id = await db.insert(chats).values({
			fileKey: file_key,
			pdfName: file_name,
			pdfUrl: file_url,
			userId,
		}).returning({
			insertedId: chats.id,
		});
		console.log({ chat_id });
		return NextResponse.json(
			{
				chat_id: chat_id[0].insertedId,
			},
			{ status: 200 }
		);
	} catch (error) {
		console.log(error);
		return NextResponse.json({ error: "Server Error 500" });
	};
};