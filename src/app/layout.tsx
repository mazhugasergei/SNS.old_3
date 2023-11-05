import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'
import '@/styles/index.css'
import Header from '@/components/Header'
import Menu from '@/components/Menu'
import Footer from '@/components/Footer'
import Provider from '@/store/Provider'
import { headers } from 'next/headers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Home - Hello',
  description: 'Mazhuga Sergei\'s graduation thesis',
}

export default ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <Provider>
        <body className={`${inter.className} min-h-screen relative`}>
          <Header />
          <div
            className="
              min-h-[calc(100vh-6.05rem)]
              container
              flex-1
              items-start
              grid
              md:grid-cols-[13.75rem_minmax(0,1fr)]
              lg:grid-cols-[15rem_minmax(0,1fr)]
              px-4
              sm:px-8
              pt-[3.55rem]
            "
          >
            <Menu />
            <main className="relative h-full py-6 pl-6">{ children }</main>
          </div>
          <Footer />
        </body>
      </Provider>
    </html>
  )
}