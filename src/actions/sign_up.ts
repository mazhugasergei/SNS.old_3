"use server"
import User from "@/models/User"
import nodemailer from "nodemailer"
import bcrypt from "bcrypt"

export default async (email: string, username: string, fullname: string, password: string) => {
  // if the email is in use
  const user = await User.findOne({ email })
  if(user && !user.verification_code) throw "[email]: This email is already in use."

  // if the username is in use by another email
  await User.findOne({ username })
    .then(another_user => {
      if(another_user && email !== another_user.email) throw "[username]: This username is already in use."
    })

  // create not yet verified user document
  const verification_code = Math.floor((Math.random() * 10000)).toString().padStart(4, '0')
  if(user) await User.findOneAndUpdate({ email }, { username, fullname, password: await bcrypt.hash(password, 12), verification_code } )
  else await User.create({ email, username, fullname, password: await bcrypt.hash(password, 12), verification_code })

  // create transporter
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD
    }
  })

  // // send email
  // await transporter.sendMail({
  //   from: `${process.env.APP_NAME} <${process.env.EMAIL}>`,
  //   to: `Recipient <${email}>`,
  //   subject: `Your verification code`,
  //   text: `Your verification code: ${verification_code}`
  // })

  return
}