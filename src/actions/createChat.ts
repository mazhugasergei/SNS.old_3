"use server"
import User from "@/models/User"
import { getAuthId } from "./getAuthId"

export const createChat = async (participants: string[]) => {
  const authId = await getAuthId()
  if(!authId) throw ""

  const user = await User.findById(authId.toString())
  if(!user) throw ""

  const chat = user.chats.find(chat => chat.participants[0] === participants[0])
  if(chat) return { ok: true, chat_id: chat._id }

  const friend = await User.findById(participants)
  if(!friend) throw ""

  const newChatNum = user.chats.push({
    name: friend.fullname,
    image: friend.pfp,
    participants: [friend._id.toString()]
  })

  await user.save()

  const newChatId = user.chats[newChatNum-1]._id

  return {
    ok: true,
    chat_id: newChatId
  }
}