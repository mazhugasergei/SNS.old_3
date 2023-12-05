"use server"
import User from "@/models/User"
import bcrypt from "bcrypt"
import { cookies } from "next/headers"

export const deleteAccount = async (_id: string, password: string) => {
  const user = await User.findById(_id)
  if(!user) throw "" // user not found

  // delete user if entered password is valid
  const isValid = await bcrypt.compare(password, user.password)
  if(isValid) await user.deleteOne()
  else throw "[password]: Incorrect password"

  // delete token
  cookies().delete("token")
  
  return { ok: true }
}