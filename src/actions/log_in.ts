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
  const is_valid = await bcrypt.compare(password, user.password)
  if(!is_valid) throw "[password]: Incorrect password"
  // token
  const token = jwt.sign({ _id: user?._id, password: user?.password }, process.env.JWT_SECRET!, { expiresIn: '30d' })
  
  return {
    _id: user._id.toString(),
    email,
    username: user.username,
    fullname: user.fullname,
    bio: user.bio,
    pfp: user.pfp,
    private_email: user.private_email,
    created: user.createdAt.getDate(),
    token
  }
}