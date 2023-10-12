import React from 'react'
import { Card, CardDescription, CardHeader, CardTitle } from './ui/card'

interface DataIProps {
  id: number,
  title: string,
  dec: string,
}

const data: DataIProps[] = [{
  id: 0,
  title: "For Students",
  dec: "Prepare for exams, get help with homework and answer multiple choice questions."
},
{
  id: 1,
  title: "For Researchers",
  dec: "Scientific papers, academic articles and books. Get the information you need for your research."
},
{
  id: 2,
  title: "For Professionals",
  dec: "Legal contracts, financial reports, manuals and training material. Ask any question to any PDF and get insights fast."
},
{
  id: 3,
  title: "Any Language",
  dec: "Works worldwide! ChatPDF accepts PDFs in any language and can chat in any language."
},
{
  id: 4,
  title: "Cited Sources",
  dec: "Answers contain references to their source in the original PDF document. No more flipping pages."
},
{
  id: 5,
  title: "Simple and Secure",
  dec: "Fast, easy, free & secure! Files are stored in a secure cloud storage and will never be shared."
}];


export default function Benefit() {
  return (
    <div className=' my-8'>
      <div className="text-center">
        <h2 className=" text-3xl font-bold my-8">What advantages will ChatPDF provide you?</h2>
      </div>
      <div className="grid grid-cols-3 gap-3 px-10">
        {
          data.map((item) => (
            <Card key={item.id}>
              <CardHeader>
                <CardTitle className=' text-lg font-bold'>{item.title}</CardTitle>
                <CardDescription>{item.dec}</CardDescription>
              </CardHeader>
            </Card>
          ))
        }

      </div>
    </div>
  )
}
