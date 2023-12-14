export type Post = {
  _id: string
  authorID: string
  body: string
  likes: string[]
  comments: {
    authorID: string
    body: string
  }[]
  createdAt: number
}