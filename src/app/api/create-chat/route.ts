import { NextResponse, NextRequest } from "next/server";
import fs from 'fs'
import path from "path";
import axios from "axios";

export async function POST(request: NextRequest, response: NextResponse) {
	try {
		const body = await request.json();
		const { file_url, file_name } = body;
		// PDF Download
		const outputFilePath = path.join(__dirname, file_name);

		const response = await axios.get(file_url, { responseType: "stream" });
		const writer = fs.createWriteStream(outputFilePath);
		// Use a promise to wait for the stream to finish writing
		await new Promise((resolve, reject) => {
			response.data.pipe(writer);
			// console.log(response, "severLog");
			writer.on('finish', resolve);
			writer.on('error', reject);
		});
		console.log(outputFilePath);


		// console.log({ file_url, file_name });
		return NextResponse.json({ message: "successfully" });
	} catch (error) {
		return NextResponse.json({ error: "Server Error 500" });
	};
};