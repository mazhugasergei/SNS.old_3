import { UserAvatar } from "../../components/UserAvatar"
import Link from "next/link"
import { getAuthUser } from "@/actions/getAuthUser"
import { redirect } from "next/navigation"
import { getChat } from "@/actions/getChat"

export default async ({ params }: { params: { _id: string } }) => {
  const user = await getAuthUser()
  if(!user) redirect("/log-in")

  const chat = await getChat(params._id, user._id)

  return chat ? <>
    <div className="border-b p-4">
      <Link href={`/${chat.username || null}`} className="flex items-center gap-2">
        <div className="rounded-full hover:brightness-[.85] transition">
          <UserAvatar src={chat.pfp || ""} className="w-7 h-7" />
        </div>
        <div className="text-xs font-bold">{ chat.name }</div>
      </Link>
    </div>
    <div className="p-4">chat will be here</div>
  </> : <>chat not found</>
}