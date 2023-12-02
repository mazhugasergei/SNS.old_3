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
  settings: {
    private_email: boolean
  }
  createdAt: Date
  token: string
}

export default async (token: string) => {
  let _id, password
  // verify token
  jwt.verify(token, process.env.JWT_SECRET!, (err, decoded)=>{
    if(!decoded) return
    const _decoded = decoded as JwtPayload
    _id = _decoded._id
    password = _decoded.password
  })
  // if verified, check if the user still exists
  if(_id && password){
    const user = await User.findOne({ _id, password })
    if(user) return {
      _id: user._id.toString(),
      email: user.email,
      username: user.username,
      fullname: user.fullname,
      bio: user.bio,
      pfp: user.pfp,
      private_email: user.private_email,
      createdAt: user.createdAt.getDate()
    }
    else return null
  }
  else return null
}