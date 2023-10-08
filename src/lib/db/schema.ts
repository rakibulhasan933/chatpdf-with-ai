import { integer, numeric, pgEnum, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";



export const userSystemEnum = pgEnum("user_system_enum", ["system", "user"]);

export const chats = pgTable("chats", {
	id: serial("id").primaryKey(),
	pdfName: text("pdf_name").notNull(),
	pdfUrl: text("pdf_url").notNull(),
	createAt: timestamp("created_at").notNull().defaultNow(),
	userId: varchar("user_id", { length: 256 }).notNull(),
	fileKey: text("file_key").notNull(),
});

export type DrizzleChat = typeof chats.$inferSelect;

export const message = pgTable("messages", {
	id: serial("id").primaryKey(),
	chatId: integer("chat_id").references(() => chats.id).notNull(),
	content: text("content").notNull(),
	createAt: timestamp("createAt").notNull().defaultNow(),
	role: userSystemEnum("role").notNull(),
});
export type DrizzleMessage = typeof message.$inferSelect;

export const userSubscriptions = pgTable("user_subscriptions", {
	id: serial("id").primaryKey(),
	userId: varchar("user_id", { length: 256 }).notNull().unique(),
	stripeSubscriptionId: varchar("stripe_subscription_id", { length: 256 }).unique(),
	stripeCustomerId: varchar("stripe_customer_id", { length: 256 }).unique(),
	stripePriceId: varchar("stripe_price_id", { length: 256 }),
	stripeCurrentPeriodEnd: timestamp("stripe_current_period_end_at"),
});

export type DrizzleUserSubscriptions = typeof userSubscriptions.$inferSelect;

export const userApiLimit = pgTable("user_api_limit", {
	id: serial("id").primaryKey(),
	userId: varchar("user_id", { length: 245 }),
});

export type DrizzleUserApiLimit = typeof userApiLimit.$inferSelect;

// drizzle orm
// drizzle kit