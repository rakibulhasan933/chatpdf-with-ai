import { eq } from "drizzle-orm"
import { db } from "./db"
import { userApiLimit } from "./db/schema";
import { auth } from "@clerk/nextjs";
import { checkSubscription } from "./subscripton";


export const FreeLimit = async () => {
	const { userId } = await auth();
	if (!userId) {
		return false;
	};
	const isPro = await checkSubscription();

	if (isPro) {
		return true;
	} {
		const _limit = await db.select().from(userApiLimit).where(eq(userApiLimit.userId, userId));
		if (_limit?.length <= 4) {
			await db.insert(userApiLimit).values({ userId });
			return true;
		} {
			return false;
		}
	};
};