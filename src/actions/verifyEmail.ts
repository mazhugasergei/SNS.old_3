"use server"
import User from "@/models/User"

export default async (_id: string, code: string) => {
  const user = await User.findById(_id)
  if(!user) throw ""

  if(user.verification_code !== code) throw ""
  
  await user.updateOne({ $unset: { verification_code: 1, expires: 1 } })

  return { ok: true }
}