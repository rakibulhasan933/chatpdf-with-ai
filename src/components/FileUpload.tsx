"use client"
import React, { useState } from 'react'
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from 'react-hot-toast';
import { UploadButton } from '@/lib/uploadthing';
import "@uploadthing/react/styles.css";
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function FileUpload() {
	const router = useRouter();
	const [Loading, setLoading] = useState<Boolean>(false);
	// Sent Data backend
	const { mutate, isLoading } = useMutation({
		mutationFn: async ({ file_url, file_name, file_key }: { file_url: string, file_name: string, file_key: string }) => {
			const response = await axios.post("/api/create-chat", {
				file_url,
				file_name,
				file_key,
			});
			return response.data;
		},
	});


	return (
		<div className="p-2 bg-white rounded-xl">
			<div className="border-dashed border-2 rounded-xl cursor-pointer bg-gray-50 py-8 flex justify-center items-center flex-col" >
				<div>
					{isLoading || Loading ?
						(
							<div>
								<Loader2 className="h-10 w-10 text-blue-500 animate-spin" />
								<p className="mt-2 text-sm text-slate-400">
									Spilling Tea to GPT...
								</p>
							</div>
						)
						:
						(
							<UploadButton className='w-full h-24 mt-2 text-sm text-slate-400'
								endpoint="pdfUploader"
								onClientUploadComplete={(res) => {
									setLoading(true);
									// Do something with the response
									const file_name = res?.[0].name as string;
									const file_url = res?.[0].url as string;
									const file_key = res?.[0].key as string;

									mutate({ file_name, file_url, file_key }, {
										onSuccess: ({ chat_id }: { chat_id: number }) => {
											setLoading(false);
											toast.success("successfully Data sent");
											router.push(`/chat/${chat_id}`);
										},
										onError: (error) => {
											console.log(error)
											toast.error("Data post failed")
										},
									});
								}}
								onUploadError={(error: Error) => {
									// Do something with the error.
									toast.error(`ERROR! ${error.message}`);
								}}
							/>
						)
					}
				</div>
			</div>
		</div>
	)
}
