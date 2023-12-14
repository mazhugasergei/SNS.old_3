export type Chat = {
  _id: string
  name?: string | null
  people: string[]
  pfp?: string | null
  username?: string | null
  messages: [
    {
      authorID: string
      message: string
      createdAt: Date
    }
  ]
}