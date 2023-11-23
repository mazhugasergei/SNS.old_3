"use server"
import User from "@/models/User"
import bcrypt from "bcrypt"

export default async (username: string, password: string) => {
  const user = await User.findOne({ username })
  if(!user) throw "User not found"
  const is_valid = await bcrypt.compare(password, user.password)
  if(is_valid) await user.deleteOne()
  else throw "[password]: Incorrect password"
  return
}