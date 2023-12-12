"use server"
import Chat from "@/models/Chat"
import { formatChat } from "./formatChat"
import { Chat as ChatType } from "@/types/Chat"

export const getChats = async (user_id: string) => {
  const chats: ChatType[] = await Chat.find({ people: user_id })
  if(!chats) return null

  return await Promise.all(chats.map(async (chat) => await formatChat(chat, user_id)))
}