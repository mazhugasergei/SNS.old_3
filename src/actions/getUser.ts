"use server"
import User from "@/models/User"
import mongoose from "mongoose"

export const getUser = async ({ _id, username }: { _id?: string, username?: string }) => {
  const user =
    // if id is provided
    _id && mongoose.Types.ObjectId.isValid(_id) ? await User.findById(_id) :
    // if username is provided
    username ? await User.findOne({ username }) :
    // else no user to look for
    null
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