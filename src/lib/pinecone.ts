import { Pinecone, PineconeRecord } from "@pinecone-database/pinecone";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { downloadPdf } from "./db/downloadpdf";

type PDFPage = {
	pageContent: string;
	metadata: {
		loc: { pageNumber: number };
	};
};

export const getPineconeClient = () => {
	return new Pinecone({
		environment: process.env.PINECONE_ENVIRONMENT!,
		apiKey: process.env.PINECONE_API_KEY!,
	})
};

export async function loadIntoPinecone({ file_url }: { file_url: string }) {
	const file = await downloadPdf({ file_url });
	const loader = new PDFLoader(file);
	const pages = (await loader.load()) as PDFPage[];
	return pages;
};