"use server"
import User from "@/models/User"
import { getAuthId } from "./getAuthId"
import mongoose from "mongoose"

/*
  If more than 2 members chosen
    Create a group chat
    Return the id of the created chat
  Else
    If the chat exists: redirect
    If the chosen member has existing chat with you
      Get the chat id
    Create a new chat with the existing chat id or a new one
    Return the id of the created chat
*/

export const createChat = async (participants: string[]) => {
  const authId = await getAuthId()
  if(!authId) throw ""

  const authUser = await User.findById(authId)
  if(!authUser) throw ""

  const participantsTotal = [authId.toString(), ...participants]

  if(participantsTotal.length > 2){
    const newChat = authUser.chats.create({
      image: "",
      participants
    })
    await authUser.save()
    return { ok: true, chatId: newChat._id.toString() }
  }

  else{
    const exists = authUser.chats.find(chat => chat.participants === participants)
    if(exists) return { ok: true, chatId: exists._id.toString() }
    const friend = await User.findById(participants[0])
    if(!friend) throw ""
    const hasChatWithYou = friend.chats.find(chat => chat.participants.length === 1 && chat.participants[0] === authId.toString())
    const newChatId = hasChatWithYou ? hasChatWithYou._id : new mongoose.Types.ObjectId()
    authUser.chats.create({
      _id: newChatId,
      participants
    })
    await authUser.save()
    return { ok: true, chatId: newChatId.toString() }
  }
}