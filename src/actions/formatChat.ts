"use server"
import { getUser } from "./getUser"
import { Chat } from "@/types/Chat"

export const formatChat = async (chat: Chat, user_id: string) => {
  if(!chat.people) return null

  const friendID = chat.people[Number(!chat.people.indexOf(user_id))]
  const friend = await getUser({ _id: friendID })
  if(!friend) return null
  return {
    _id: chat._id.toString(),
    fullname: friend.fullname,
    username: friend.username,
    pfp: friend.pfp,
    messages: chat.messages
  }
}