"use server"
import Chat from "@/models/Chat"
import { redirect } from "next/navigation"
import { getAuthUser } from "./getAuthUser"

export const createChat = async (partner_id: string) => {
  const user = await getAuthUser()
  if(!user) throw ""

  const chat = await Chat.findOne({ users: [user._id, partner_id] })
  if(chat) return { ok: true, chat_id: chat._id }

  const newChat = await Chat.create({
    users: [user._id, partner_id]
  })

  return { ok: true, chat_id: newChat._id }
}