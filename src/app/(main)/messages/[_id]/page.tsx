import { UserAvatar } from "../../components/UserAvatar"
import Link from "next/link"
import { getAuthUser } from "@/actions/getAuthUser"
import { redirect } from "next/navigation"
import { getChat } from "@/actions/getChat"
import Chat from "@/models/Chat"
import { FormClientComponent } from "./components/FormClientComponent"

export default async ({ params }: { params: { _id: string } }) => {
  const user = await getAuthUser()
  if(!user) redirect("/log-in")

  const chat = await getChat(params._id, user._id)
  if(!chat) return <>chat not found</>

  Chat.watch().on("change", (data) => {
    console.log(data)
  })

  return (
    <div className="overflow-hidden flex flex-col border rounded-lg">
      {/* header */}
      <div className="border-b p-4">
        <Link href={chat.username} className="flex items-center gap-2">
          <div className="rounded-full hover:brightness-[.85] transition">
            <UserAvatar src={chat.pfp || ""} className="w-7 h-7" />
          </div>
          <div className="line-clamp-1 text-xs font-bold">{ chat.fullname }</div>
        </Link>
      </div>
      {/* body */}
      <div className="flex-1 flex flex-col gap-2 p-4">
        { chat.messages.map((item, i) => (
          <div className={`group flex self-start items-center gap-2 ${user._id === item.authorID && "flex-row-reverse self-end"} ${i && item.authorID === chat.messages[i-1].authorID && "-mt-1"}`} key={i}>
            { i && item.authorID === chat.messages[i-1].authorID ?
              <div className="w-7 h-7" /> :
              <Link href={`/${chat.username}`} className="rounded-full hover:brightness-[.85] transition">
                <UserAvatar src={item.authorID === user._id ? user.pfp : chat.pfp || ""} className="w-7 h-7" />
              </Link>
            }
            <div className="justify-self-start text-xs bg-secondary rounded-md p-2">
              { item.message }
            </div>
            <div className="cursor-default self-end text-[.5rem] opacity-0 group-hover:opacity-80 transition">{ new Date(item.createdAt.getTime()).toLocaleTimeString('en-UK', {hour: '2-digit', minute: '2-digit'}) }</div>
          </div>
        )) }
      </div>
      {/* input */}
      <FormClientComponent chat_id={params._id} user_id={user._id} />
    </div>
  )
}