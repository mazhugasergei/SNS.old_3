import { UserAvatar } from "../../(main)/components/UserAvatar"
import Link from "next/link"
import { getAuthId } from "@/actions/getAuthId"
import { redirect } from "next/navigation"
import { MessageInput } from "./components/MessageInput"
import { getUser } from "@/actions/getUser"
import User from "@/models/User"

export default async ({ params }: { params: { _id: string } }) => {
  const auth_id = await getAuthId()
  if(!auth_id) redirect("/log-in")
  const auth_pfp = (await User.findById(auth_id.toString(), "pfp"))?.pfp

  const chat = await User.findById(auth_id.toString(), "chats")
    .then(chatsData => chatsData?.chats.find(chat => chat._id?.toString() === params._id))
  if(!chat) return <>404 not found</>

  const participantUsername = (await User.findById(chat?.participants[0], "username"))?.username

  User.watch().on("change", data => console.log(111))

  return <>
    {/* header */}
    <div className="border-b p-4">
      <div className="flex items-center gap-2">
        <div className="rounded-full">
          <UserAvatar src={chat.image || ""} className="w-7 h-7" />
        </div>
        <div className="line-clamp-1 text-xs font-medium">{ chat.name }</div>
      </div>
    </div>
    {/* body */}
    <div className="flex-1 px-4">
      { chat.messages.map((message, i) => {
        const recent = i && message.sender === chat.messages[i-1].sender && message.createdAt.getTime() - chat.messages[i-1].createdAt.getTime() < 300000
        const showDate = !i || message.createdAt.getTime() - chat.messages[i-1].createdAt.getTime() >= 86400000
        return (
          <div className="grid" key={message._id?.toString()}>
            { showDate && <div className="self-center text-xs font-medium text-center opacity-75 mt-2 mx-auto bg-secondary rounded-sm px-2 py-1">{ new Date(message.createdAt.getTime()).toLocaleDateString("default", { month: "long", day: "2-digit" }) }</div> }
            <div className={`group flex items-center gap-2 ${!message.sender && "flex-row-reverse"} ${recent ? "mt-1" : "mt-2"}`}>
              { recent ?
                <div className="w-7 h-7" /> :
                <Link href={`/${participantUsername}`} className="rounded-full hover:brightness-[.85] transition">
                  <UserAvatar src={!message.sender ? auth_pfp : chat.image || ""} className="w-7 h-7" />
                </Link> }
              <div className="justify-self-start text-xs bg-secondary rounded-md p-2">{ message.body }</div>
              <div className="cursor-default self-end text-[.5rem] opacity-0 group-hover:opacity-80 transition">{ new Date(message.createdAt.getTime()).toLocaleTimeString('en-UK', {hour: '2-digit', minute: '2-digit'}) }</div>
            </div>
          </div>
        )
      }) }
    </div>
    {/* input */}
    <MessageInput chat_id={params._id.toString()} />
  </>
}