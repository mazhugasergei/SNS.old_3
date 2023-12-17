import { UserAvatar } from "../../(main)/components/UserAvatar"
import Link from "next/link"
import { getAuthUser } from "@/actions/getAuthUser"
import { redirect } from "next/navigation"
import Chat from "@/models/Chat"
import { MessageInput } from "./components/MessageInput"
import { getUser } from "@/actions/getUser"
import Message from "@/models/Message"
import User from "@/models/User"

export default async ({ params }: { params: { _id: string } }) => {
  const user = await getAuthUser()
  if(!user) redirect("/log-in")

  const { chat, participants } = await (async () => {
    const chatData = await Chat.findById(params._id)
    if(!chatData) return { chat: null, participants: null }
    if(chatData.users.indexOf(user._id) === -1) return { chat: null, participants: null } // not a chat member

    const friendID = chatData.users[Number(!chatData.users.indexOf(user._id))]
    const friend = await getUser({ _id: friendID })
    if(!friend) return { chat: null, participants: null }

    const chat = {
      _id: chatData._id.toString(),
      name: chatData.name || friend.fullname,
      pfp: chatData.pfp || friend.pfp
    }
    if(!chat) return { chat: null, participants: null }

    const participantsData = await User.find({ _id: { $in: chatData.users } }, ["_id", "username", "fullname", "pfp"])
    const participants = participantsData.map(participant => ({
      _id: participant._id.toString(),
      username: participant.username,
      fullname: participant.fullname,
      pfp: participant.pfp
    }))

    return { chat, participants }
  })()
  if(!chat) return <>chat not found</>

  const messages = await (async () => {
    const messagesData = await Message.find({ chatId: chat._id }).limit(5)
    return messagesData.map(message => ({
      _id: message._id.toString(),
      senderId: message.senderId,
      body: message.body,
      createdAt: message.createdAt
    }))
  })()

  Chat.watch().on("change", (data) => {
    console.log(123)
  })

  return <>
      {/* header */}
      <div className="border-b p-4">
        <div className="flex items-center gap-2">
          <div className="rounded-full">
            <UserAvatar src={chat.pfp || ""} className="w-7 h-7" />
          </div>
          <div className="line-clamp-1 text-xs font-bold">{ chat.name }</div>
        </div>
      </div>
      {/* body */}
      <div className="flex-1 flex flex-col gap-2 p-4">
        { messages.map((message, i) => (
          <div className={`group flex self-start items-center gap-2 ${user._id === message.senderId && "flex-row-reverse self-end"} ${i && message.senderId === messages[i-1].senderId && "-mt-1"}`} key={i}>
            { i && message.senderId === messages[i-1].senderId ?
              <div className="w-7 h-7" /> :
              <Link href={`/${participants.find(participant => participant._id === message.senderId)?.username}`} className="rounded-full hover:brightness-[.85] transition">
                <UserAvatar src={message.senderId === user._id ? user.pfp : chat.pfp || ""} className="w-7 h-7" />
              </Link>
            }
            <div className="justify-self-start text-xs bg-secondary rounded-md p-2">{ message.body }</div>
            <div className="cursor-default self-end text-[.5rem] opacity-0 group-hover:opacity-80 transition">{ new Date(message.createdAt.getTime()).toLocaleTimeString('en-UK', {hour: '2-digit', minute: '2-digit'}) }</div>
          </div>
        )) }
      </div>
      {/* input */}
      <MessageInput chat_id={params._id} user_id={user._id} />
  </>
}