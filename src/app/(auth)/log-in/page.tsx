import { getAuth } from "@/actions/getAuthUser"
import { cookies } from "next/headers"
import { FormClientComponent } from "./components/FormClientComponents"

export default async () => {
  const token = cookies().get("token")
  const user = token ? await getAuth(token.value) : null

  return <FormClientComponent />
}