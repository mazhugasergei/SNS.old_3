import { getAuthUser } from "@/actions/getAuthUser"
import { FormClientComponent } from "./components/FormClientComponent"
import DeleteAccountDialog from "./components/DeleteAccountDialog"

export default async () => {
  const user = await getAuthUser()

  return user && <>
    <FormClientComponent />
    
    {/* dialogs */}
    <DeleteAccountDialog />
  </>
}