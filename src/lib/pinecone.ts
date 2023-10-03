import { Pinecone, PineconeRecord } from "@pinecone-database/pinecone";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { downloadPdf } from "./db/downloadpdf";
import {
	Document,
	RecursiveCharacterTextSplitter,
} from "@pinecone-database/doc-splitter";

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

	// 1. obtain the pdf -> downlaod and read from pdf
	const file = await downloadPdf({ file_url });
	const loader = new PDFLoader(file);
	const pages = (await loader.load()) as PDFPage[];

	// 2. split and segment the pdf
	const documents = await Promise.all(pages.map(prepareDocument));
};




// 2.
export const truncateStringByBytes = (str: string, bytes: number) => {
	const enc = new TextEncoder();
	return new TextDecoder("utf-8").decode(enc.encode(str).slice(0, bytes))
}

async function prepareDocument(page: PDFPage) {
	let { metadata, pageContent } = page;
	pageContent = pageContent.replace(/\n/g, "");
	// Split the docs
	const splitter = new RecursiveCharacterTextSplitter();
	const docs = await splitter.splitDocuments([
		new Document({
			pageContent,
			metadata: {
				pageNumber: metadata.loc.pageNumber,
				text: truncateStringByBytes(pageContent, 36000)
			},
		}),
	]);
	return docs;
};