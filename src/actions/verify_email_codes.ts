"use server"
import User from "@/models/User"

export default async (email: string, newEmail: string, code_1: string, code_2: string) => {
  const user = await User.findOne({ email })
  if(user?.changing_email_codes[0] === code_1 && user?.changing_email_codes[1] === code_2){
    await user.updateOne({ email: newEmail, $unset: { changing_email_codes: 1 } })
    return true
  }
  else return false
}