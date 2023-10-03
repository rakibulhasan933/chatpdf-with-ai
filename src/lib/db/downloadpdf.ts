import axios from "axios";
import path from "path";
import fs from 'fs';

export async function downloadPdf({ file_url }: { file_url: string }) {

	const outputFilePath = path.join(__dirname, `/${Date.now().toString()}.pdf`);

	const response = await axios.get(file_url, { responseType: "stream" });
	const writer = fs.createWriteStream(outputFilePath);
	// Use a promise to wait for the stream to finish writing
	await new Promise((resolve, reject) => {
		response.data.pipe(writer);
		// console.log(response, "severLog");
		writer.on('finish', resolve);
		writer.on('error', reject);
	});
	return outputFilePath;
};