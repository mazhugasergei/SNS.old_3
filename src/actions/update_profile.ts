"use server"
import { UserType } from "@/types/User"
import User from "@/models/User"

export default async (username: string, data: UserType) => {
  // if username is in use
  if(data.username){
    const user = await User.findOne({ username: data.username })
    if(user) throw "[username]: This username is already in use."
  }

  const user = await User.findOne({ username })
  if(!user) throw "" // User not found

  // if didn't wait 30 days since last username edit
  if(data.username){
    const daysSinceLastUsernameEdit = Math.floor((Date.now() - user.lastUsernameUpdate.getTime()) / 86400000)
    if(daysSinceLastUsernameEdit < 30) throw `[username]: Wait ${30 - daysSinceLastUsernameEdit} more days until you can update your username`
    else await user.updateOne({ lastUsernameUpdate: Date.now() })
  }
  
  await user.updateOne({ ...data })
  return true
}