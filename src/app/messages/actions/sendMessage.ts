"use server"
import Chat from "@/models/Chat"
import Message from "@/models/Message"

export const sendMessage = async (chat_id: string, user_id: string, message: string) => {
  const chat = await Chat.findById(chat_id)
  if(!chat) throw ""

  const newMessage = await Message.create({
    chatId: chat_id,
    senderId: user_id,
    body: message
  })
  if(!newMessage) throw ""
  
  return { ok: true }
}