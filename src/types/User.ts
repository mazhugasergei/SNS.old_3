export type User = {
  _id: string
  email: string
  username: string
  fullname: string
  bio?: string
  pfp?: string
  private_email: boolean
  createdAt: number
}