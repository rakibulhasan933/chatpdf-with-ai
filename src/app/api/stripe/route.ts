import { db } from "@/lib/db";
import { userSubscriptions } from "@/lib/db/schema";
import { stripe } from "@/lib/stripe";
import { getAuth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs";

const return_url = process.env.NEXT_BASE_URL + "/";

export async function GET(request: NextRequest) {
	try {
		const { userId } = await getAuth(request);
		if (!userId) {
			return new NextResponse("unauthorized", { status: 401 });
		};
		const user = await clerkClient.users.getUser(userId as string)
		// Database
		const _userSubscriptions = await db.select().from(userSubscriptions).where(eq(userSubscriptions.userId, userId));
		if (_userSubscriptions[0] && _userSubscriptions[0].stripeCustomerId) {
			// try to cancel at the billing portal
			const stripeSession = await stripe.billingPortal.sessions.create({
				customer: _userSubscriptions[0].stripeCustomerId,
				return_url,
			});
			return NextResponse.json({ url: stripeSession.url });
		}
		// User Fist time Pay

		const stripeSession = await stripe.checkout.sessions.create({
			success_url: return_url,
			cancel_url: return_url,
			payment_method_types: ["card"],
			mode: "subscription",
			billing_address_collection: "auto",
			customer_email: user.emailAddresses[0].emailAddress,
			line_items: [
				{
					price_data: {
						currency: "USD",
						product_data: {
							name: "ChatPDF Pro",
							description: "Unlimited PDF sessions!",
						},
						unit_amount: 2000,
						recurring: {
							interval: "month"
						},
					},
					quantity: 1,
				},
			],
			metadata: {
				userId,
			},
		});
		return NextResponse.json({ url: stripeSession.url });
	} catch (error) {
		console.log("stripe error", error);
		return new NextResponse("internal server error", { status: 500 });
	};
};