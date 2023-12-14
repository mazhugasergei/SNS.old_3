"use server"
import Chat from "@/models/Chat"

export const sendMessage = async (message: string, chat_id: string, user_id: string) => {
  const chat = await Chat.findById(chat_id)
  if(!chat) throw ""

  chat.messages.push({
    authorID: user_id,
    message: message
  })

  await chat.save()
  return { ok: true }
}