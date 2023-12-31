import Benefit from '@/components/Benefit'
import Contact from '@/components/Contact'
import FAQ from '@/components/FAQ'
import Pricing from '@/components/Pricing'
import StatsPage from '@/components/Stats'
import { ArrowRightCircle, ArrowRightIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Home() {
  return (
    <div>
      <div className='min-h-screen bg-gray-300'>
        <div className="lg:mx-6 mx-2 py-2">
          <div className=" mt-16 px-10 flex justify-center flex-col items-center">
            <h2 className='text-5xl font-bold text-center'>Chat with any PDF</h2>
            <h2 className='text-2xl my-5 font-light text-center'>Join millions of students, researchers and professionals to instantly answer questions and understand research with AI</h2>
            <Image src='/chatpdf.png' className=' object-cover mt-4 rounded-md' width={650} height={650} alt='file' />
            <Link href="/chat" className='flex flex-row items-center mt-4 bg-white font-bold text-xl p-4 rounded hover:bg-green-400 hover:text-white'>Read Your PDF <ArrowRightCircle className='w-10 ml-2' /> </Link>
          </div>
          <Benefit />
        </div>
      </div>
      <div className="lg:mx-6 mx-2 py-2">
        <FAQ />
        <Pricing />
        <StatsPage />
        <Contact />
      </div>
      <div className="mx-auto mb-4">
        <h2 className='text-center text-lg font-semibold'>© 2023 ChatPDF, Inc. All rights reserved.</h2>
      </div>
    </div>
  )
}

export default Home