import type { Metadata } from 'next'
import '@/styles/globals.css'
import '@/styles/index.css'
import Header from '@/app/(main)/components/Header'
import Footer from '@/app/(main)/components/Footer'
import Nav from '@/app/(main)/components/Nav'
import RightAside from './components/RightAside'

export const metadata: Metadata = {
  title: 'Home - Wave'
}

export default ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <div className="min-h-[calc(100vh-9.61rem)] container flex gap-12 pt-8">
        <aside className="max-md:hidden md:w-1/5 lg:w-1/6 z-49 -ml-3">
          <Nav />
        </aside>
        <main className="flex-1">
          { children }
        </main>
        <RightAside />
      </div>
      <Footer />
    </>
  )
}