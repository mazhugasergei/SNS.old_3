import { Schema, model, models } from "mongoose"

const MessageSchema = new Schema({
  authorID: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const ChatSchema = new Schema({
  name: String,
  people: [String],
  pfp: String,
  username: String,
  messages: [MessageSchema]
})

delete models['chat']
export default model('chat', ChatSchema)