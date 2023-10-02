"use client"
import React, { useState } from 'react'
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from 'react-hot-toast';
import { UploadButton } from '@/lib/uploadthing';
import "@uploadthing/react/styles.css";
import { Loader2 } from 'lucide-react';

export default function FileUpload() {
	const [Loading, setLoading] = useState<Boolean>(false);
	console.log({ Loading });
	// Sent Data backend
	const { mutate, isLoading } = useMutation({
		mutationFn: async ({ file_url, file_name }: { file_url: string, file_name: string }) => {
			const response = await axios.post("/api/create-chat", {
				file_url,
				file_name
			});
			return response.data;
		},
	});


	return (
		<div className="p-2 bg-white rounded-xl">
			<div className="border-dashed border-2 rounded-xl cursor-pointer bg-gray-50 py-8 flex justify-center items-center flex-col" >
				<div>
					{
						isLoading || Loading ?
							(
								<div>
									<>
										{/* loading state */}
										<Loader2 className="h-10 w-10 text-blue-500 animate-spin" />
										<p className="mt-2 text-sm text-slate-400">
											Spilling Tea to GPT...
										</p>
									</>
								</div>
							) : (
								<UploadButton className='w-full h-24 mt-2 text-sm text-slate-400'
									endpoint="pdfUploader"
									onClientUploadComplete={(res) => {
										setLoading(true);
										// Do something with the response
										const file_name = res?.[0].name as string;
										const file_url = res?.[0].url as string;

										mutate({ file_name, file_url }, {
											onSuccess: () => {
												setLoading(false);
												toast.success("successfully Data sent");
											},
											onError: (error) => {
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
