"use server"
import User from "@/models/User"

export const getUsers = async (_ids: string[]) => {
  const data = await User.find({ _id: _ids })
  const users = data.map(item => ({
    _id: item._id.toString(),
    username: item.username,
    fullname: item.fullname,
    pfp: item.pfp,
  }))
  return users
}