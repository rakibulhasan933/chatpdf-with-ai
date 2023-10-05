import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers"
import Stripe from "stripe"
import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";
import { userSubscriptions } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function POST(request: NextRequest) {
	const body = await request.text();
	const signature = headers().get("Stripe-Signature") as string;
	let event: Stripe.Event;
	try {
		event = stripe.webhooks.constructEvent(
			body,
			signature,
			process.env.STRIPE_WEBHOOK_SIGNING_SECRET as string
		);

	} catch (error) {
		return new NextResponse("webhook error", { status: 400 });
	};
	const session = event.data.object as Stripe.Checkout.Session;

	// new subscription created
	if (event.type === "checkout.session.completed") {
		const subscription = await stripe.subscriptions.retrieve(session.subscription as string);
		if (!session?.metadata?.userId) {
			return new NextResponse("no userid", { status: 400 });
		}
		await db.insert(userSubscriptions).values({
			userId: session.metadata?.userId,
			stripeSubscriptionId: subscription.id,
			stripeCustomerId: subscription.customer as string,
			stripePriceId: subscription.items.data[0]?.price.id,
			stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
		});
	};
	if (event.type === "invoice.payment_succeeded") {
		const subscription = await stripe.subscriptions.retrieve(session.subscription as string);
		await db.update(userSubscriptions).set({
			stripePriceId: subscription.items.data[0]?.price.id,
			stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
		}).where(eq(userSubscriptions.stripeSubscriptionId, subscription.id));
	};
	return new NextResponse(null, { status: 200 });
};