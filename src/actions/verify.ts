"use server"
import User from "@/models/User"
import jwt from "jsonwebtoken"

export default async (email: string, verificationCode: string) => {
  // if the code doesn't exist
  let user = await User.findOne({ email })
  if(!user || !user.verification_code || verificationCode !== user.verification_code)
    throw "[code]: The code is wrong or expired."
  
  // delete the code
  user = await User.findOneAndUpdate({ email }, { $unset: { verification_code: 1, expires: 1 } })

  // create token
  const token = jwt.sign({ user }, process.env.JWT_SECRET!, { expiresIn: '30d' })

  return {
    username: user?.username,
    fullname: user?.fullname,
    bio: user?.bio,
    pfp: user?.pfp,
    created: user?.createdAt,
    token
  }
}