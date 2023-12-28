"use server"
import { User } from "@/models/User"
import { Account } from "@/types/Account"
import bcrypt from "bcrypt"
import { cookies } from "next/headers"

export const updateAccount = async (data: Account) => {
  const { _id, current_password, new_password } = data
  const user = await User.findById(_id)
  if(!user) throw ""

  // if changing password
  if(current_password?.length && new_password?.length){
    // check if entered current password is valid
    const isValid = await bcrypt.compare(current_password, user.password)
    if(!isValid) throw "[current_password]: Incorrect password"

    // update password
    await user.updateOne({ password: await bcrypt.hash(new_password, 12) })

    // delete token
    cookies().delete("token")
  }

  return { ok: true }
}