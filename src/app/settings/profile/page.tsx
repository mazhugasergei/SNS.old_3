import { getAuthUser } from "@/actions/getAuthId"
import { FormClientComponent } from "./components/FormClientComponent"
import { redirect } from "next/navigation"

export default async () => {
  const user = await getAuthUser()
  if(!user) redirect("/log-in")

  return user && <FormClientComponent {...{user}} />
}