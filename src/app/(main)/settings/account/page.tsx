import { getAuthUser } from "@/actions/getAuthUser"
import { FormClientComponent } from "./components/FormClientComponent"
import DeleteAccountDialog from "./components/DeleteAccountDialog"
import { redirect } from "next/navigation"

export default async () => {
  const user = await getAuthUser()
  if(!user) redirect("/log-in")

  return user && <>
    <FormClientComponent {...{user}} />
    
    {/* dialogs */}
    <DeleteAccountDialog {...{user}} />
  </>
}