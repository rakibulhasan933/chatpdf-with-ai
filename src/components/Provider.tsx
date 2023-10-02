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
		<QueryClientProvider client={queryClient} >
			<html lang="en">
				<body>{children}</body>
			</html>
		</QueryClientProvider>
	)
};