import { getAuthUser } from "@/actions/getAuthUser"
import Link from "next/link"
import { redirect } from "next/navigation"
import { UserAvatar } from "../../(main)/components/UserAvatar"
import Chat from "@/models/Chat"
import { getUser } from "@/actions/getUser"
import Message from "@/models/Message"
import { SearchProvider } from "@/app/(main)/components/SearchProvider"
import { Button } from "@/components/ui/button"
import { LuPlusSquare } from "react-icons/lu"

export const Chats = async () => {
  const user = await getAuthUser()
  if(!user) redirect("/log-in")

  const chats = await (async () => {
    const chatData = await Chat.find({ users: user._id })
    if(!chatData) return null
    return await Promise.all(chatData.map(async (chat) => {
      const friendID = chat.users[Number(!chat.users.indexOf(user._id))]
      const friend = await getUser({ _id: friendID })
      if(!friend) return null
      const chatId = chat._id.toString()
      const lastMessage = await Message.find({ chatId: chatId })
        .sort({ createdAt: -1 })
        .limit(1)
      return {
        _id: chatId,
        name: friend.fullname,
        pfp: friend.pfp,
        lastMessage: lastMessage[0]?.body || "",
        lastMessageTime: lastMessage[0]?.createdAt || null
      }
    }))
  })()

  return chats ? (
    <div className="flex flex-col py-4">
      <SearchProvider message>
        <Button className="mb-2">
          <LuPlusSquare className="lg:hidden" />
          <span className="max-lg:hidden">New chat</span>
        </Button>
      </SearchProvider>
      { chats.map(chat => {
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
            <Link href={`/messages/${chat._id}`} className="cursor-pointer flex items-center gap-2 text-sm rounded-sm hover:bg-accent px-2 py-2 transition" key={chat._id}>
              <UserAvatar src={chat.pfp || ""} className="w-8 h-8" />
              <div className="max-lg:hidden flex-1">
                <div className="flex items-center">
                  <div className="line-clamp-1">{ chat.name }</div>
                  { lastMessageTime && <div className="text-xs opacity-80 whitespace-nowrap">&nbsp;· { lastMessageTime }</div> }
                </div>
                <div className="line-clamp-1 text-xs opacity-80">{ chat.lastMessage }</div>
              </div>
            </Link>
          )
        }
      }) }
    </div>
  ) : <>no chats</>
}