"use server"
import User from "@/models/User"

export default async (username: string) => {
  await User.findOneAndUpdate({ username }, { changing_email_codes: [ Math.floor((Math.random() * 10000)).toString().padStart(4, '0'), Math.floor((Math.random() * 10000)).toString().padStart(4, '0') ] })
  return
}