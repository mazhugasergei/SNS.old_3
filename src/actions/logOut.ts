"use server"
import { cookies } from "next/headers"

export const logOut = () => {
  cookies().delete("token")
}