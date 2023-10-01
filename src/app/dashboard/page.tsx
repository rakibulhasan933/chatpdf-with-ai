import React from 'react'
import { currentUser } from "@clerk/nextjs";
import type { User } from "@clerk/nextjs/api";
import { UserButton } from "@clerk/nextjs";

export default async function Dashboard() {
	const user: User | null = await currentUser();
	return (
		<div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
			<UserButton afterSignOutUrl="/" />
		</div>
	)
}
