import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import './styles/index.css'
import Header from '@/components/Header'
import Aside from '@/components/Aside'
import Footer from '@/components/Footer'
import Provider from '@/store/Provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Home - Hello',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }: { children: React.ReactNode }){
  return (
    <html lang="en">
      <Provider>
        <body className={`${inter.className} min-h-screen relative`}>
          <Header />
          <div
            className="
              container
              flex-1
              items-start
              md:grid
              md:grid-cols-[220px_minmax(0,1fr)]
              md:gap-6
              lg:grid-cols-[240px_minmax(0,1fr)]
              lg:gap-10
              px-4
              sm:px-8
              pt-14
            "
          >
            <Aside />
            { children }
          </div>
          <Footer />
        </body>
      </Provider>
    </html>
  )
}