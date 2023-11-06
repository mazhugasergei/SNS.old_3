import { Inter } from 'next/font/google'
import '@/styles/globals.css'
import '@/styles/index.css'
import Provider from '@/store/Provider'

const inter = Inter({ subsets: ['latin'] })

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
              px-4
              sm:px-8
              md:pr-0
            "
          >
            <main className="relative h-full">{ children }</main>
            {/* bg */}
            <div className="bg hidden md:block h-full bg-[url('/bg.jpg')] bg-cover bg-center" />
            {/* bg */}
            {/* <div className="bg-cont hidden md:block h-full p-4">
              <div className="bg h-full bg-[url('/bg.jpg')] bg-cover bg-center max-h-[calc(100vh-2rem)] rounded-xl" />
            </div> */}
          </div>
        </body>
      </Provider>
    </html>
  )
}