"use server"
import Chat from "@/models/Chat"
import { Chat as ChatType } from "@/types/Chat"
import { getUser } from "./getUser"

export const getChat = async (_id: string, user_id: string) => {
  const chat: ChatType | null = await Chat.findById(_id)
  if(!chat) return null
  // if auth user in not a memeber of the chat
  if(chat.people.indexOf(user_id) === -1) return null

  const friendID = chat.people[Number(!chat.people.indexOf(user_id))]
  const friend = await getUser({ _id: friendID })
  if(!friend) return null

  return {
    fullname: friend.fullname,
    username: friend.username,
    pfp: friend.pfp,
    messages: chat.messages
  }
}