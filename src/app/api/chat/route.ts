import { Configuration, OpenAIApi } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { NextRequest } from "next/server";

export const runtime = 'edge';

const config = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
});

const openAi = new OpenAIApi(config);

export async function POST(request: NextRequest) {
	try {
		const { messages } = await request.json();
		const response = await openAi.createChatCompletion({
			model: "gpt-3.5-turbo",
			messages,
			stream: true
		});
		const stream = OpenAIStream(response);
		return new StreamingTextResponse(stream);
	} catch (error) {
		console.log(error);
	};
};