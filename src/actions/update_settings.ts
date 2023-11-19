"use server"

import { Settings } from "@/interfaces/Settings"
import User from "@/models/User"

export default async (username: string, settings: Settings) => {
  const user = await User.findOneAndUpdate({ username }, { settings })
  if(!user) return false
  else return true
}