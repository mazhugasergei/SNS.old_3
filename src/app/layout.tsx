import mongoose from 'mongoose'
import { Metadata } from 'next'

// connect to db
mongoose.connect(process.env.MONGODB_URI!)
  .then(() => console.log("connected to db"))

export const metadata: Metadata = {
  title: 'Wave',
  description: 'Mazhuga Sergei\'s SNS graduation thesis',
}

export default ({ children }: { children: React.ReactNode }) => children