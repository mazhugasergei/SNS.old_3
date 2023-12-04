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

  likes: {
    type: [String],
    default: []
  },
  comments: {
    type: [{
      authorID: {
        type: String,
        required: true
      },
      body: {
        type: String,
        required: true
      }
    }],
    default: []
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
})

delete models['post']
export default model('post', PostSchema)