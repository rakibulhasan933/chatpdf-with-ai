import Benefit from '@/components/Benefit'
import { ArrowRightCircle, ArrowRightIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Home() {
	return (
		<div className='bg-gradient-to-bl from-green-100 via-blue-300 to-purple-300 min-h-screen'>
			<div className="lg:mx-6 mx-2 py-2">
				<div className="flex flex-row justify-between py-2">
					<div className="">
						<Link href='/' className=' font-bold text-2xl'>ChatPDF</Link>
					</div>
					<div className="">
						<Link href={'/'} className='flex flex-row items-center  bg-white font-bold text-xl py-2 px-4 rounded hover:bg-green-400 hover:text-white'>Login<ArrowRightIcon className='w-6 font-bold ml-2' /></Link>
					</div>
				</div>
				<div className=" mt-16 px-10 flex justify-center flex-col items-center">
					<h2 className='text-5xl font-bold text-center'>Chat with any PDF</h2>
					<Image src='/chatpdf.png' className=' object-cover mt-4 rounded-md' width={650} height={650} alt='file' />
					<Link href={'/'} className='flex flex-row items-center mt-4 bg-white font-bold text-xl p-4 rounded hover:bg-green-400 hover:text-white'>Read Your PDF <ArrowRightCircle className='w-10 ml-2' /> </Link>
				</div>
				<Benefit />
			</div>
		</div>
	)
}

export default Home