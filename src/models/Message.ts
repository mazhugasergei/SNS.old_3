import { Schema, model, models } from "mongoose"

const MessageSchema = new Schema({
  chatId: String,
  senderId: String,
  body: String
}, { timestamps: true })

delete models['message']
export default model('message', MessageSchema)