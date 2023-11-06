import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'
import '@/styles/index.css'
import Provider from '@/store/Provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Home - hello',
  description: 'Mazhuga Sergei\'s graduation thesis',
}

export default ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <Provider>
        <body className={`${inter.className} min-h-screen relative`}>
          <div
            className="
              min-h-[100vh]
              flex-1
              items-start
              grid
              md:grid-cols-[18rem_minmax(0,1fr)]
              lg:grid-cols-[20rem_minmax(0,1fr)]
              md:gap-8
              pl-4
              sm:pl-8
            "
          >
            <main className="relative h-full">{ children }</main>
            <div className="bg hidden md:block h-full bg-[url('/bg.jpg')] bg-cover bg-center" />
          </div>
        </body>
      </Provider>
    </html>
  )
}