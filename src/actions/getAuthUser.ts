"use server"
import User from "@/models/User"
import jwt from "jsonwebtoken"
import { User as UserType } from "@/types/User"
import { cookies } from "next/headers"

export const getAuthUser = async (): Promise<UserType | null> => {
  const token = cookies().get("token")?.value
  if(!token) return null

  // verify token
  let _id, password
  jwt.verify(token, process.env.JWT_SECRET || "", (err, decoded)=>{
    if(typeof decoded !== "object") return
    _id = decoded._id
    password = decoded.password
  })
  if(!_id || !password) return null

  // check if the user still exists
  const user = await User.findOne({ _id, password })
  if(!user) return null

  return {
    _id: user._id.toString(),
    email: user.email,
    username: user.username,
    fullname: user.fullname,
    bio: user.bio,
    pfp: user.pfp,
    banner: user.banner,
    private_email: user.private_email,
    createdAt: user.createdAt.getTime()
  }
}