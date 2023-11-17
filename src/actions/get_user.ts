"use server"
import User from "@/models/User"

export default async (username: string) => {
  const user = await User.findOne({ username })
  return user ? {
    email: user.email,
    username: user.username,
    fullname: user.fullname,
    bio: user.bio,
    pfp: user.pfp,
    settings: {
      private_email: user.settings?.private_email
    },
    created: user.createdAt.toString()
  } : null
}