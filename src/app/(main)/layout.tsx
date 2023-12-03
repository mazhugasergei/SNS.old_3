import type { Metadata } from 'next'
import '@/styles/globals.css'
import '@/styles/index.css'
import Footer from '@/app/(main)/components/Footer'
import Nav from '@/app/(main)/components/Nav'
import RightAside from './components/RightAside'
import Aside from './components/Aside'

export const metadata: Metadata = {
  title: 'Home - Wave'
}

export default ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="min-h-[calc(100vh-6.05rem)] container flex items-start gap-12">
        <Aside />
        <main className="flex-1 pt-8">
          { children }
        </main>
        <RightAside />
      </div>
      <Footer />
    </>
  )
}