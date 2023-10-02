import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest, response: NextResponse) {
	try {
		const body = await request.json();
		const { file_url, file_name } = body;
		console.log({ file_url, file_name });
		return NextResponse.json({ message: "successfully" });
	} catch (error) {
		return NextResponse.json({ error: "Server Error 500" });
	};
};