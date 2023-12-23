import { Schema, model, models } from "mongoose"

const ChatSchema = new Schema({
  pfp: String,
  name: String,
  users: [String],
  createdAt: {
    type: Date,
    default: Date.now
  }
})

delete models['chat']
export default model('chat', ChatSchema)