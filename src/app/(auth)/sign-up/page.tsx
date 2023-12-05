import { redirect } from "next/navigation"
import { FormClientComponent } from "./components/FormClientComponent"
import { getAuthUser } from "@/actions/getAuthUser"

export default async () => {
  const user = await getAuthUser()
  if(user) redirect("/")

  return <FormClientComponent />
}