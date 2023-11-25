"use server"
import User from "@/models/User"
import nodemailer from "nodemailer"

export default async (username: string, email: string, newEmail: string) => {
  // if new email is in use
  await User.findOne({ email: newEmail })
    .then(user => {
      if(user) throw "[email]: This email is already in use."
    })

  // create email codes
  const code_1 = Math.floor((Math.random() * 10000)).toString().padStart(4, '0')
  const code_2 = Math.floor((Math.random() * 10000)).toString().padStart(4, '0')
  
  // create transporter
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD
    }
  })

  // send email with code_1
  await transporter.sendMail({
    from: `${process.env.APP_NAME} <${process.env.EMAIL}>`,
    to: `Recipient <${email}>`,
    subject: `Your verification code: ${code_1}`,
    html: `
      <body style="background: #0f172a; color: #0f172a; border-radius: .5rem; padding: 4rem 2rem;">
        <div class="container" style="background: #fff; max-width: 32rem; border-radius: .5rem; padding: 2rem; margin-left: auto; margin-right: auto;">
          <a href="/">
            <img src="${process.env.LOGO}" width="80" />
          </a>
          <div style="font-size: 2rem; font-weight: 700; margin: 1rem 0 .75rem;">${code_1}</div>
          <div>Please enter this code in the provided field to complete the verification process. <b>ATTENTION:</b> If you did not initiate this verification process, change your password immediately, you also may contact our <a href="mailto:ghbdtnghbdtn8@gmail.com" style="color: #0f172a;">support team</a>.</div>
        </div>
      </body>
    `
  })

  // send email with code_2
  await transporter.sendMail({
    from: `${process.env.APP_NAME} <${process.env.EMAIL}>`,
    to: `Recipient <${newEmail}>`,
    subject: `Your verification code: ${code_2}`,
    html: `
      <body style="background: #0f172a; color: #0f172a; border-radius: .5rem; padding: 4rem 2rem;">
        <div class="container" style="background: #fff; max-width: 32rem; border-radius: .5rem; padding: 2rem; margin-left: auto; margin-right: auto;">
          <a href="/">
            <img src="${process.env.LOGO}" width="80" />
          </a>
          <div style="font-size: 2rem; font-weight: 700; margin: 1rem 0 .75rem;">${code_2}</div>
          <div>Please enter this code in the provided field to complete the verification process. If you did not initiate this verification process, please ignore this email. However, if you suspect any unauthorized access to your account, please contact our <a href="mailto:ghbdtnghbdtn8@gmail.com" style="color: #0f172a;">support team</a> immediately.</div>
        </div>
      </body>
    `
  })

  await User.findOneAndUpdate({ username }, { changing_email_codes: [code_1, code_2] })
  return true
}