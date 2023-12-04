"use server"
import User from "@/models/User"
import jwt from "jsonwebtoken"
import { User as UserType } from "@/types/User"
import { cookies } from "next/headers"

export const getAuthUser = async () => {
  // get token
  const token = cookies().get("token")?.value

  // check if token exists
  if(!token) return

  let _id, password

  // verify token
  jwt.verify(token, process.env.JWT_SECRET || "", (err, decoded)=>{
    // return if the user document is not an object
    if(typeof decoded !== "object") return
    // get _id and password
    _id = decoded._id
    password = decoded.password
  })
  
  // check if token is verified
  if(!_id || !password) return

  // check if the user still exists
  const user = await User.findOne({ _id, password })
  if(!user) return
  
  const res: UserType = {
    _id: user._id.toString(),
    email: user.email,
    username: user.username,
    fullname: user.fullname,
    bio: user.bio || "",
    pfp: user.pfp || "",
    private_email: user.private_email,
    createdAt: user.createdAt.getDate()
  }
  return res
}