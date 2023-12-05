import { getAuthUser } from "@/actions/getAuthUser"
import { FormClientComponent } from "./components/FormClientComponents"
import { redirect } from "next/navigation"

export default async () => {
  const user = await getAuthUser()
  if(user) redirect("/")

  return <FormClientComponent />
}