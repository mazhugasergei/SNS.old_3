"use server"
import { UserType } from "@/types/User"
import User from "@/models/User"

export default async (username: string, data: UserType) => {
  // if username is in use
  await User.findOne({ username: data.username })
    .then(user => {
      if(user && username !== user.username) throw "[username]: This username is already in use."
    })
  const user = await User.findOneAndUpdate({ username }, data)
  if(!user) return false
  else return true
}