export type User = {
  _id: string
  email: string
  username: string
  fullname: string
  bio?: string | null
  pfp?: string | null
  banner?: string | null
  private_email: boolean
  verification_code?: string
  chats?: [
    {
      _id: string
      image?: string
      participants: string[]
      lastMessage?: string
      lastMessageTime?: Date
      unread: number
      messages: {
        _id: string
        sender: string
        body: string
        createdAt: Date
        updatedAt: Date
      }[]
    }
  ]
  createdAt: number
}