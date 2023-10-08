import { NextResponse, NextRequest } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/nextjs";
import { RateLimiter } from "limiter";

export const GET = async (req: NextRequest) => {

	// const { userId } = await getAuth(req)
	// const user = await clerkClient.users.getUser(userId as string)

	// console.log(user, "server")

	return NextResponse.json({ message: "Working api" });
}