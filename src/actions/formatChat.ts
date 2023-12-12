"use server"
import { getUser } from "./getUser"
import User from "@/models/User"
import { Chat } from "@/types/Chat"

export const formatChat = async (chat: Chat, user_id: string) => {
  if(!chat.people) return null
  // chat with someone
  if(chat.people.length == 2){
    const friendID = chat.people[Number(!chat.people.indexOf(user_id))]
    const friend = await getUser({ _id: friendID })
    if(!friend) return null
    const res: Chat = {
      _id: chat._id.toString(),
      name: friend.fullname,
      username: friend.username,
      pfp: friend.pfp
    }
    return res
  }
  // chat with a group of people
  else if(chat.people.length > 2){
    const friends = await User.find({ _id: { $in: chat.people } })
    if(!friends) return null
    const res: Chat = {
      _id: chat._id.toString(),
      name: chat.name || friends.map(friend => friend.fullname).join(", ")
    }
    return res
  }
}