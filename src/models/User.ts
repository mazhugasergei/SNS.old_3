import mongoose, { Schema, model } from "mongoose"

const UserSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  fullname: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  bio: String,
  pfp: String,
  verification_code: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  expires: {
    type: Date,
    default: Date.now,
    expires: 300
  }
})

delete mongoose.models['user']
export default model('user', UserSchema)