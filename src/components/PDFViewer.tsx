import React from 'react'

export default function PDFViewer({ pdf_url }: { pdf_url: string }) {
	return (
		<iframe src={`https://docs.google.com/gview?url=${pdf_url}&embedded=true`} className='w-full h-full'></iframe>
	)
}
