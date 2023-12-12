import { Schema, model, models } from "mongoose"

const ChatSchema = new Schema({
  name: String,
  people: [String],
  pfp: String,
  username: String
})

delete models['chat']
export default model('chat', ChatSchema)