"use client";
import axios from 'axios';
import React, { useState } from 'react'
import { Button } from './ui/button';
import { Zap } from 'lucide-react';

export default function SubscriptionButton({ isPro }: { isPro: boolean }) {
	const [loading, setLoading] = useState(false);
	const handleSubscription = async () => {
		try {
			setLoading(true);
			const response = await axios.get("/api/stripe");
			window.location.href = response.data?.url;
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		};
	};
	return (
		<Button disabled={loading} onClick={handleSubscription}>
			{isPro ? "Manage Subscriptions" : " Upgrade"} <Zap className="w-4 h-4 ml-2 fill-white" />
		</Button>
	)
}
