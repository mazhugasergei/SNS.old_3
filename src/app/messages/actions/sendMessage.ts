"use server"
import { getAuthId } from "@/actions/getAuthId"
import User from "@/models/User"
import mongoose from "mongoose"

export const sendMessage = async (chatId: string, message: string) => {
  const authId = await getAuthId()
  if(!authId) throw ""

  const chat = await User.findById(authId)
    .then(user => user?.chats.find(chat => chat._id?.toString() === chatId))
  if(!chat) throw ""

  const participants = [authId.toString(), ...chat?.participants]

  // update the chats
  participants.forEach(async (participantId) => {
    const chatExists = await User.findOne({ _id: participantId, 'chats._id': chatId }, "_id")
    // create the chat for those who doesn't have it
    if(!chatExists){
      const currUser = await User.findById(participantId)
      if(!currUser) throw ""
      if(participants.length > 2){
        console.log("sendMEssage TODO")
      }
      else{
        const friend = await User.findById(participants.find(item => item !== participantId))
        if(!friend) throw ""
        currUser.chats.push({
          _id: new mongoose.Types.ObjectId(chatId),
          name: friend.fullname,
          image: friend.pfp,
          participants: [friend._id.toString()]
        })
        await currUser.save()
      }
    }
    // send the message to everyone
    await User.updateOne(
      { _id: participantId, "chats._id": chatId },
      { 
        $set: {
          "chats.$.lastMessage": message,
          "chats.$.lastMessageTime": Date.now(),
          "chats.$.unread": participantId === authId.toString() ? "chats.$.unread" : "chats.$.unread"+1
        },
        $push: {
          "chats.$.messages": {
            sender: participantId === authId.toString() ? undefined : participantId,
            body: message
          }
        }
      }
    )
  })
  
  return { ok: true }
}