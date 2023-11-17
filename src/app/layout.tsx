import Provider from '@/store/Provider'
import mongoose from 'mongoose'
import { Metadata } from 'next'
import { Inter } from 'next/font/google'
import AutoAuth from '@/components/AutoAuth'
import { Toaster } from "@/components/ui/toaster"
import ThemeProvider from '@/components/ThemeProvider'

// connect to db
mongoose.connect(process.env.MONGODB_URI!)
  .then(() => console.log("connected to db"))

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Wave',
  description: 'Mazhuga Sergei\'s SNS graduation thesis',
}

export default ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <Provider>
        <body className={`${inter.className} min-h-screen relative`}>
          {/* <ThemeProvider attribute="class" disableTransitionOnChange> */}
            <AutoAuth />
            { children }
            <Toaster />
          {/* </ThemeProvider> */}
        </body>
      </Provider>
    </html>
  )
}