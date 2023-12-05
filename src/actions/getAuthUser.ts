"use server"
import User from "@/models/User"
import jwt from "jsonwebtoken"
import { User as UserType } from "@/types/User"
import { cookies } from "next/headers"

export const getAuthUser = async () => {
  // get token
  const token = cookies().get("token")?.value

  // check if token exists
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
  
  const res: UserType = {
    _id: user._id.toString(),
    email: user.email,
    username: user.username,
    fullname: user.fullname,
    bio: user.bio,
    pfp: user.pfp,
    private_email: user.private_email,
    createdAt: user.createdAt.getDate()
  }

  return res
}