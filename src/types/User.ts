import { SettingsType } from "./Settings"

export type UserType = {
  auth?: boolean | null
  is_signing_up?: boolean | null
  email?: string | null
  username?: string | null
  fullname?: string | null
  bio?: string | null
  pfp?: string | null
  settings?: SettingsType | null
  created?: string | null
}