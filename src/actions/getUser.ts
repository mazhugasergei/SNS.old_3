"use server"
import User from "@/models/User"
import { User as UserType } from "@/types/User"

export const getUser = async (username: string) => {
  const user = await User.findOne({ username })
  const res: UserType | null = user ? {
    _id: user._id.toString(),
    email: user.email,
    username: user.username,
    fullname: user.fullname,
    bio: user.bio,
    pfp: user.pfp,
    private_email: user.private_email,
    createdAt: user.createdAt.getDate()
  } : null

  return res
}