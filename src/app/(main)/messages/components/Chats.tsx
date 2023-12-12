import { getAuthUser } from "@/actions/getAuthUser"
import Link from "next/link"
import { redirect } from "next/navigation"
import { UserAvatar } from "../../components/UserAvatar"
import { getChats } from "@/actions/getChats"

export const Chats = async () => {
  const user = await getAuthUser()
  if(!user) redirect("/log-in")

  // getting default users
  const chats = await getChats(user._id)

  const itemClasses = `
    cursor-pointer
    flex
    items-center
    gap-2
    text-sm
    rounded-sm
    hover:bg-accent
    px-2
    py-2
  `

  return chats && (
    <div className="flex flex-col">{
      chats.map(chat => chat && (
        <Link href={`/messages/${chat._id}`} className={itemClasses} key={chat.username}>
          <UserAvatar src={chat.pfp || ""} className="w-7 h-7" />
          { chat.name }
        </Link>
      ))
    }</div>
  )
}