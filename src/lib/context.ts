import { Pinecone } from "@pinecone-database/pinecone";
import { getEmbeddings } from "./Embedding";


export async function getMatchesFromEmbeddings(embeddings: number[]) {
	try {
		const client = new Pinecone({
			environment: process.env.PINECONE_ENVIRONMENT!,
			apiKey: process.env.PINECONE_API_KEY!,
		});
		const pineconeIndex = await client.Index("chatpdf");
		const namespace = pineconeIndex.namespace("");
		const queryResult = await namespace.query({
			topK: 5,
			vector: embeddings,
			includeMetadata: true,
		});
		return queryResult.matches || [];
	} catch (error) {
		console.log(error);
		throw error;
	};
};

export async function getContext(query: string) {
	const queryEmbeddings = await getEmbeddings(query);
	const matches = await getMatchesFromEmbeddings(queryEmbeddings);

	const qualifyingDocs = matches.filter(
		(match) => match.score && match.score > 0.7
	);

	type Metadata = {
		text: string;
		pageNumber: number;
	};

	let docs = qualifyingDocs.map((match) => (match.metadata as Metadata).text);
	// 5 vectors
	return docs.join("\n").substring(0, 3000);
}