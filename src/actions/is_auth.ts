"use server"
import User from "@/models/User";
import jwt, { JwtPayload } from "jsonwebtoken"

export default async (token: string) => {
  let user = {_id: "", pfp: "", username: "", display_name: ""}
  // verify token
  jwt.verify(token, process.env.JWT_SECRET!, (err, decoded)=>{
    if(!decoded) return null
    const _decoded = decoded as JwtPayload
    const { _id, pfp, username, display_name } = _decoded.user
    user = { _id, pfp, username, display_name }
  })
  // if verified, check if the user still exists
  const exists = await User.findById(user._id)
  if(exists) return user
  else return null
}