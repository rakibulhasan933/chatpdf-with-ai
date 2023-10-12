import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';

interface DataIProps {
	id: number,
	questions: string,
	answer: string,
}
const data: DataIProps[] = [{
	id: 0,
	questions: "Can ChatPDF speak my language?",
	answer: "Yes, ChatPDF can read PDFs and answer questions in any language. You can upload a PDF in one language and ask questions in another. The greeting message will be in the PDF’s language. After that, ChatPDF will answer in the language you ask. If a message isn’t in the language you want, just ask ChatPDF to change it."

},
{
	id: 1,
	questions: "Is ChatPDF free?",
	answer: "ChatPDF allows you to use it for free with 2 PDFs every day, each up to 120 pages. For more, you can upgrade to the Plus plan. For additional information, check the pricing page."

},
{
	id: 2,
	questions: "Are my files secure?",
	answer: "ChatPDF will never share your files with anyone. They are stored on a secure cloud storage and can be deleted at any time."

},
{
	id: 3,
	questions: "How do I delete a PDF from ChatPDF?",
	answer: "From Chat view: click gray Delete Chat button on the top right. From the Home page: click the X next to the chat title in the My Chats section. This will permanently delete the chat and PDF file content from ChatPDF servers."

},
{
	id: 4,
	questions: "Why can't ChatPDF see all PDF pages?",
	answer: "ChatPDF will never share your files with anyone. They are stored on a secure cloud storage and can be deleted at any time."

},
{
	id: 5,
	questions: "How does ChatPDF work?",
	answer: "In the analyzing step, ChatPDF creates a semantic index over all paragraphs of the PDF. When answering a question, ChatPDF finds the most relevant paragraphs from the PDF and uses the ChatGPT API from OpenAI to generate an answer"

}];

export default function FAQ() {
	return (
		<div className='my-20'>
			<h2 className="text-center text-4xl font-bold text-orange-500">FAQ</h2>
			<div className="flex flex-col justify-center px-40 gap-y-4">
				{
					data.map((item) => (
						<Accordion key={item.id} type="single" collapsible >
							<AccordionItem value="item-1">
								<AccordionTrigger className='text-xl font-semibold'>{item.questions}</AccordionTrigger>
								<AccordionContent className=' text-base font-semibold text-gray-600'>
									{item.answer}
								</AccordionContent>
							</AccordionItem>
						</Accordion>
					))
				}
			</div>
		</div>
	)
}
