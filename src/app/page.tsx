import FileUpload from '@/components/FileUpload'
import { Button } from '@/components/ui/button'
import { db } from '@/lib/db'
import { chats } from '@/lib/db/schema'
import { checkSubscription } from '@/lib/subscripton'
import { UserButton, auth } from '@clerk/nextjs/app-beta'
import { eq } from 'drizzle-orm'
import { ArrowRight, LogIn, BadgeSwissFranc } from 'lucide-react'
import Link from 'next/link'

export default async function Home() {
  // Pro Checked
  const { userId } = await auth();
  const isAuth = !!userId;
  const isPro = await checkSubscription();
  let firstChat;
  if (userId) {
    firstChat = await db.select().from(chats).where(eq(chats.userId, userId));
    if (firstChat) {
      firstChat = firstChat[0];
    };
  };

  return (
    <main className="w-screen min-h-screen bg-gradient-to-r from-rose-100 to-teal-100">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center">
            <h1 className="mr-3 text-5xl font-semibold">Chat with any PDF</h1>
            <UserButton afterSignOutUrl="/" />
          </div>
          <div className="flex mt-2">
            {isAuth && (
              <div className=' flex flex-row gap-x-4 items-center'>
                <Link href="/">
                  <Button>
                    Go to Chats <ArrowRight className="ml-2" />
                  </Button>
                </Link>
                <div className="ml-3">
                  <Button className=' bg-gray-300 text-black hover:text-white font-bold'>SubscriptionButton
                    <BadgeSwissFranc className=' w-4 h-4 ml-3' />
                  </Button>
                </div>
              </div>
            )}
          </div>
          <div>
            <p className="max-w-xl mt-1 text-lg text-slate-600">
              Join millions of students, researchers and professinals to instantly
              anwer questions and understand research with AI
            </p>
          </div>
          <div className="w-full mt-4">
            {isAuth ? (
              <FileUpload />
            ) : (
              <Link href="/sign-in">
                <Button>
                  Login to get Started!
                  <LogIn className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}