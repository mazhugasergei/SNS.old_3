"use server"
import User from "@/models/User"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export default async (email: string, password: string) => {
  // check if the email provided an email or a username
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const username = emailRegex.test(email) ? null : email
  // does the user exist
  const user = await User.findOne(username ? { username } : { email })
  if(!user) throw "[email]: User doesn't exist"
  // check if the password is correct
  const isValid = await bcrypt.compare(password, user.password)
  if(!isValid) throw "[password]: Incorrect password"
  // token
  const token = jwt.sign({ user }, process.env.JWT_SECRET!, { expiresIn: '30d' })
  return { token }
}