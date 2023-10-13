"use client";
import {
	QueryClient,
	QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient();

export default function TanStackProvider({
	children,
}: {
	children: React.ReactNode
}) {

	return (
		<div>
			<QueryClientProvider client={queryClient} >{children}</QueryClientProvider>
		</div>

	)
};