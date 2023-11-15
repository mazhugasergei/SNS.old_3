import type { Metadata } from 'next'
import '@/styles/globals.css'
import '@/styles/index.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { LuUser } from "react-icons/lu"
import { LuBrush } from "react-icons/lu"

export const metadata: Metadata = {
  title: 'Home - Wave'
}

export default ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <div className="min-h-[calc(100vh-6.05rem)] container flex-1 items-start grid md:grid-cols-[13.75rem_minmax(0,1fr)] lg:grid-cols-[15rem_minmax(0,1fr)] md:gap-6 px-4 sm:px-8 pt-[3.55rem]">
        <aside className="max-md:hidden sticky top-14 z-49 w-full flex flex-col gap-4 pl-1 py-8">
          <Link href="/settings/profile" className="flex items-center gap-3" ><LuUser />Profile</Link>
          <Link href="/settings/appearance" className="flex items-center gap-3" ><LuBrush />Appearance</Link>
        </aside>
        <main className="relative h-full py-8">{ children }</main>
      </div>
      <Footer />
    </>
  )
}