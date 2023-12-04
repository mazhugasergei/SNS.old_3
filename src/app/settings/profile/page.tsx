import { getAuthUser } from "@/actions/getAuthUser"
import { FormClientComponent } from "./components/FormClientComponent"

export default async () => {
  const user = await getAuthUser()

  return user && <FormClientComponent {...{user}} />
}