"use server"
import User from "@/models/User"
import jwt, { JwtPayload } from "jsonwebtoken"

interface User {
  _id: string
  email: string
  username: string
  fullname: string
  bio: string
  pfp: string
  private_email: boolean
  createdAt: Date
  token: string
}

export default async (token: string) => {
  let user: User | undefined
  // verify token
  jwt.verify(token, process.env.JWT_SECRET!, (err, decoded)=>{
    if(!decoded) return
    const _decoded = decoded as JwtPayload
    user = _decoded.user
  })
  // if verified, check if the user still exists
  if(user){
    const { _id, email, username, fullname, bio, pfp, private_email, createdAt } = user
    const exists = await User.findById(_id)
    if(exists) return { email, username, fullname, bio, pfp, private_email, created: createdAt }
    else return null
  }
  else return null
}