"use server"
import User from "@/models/User"
import { Account } from "@/types/Account"
import bcrypt from "bcrypt"
import { cookies } from "next/headers"

export default async (data: Account) => {
  const { username } = data
  const user = await User.findOne({ username: data.username })
  if(!user) throw "User not found"

  // if updating password
  if(data.current_password){
    const { current_password, new_password } = data

    // check if entered current password is valid
    const is_valid = await bcrypt.compare(current_password, user.password)
    if(!is_valid) throw "[current_password]: Incorrect password"

    // update password
    await user.updateOne({ password: await bcrypt.hash(new_password!, 12) })
  }

  // delete token
  cookies().delete("token")

  return true
}