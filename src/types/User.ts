export type User = {
  _id: string
  email: string
  username: string
  fullname: string
  bio?: string | null
  pfp?: string | null
  private_email: boolean
  verification_code?: string
  createdAt: number
}