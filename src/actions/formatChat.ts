"use server"
import { getUser } from "./getUser"
import User from "@/models/User"
import { Chat } from "@/types/Chat"

export const formatChat = async (chat: Chat, user_id: string) => {
  if(!chat.people) return null
  // 2 people chat
  if(chat.people.length == 2){
    const friendID = chat.people[Number(!chat.people.indexOf(user_id))]
    const friend = await getUser({ _id: friendID })
    if(!friend) return null
    return {
      _id: chat._id.toString(),
      name: friend.fullname,
      username: friend.username,
      pfp: friend.pfp
    }
  }
  // group chat
  else if(chat.people.length > 2){
    const friends = await User.find({ _id: { $in: chat.people } })
    if(!friends) return null
    return {
      _id: chat._id.toString(),
      name: chat.name || friends.map(friend => friend.fullname).join(", ")
    }
  }
}