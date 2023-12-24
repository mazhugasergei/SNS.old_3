import { getAuthId } from "@/actions/getAuthId"
import Link from "next/link"
import { redirect } from "next/navigation"
import { UserAvatar } from "../../(main)/components/UserAvatar"
import { SearchProvider } from "@/app/(main)/components/SearchProvider"
import { Button } from "@/components/ui/button"
import { LuPlusSquare } from "react-icons/lu"
import User from "@/models/User"

export const Chats = async () => {
  const authId = await getAuthId()
  if(!authId) redirect("/log-in")

  const chats = await (async ()=>{
    const chatsData = await User.findById(authId.toString(), "chats")
    if(!chatsData) throw ""
    return chatsData.chats
  })()

  return <div className="flex flex-col py-4">
    <SearchProvider message>
      <Button className="mb-2">
        <LuPlusSquare className="lg:hidden" />
        <span className="max-lg:hidden">New chat</span>
      </Button>
    </SearchProvider>
    { chats.length ?
        chats.map(chat => {
          if(chat){
            const lastMessageTimeDiff = chat.lastMessageTime ? Date.now() - chat.lastMessageTime.getTime() : null
            const lastMessageTimeNumber = chat.lastMessageTime ? new Date(chat.lastMessageTime.getTime()) : null
            const lastMessageTime =
              (lastMessageTimeDiff && lastMessageTimeNumber) ? (
                lastMessageTimeDiff >= 172800000 ?
                // Jan 10
                `${lastMessageTimeNumber.toDateString().split(" ")[1]} ${lastMessageTimeNumber.toDateString().split(" ")[2]}` :
                lastMessageTimeDiff >= 86400000 ?
                "Yesterday" :
                // 15:03
                lastMessageTimeNumber.getHours() + ':' + (lastMessageTimeNumber.getMinutes() < 10 ? '0' : '') + lastMessageTimeNumber.getMinutes()
              ) : null
            return (
              <Link href={`/messages/${chat._id?.toString()}`} className="cursor-pointer flex items-center gap-2 text-sm rounded-sm hover:bg-accent px-2 py-2 transition" key={chat._id?.toString()}>
                <UserAvatar src={chat.image || ""} className="w-8 h-8" />
                <div className="max-lg:hidden flex-1">
                  <div className="flex items-center">
                    <div className="line-clamp-1">{ chat.name }</div>
                    { lastMessageTime && <div className="text-xs opacity-80 whitespace-nowrap">&nbsp;· { lastMessageTime }</div> }
                  </div>
                  <div className="line-clamp-1 text-xs opacity-80">[ { chat.unread } ] { chat.lastMessage }</div>
                </div>
              </Link>
            )
          }
        }) : <>no chats</> }
  </div>
}