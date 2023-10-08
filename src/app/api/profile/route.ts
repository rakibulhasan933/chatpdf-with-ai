import { NextResponse, NextRequest } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/nextjs";
import { FreeLimit } from "@/lib/userLimit";

export const GET = async (req: NextRequest) => {

	const limit = await FreeLimit();
	if (limit === false) {
		console.log(limit, "route");
		return NextResponse.json({ message: "Working api Not Work" });
	}
	console.log(limit, "route");
	return NextResponse.json({ message: "Working api" });
}