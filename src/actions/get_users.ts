"use server"

import User from "@/models/User"

export default async (value: string) => {
  const users = await User.find({ username: { $regex: value, $options: 'i' } }, ["fullname", "username"]).limit(5)
  const usernames = users.map(user => ({ fullname: user.fullname, username: user.username }))
  return usernames
}