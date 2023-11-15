import type { Metadata } from 'next'
import '@/styles/globals.css'
import '@/styles/index.css'
import Header from '@/components/Header'
import Aside from '@/components/Aside'
import Footer from '@/components/Footer'
import Nav from '@/components/Nav'

export const metadata: Metadata = {
  title: 'Home - Wave'
}

export default ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <div className="min-h-[calc(100vh-6.05rem)] container flex-1 items-start grid md:grid-cols-[13.75rem_minmax(0,1fr)] lg:grid-cols-[15rem_minmax(0,1fr)] md:gap-6 px-4 sm:px-8 pt-[3.55rem]">
        <Aside>
          <Nav />
        </Aside>
        <main className="relative h-full py-8">{ children }</main>
      </div>
      <Footer />
    </>
  )
}