import Link from 'next/link'
import React from 'react'

function Home() {
	return (
		<div className='bg-gradient-to-bl from-green-100 via-blue-300 to-purple-300 min-h-screen'>
			<div className="lg:mx-6 mx-2 py-4">
				<div className="flex flex-row justify-between py-2">
					<div className="">
						<Link href='/' className=' font-bold text-2xl'>ChatPDF</Link>
					</div>
					<div className="">
						<Link href='/' className='w-fit px-6 py-2 hover:bg-gradient-to-tl from-emerald-100 via-blue-500 to-purple-400 rounded font-medium text-lg bg-slate-50'>Login</Link>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Home