import { Schema, model, models } from "mongoose"

const PostSchema = new Schema({
  authorID: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
})

delete models['post']
export default model('post', PostSchema)