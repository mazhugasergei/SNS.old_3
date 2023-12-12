"use server"
import Chat from "@/models/Chat"
import { formatChat } from "./formatChat"
import { Chat as ChatType } from "@/types/Chat"

export const getChat = async (_id: string, user_id: string) => {
  const chat: ChatType | null = await Chat.findById(_id)
  if(!chat) return null
  if(chat.people?.indexOf(user_id) === -1) return null

  return await formatChat(chat, user_id)
}