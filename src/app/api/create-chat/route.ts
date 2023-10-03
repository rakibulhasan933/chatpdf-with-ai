import { NextResponse, NextRequest } from "next/server";
import { loadIntoPinecone } from "@/lib/pinecone";

export async function POST(request: NextRequest, response: NextResponse) {
	try {
		const body = await request.json();
		const { file_url, file_name } = body;
		const pages = await loadIntoPinecone({ file_url });
		console.log({ pages });

		// console.log({ file_url, file_name });
		return NextResponse.json({ message: "successfully", pages });
	} catch (error) {
		return NextResponse.json({ error: "Server Error 500" });
	};
};