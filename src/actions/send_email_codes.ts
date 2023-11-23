"use server"
import User from "@/models/User"

export default async (username: string, newEmail: string) => {
  // if new email is in use
  await User.findOne({ email: newEmail })
    .then(user => {
      if(user) throw "[email]: This email is already in use."
    })

  // send email codes
  const code_1 = Math.floor((Math.random() * 10000)).toString().padStart(4, '0')
  const code_2 = Math.floor((Math.random() * 10000)).toString().padStart(4, '0')
  // TODO: send with nodemailer
  await User.findOneAndUpdate({ username }, { changing_email_codes: [code_1, code_2] })
  return true
}