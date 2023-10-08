import { NextResponse, NextRequest } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/nextjs";
import { FreeLimit } from "@/lib/userLimit";

export const GET = async (req: NextRequest) => {


}