import { Schema, model, models } from "mongoose"

const messagesSchema = new Schema({
  sender: String,
  body: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
})

const chatSchema = new Schema({
  name: String,
  image: String,
  participants: [String],
  lastMessage: String,
  lastMessageTime: Date,
  unread: {
    type: Number,
    default: 0
  },
  messages: [messagesSchema]
})

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
  bio: {
    type: String,
    default: null
  },
  pfp: {
    type: String,
    default: null
  },
  banner: String,

  verification_code: String,

  private_email: {
    type: Boolean,
    default: false
  },

  chats: [chatSchema],

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