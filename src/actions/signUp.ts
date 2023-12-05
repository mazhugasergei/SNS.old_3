"use server"
import User from "@/models/User"
import nodemailer from "nodemailer"
import bcrypt from "bcrypt"
import { cookies } from "next/headers"
import jwt from "jsonwebtoken"

export const signUp = async (email: string, username: string, fullname: string, password: string) => {
  // if the email is in use
  await User.findOne({ email })
    .then(user => {
      if(user) throw "[email]: This email is already in use."
    })

  // if the username is in use
  await User.findOne({ username })
    .then(user => {
      if(user) throw "[username]: This username is already in use."
    })

  // create verification url code
  const verification_code = await bcrypt.hash(Math.floor((Math.random() * 10000)).toString().padStart(4, '0'), 12)

  // create not yet verified user document
  const user = await User.create({
    email,
    username,
    fullname,
    password: await bcrypt.hash(password, 12),
    verification_code
  })

  // create transporter
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD
    }
  })

  // send email
  await transporter.sendMail({
    from: `${process.env.APP_NAME} <${process.env.EMAIL}>`,
    to: `Recipient <${email}>`,
    subject: `Verify your email`,
    html: `
      <body style="background: #0f172a; color: #0f172a; border-radius: .5rem; padding: 4rem 2rem;">
        <div class="container" style="background: #fff; max-width: 32rem; border-radius: .5rem; padding: 2rem; margin-left: auto; margin-right: auto;">
          <a href="/">
            <img src="${process.env.LOGO}" width="80" />
          </a>
          <div style="font-size: 2rem; font-weight: 700; margin: 1rem 0 .75rem;">Verify your email</div>
          <div>Please click <a href="http://localhost:3000/verification?id=${user._id}&code=${verification_code}" style="color: #0f172a; text-decoration: underline;">here</a> to verify your email on Wave, otherwise you account will be deleted forever after 1 hour. If you did not initiate this verification process, please ignore this email. However, if you suspect any unauthorized access to your account, please contact our <a href="mailto:ghbdtnghbdtn8@gmail.com" style="color: #0f172a; font-weight: bold; text-decoration: underline;">support team</a> immediately.</div>
        </div>
      </body>
    `
  })

  // create token
  const token = jwt.sign({ _id: user._id, password: user.password }, process.env.JWT_SECRET || "", { expiresIn: '30d' })
  
  // save token
  cookies().set("token", token, { expires: new Date(new Date().getTime() + 2592000000) })

  return { ok: true }
}