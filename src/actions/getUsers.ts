"use server"
import User from "@/models/User"

export const getUsers = async (search: string) => {
  const data = await User.find({ username: { $regex: search, $options: 'i' } }, ["pfp", "fullname", "username"]).limit(5)
  const users = data.map(user => ({ pfp: user.pfp, fullname: user.fullname, username: user.username }))
  return users
}