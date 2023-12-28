import { getAuthId } from "@/actions/getAuthId"
import { FormClientComponent } from "./components/FormClientComponent"
import DeleteAccountDialog from "./components/DeleteAccountDialog"
import { redirect } from "next/navigation"
import { User } from "@/models/User"

export default async () => {
  const authId = await getAuthId()
  if(!authId) redirect("/log-in")
  const authUser = await (async ()=>{
    const user = await User.findById(authId, ["_id", "email", "username", "fullname", "private_email", "createdAt"])
    if(!user) throw ""
    return {
      _id: user._id.toString(),
      email: user.email,
      username: user.username,
      fullname: user.fullname,
      private_email: user.private_email,
      createdAt: user.createdAt.getTime()
    }
  })()

  return authUser && <>
    <FormClientComponent authId={authId} />
    
    {/* dialogs */}
    <DeleteAccountDialog authId={authId} />
  </>
}