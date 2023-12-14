"use server"
import Chat from "@/models/Chat"
import { Chat as ChatType } from "@/types/Chat"
import { getUser } from "./getUser"

export const getChats = async (user_id: string) => {
  const chats: ChatType[] = await Chat.find({ people: user_id })
  if(!chats) return null

  return await Promise.all(chats.map(async (chat) => {
    const friendID = chat.people[Number(!chat.people.indexOf(user_id))]
    const friend = await getUser({ _id: friendID })
    if(!friend) return null

    return {
      _id: chat._id.toString(),
      fullname: friend.fullname,
      pfp: friend.pfp
    }
  }))
}