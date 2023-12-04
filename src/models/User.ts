import { Schema, model, models } from "mongoose"

const UserSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  lastUsernameUpdate: {
    type: Date,
    default: Date.now,
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
  changing_email_codes: [String],

  private_email: {
    type: Boolean,
    default: false
  },

  createdAt: {
    type: Date,
    default: Date.now
  },
  
  expires: {
    type: Date,
    default: Date.now,
    expires: 3600 // 1h
  }
})

delete models['user']
export default model('user', UserSchema)