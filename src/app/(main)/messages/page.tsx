import { getAuthUser } from "@/actions/getAuthUser"
import { redirect } from "next/navigation"

export default async () => {
  const user = await getAuthUser()
  if(!user) redirect("/log-in")

  return user && (
    <>messages</>
  )
}