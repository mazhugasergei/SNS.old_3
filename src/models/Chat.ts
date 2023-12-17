import { Schema, model, models } from "mongoose"

const ChatSchema = new Schema({
  pfp: String,
  name: String,
  users: [String],
  unread: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

delete models['chat']
export default model('chat', ChatSchema)