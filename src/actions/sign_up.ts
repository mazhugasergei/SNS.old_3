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
  if(user) await User.findOneAndUpdate({ email }, { username, lastUsernameUpdate: Date.now(), fullname, password: await bcrypt.hash(password, 12), verification_code } )
  else await User.create({ email, username, lastUsernameUpdate: Date.now(), fullname, password: await bcrypt.hash(password, 12), verification_code })

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
    subject: `Your verification code: ${verification_code}`,
    html: `
      <body style="background: #0f172a; color: #0f172a; border-radius: .5rem; padding: 4rem 2rem;">
        <div class="container" style="background: #fff; max-width: 32rem; border-radius: .5rem; padding: 2rem; margin-left: auto; margin-right: auto;">
          <a href="/">
            <img src="${process.env.LOGO}" width="80" />
          </a>
          <div style="font-size: 2rem; font-weight: 700; margin: 1rem 0 .75rem;">${verification_code}</div>
          <div>Please enter this code in the provided field to complete the verification process. If you did not initiate this verification process, please ignore this email. However, if you suspect any unauthorized access to your account, please contact our <a href="mailto:ghbdtnghbdtn8@gmail.com" style="color: #0f172a;">support team</a> immediately.</div>
        </div>
      </body>
    `
  })

  return
}