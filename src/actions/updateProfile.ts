"use server"
import { User as UserType } from "@/types/User"
import User from "@/models/User"

export const updateProfile = async (username: string, data: UserType) => {
  const user = await User.findOne({ username })
  if(!user) throw "" // user not found

  // if username is in use
  if(username !== data.username){
    const user = await User.findOne({ username: data.username })
    if(user) throw "[username]: This username is already in use."
  }

  // if didn't wait 30 days since last username edit
  if(username !== data.username){
    const daysSinceLastUsernameEdit = Math.ceil((Date.now() - user.lastUsernameUpdate.getTime()) / 86400000)
    if(daysSinceLastUsernameEdit < 30) throw `[username]: Wait ${30 - daysSinceLastUsernameEdit} more day${(30 - daysSinceLastUsernameEdit) % 10 !== 1 && "s"} until you can update your username`
    else await user.updateOne({ lastUsernameUpdate: Date.now() })
  }
  
  // update profile
  await user.updateOne(data)

  return { ok: true }
}