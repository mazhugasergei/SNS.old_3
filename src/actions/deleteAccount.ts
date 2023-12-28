"use server"
import { User } from "@/models/User"
import bcrypt from "bcrypt"
import { cookies } from "next/headers"

export const deleteAccount = async (_id: string, password: string) => {
  const user = await User.findById(_id)
  if(!user) throw "" // user not found

  // check if password is valid
  const isValid = await bcrypt.compare(password, user.password)
  if(!isValid) throw "[password]: Incorrect password"
  
  // delete the user
  await user.deleteOne()

  // delete token
  cookies().delete("token")
  
  return { ok: true }
}