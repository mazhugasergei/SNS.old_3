"use server"
import User from "@/models/User"

export const getUsers = async (search?: string) => {
  const data = await User.find({ $or: [ { username: { $regex: search || "", $options: 'i' } }, { fullname: { $regex: search || "", $options: 'i' } } ] }, ["_id", "pfp", "fullname", "username"]).limit(5)
  const users = data.map(user => ({
    _id: user._id.toString(),
    pfp: user.pfp,
    fullname: user.fullname,
    username: user.username
  }))
  return users
}