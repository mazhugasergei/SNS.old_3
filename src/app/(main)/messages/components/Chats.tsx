import { getAuthId } from "@/actions/getAuthId"
import Link from "next/link"
import { redirect } from "next/navigation"
import { UserAvatar } from "../../(with_right_aside)/components/UserAvatar"
import { SearchProvider } from "@/app/(main)/(with_right_aside)/components/SearchProvider"
import { Button } from "@/components/ui/button"
import { User } from "@/models/User"

export const Chats = async ({ className }: { className?: string }) => {
	const authId = await getAuthId()
	if (!authId) redirect("/log-in")

	const chats = await (async () => {
		const chatsData = await User.findById(authId.toString(), "chats")
		if (!chatsData) throw ""
		return await Promise.all(
			chatsData.chats.map(async (chat) => {
				// chat name
				const chatName =
					chat.name || (await User.find({ _id: chat.participants }, "fullname")).map((item) => item.fullname).join(", ")
				// chat image
				const chatImage =
					chat.participants.length > 1
						? chat.image || ""
						: await User.findById(chat.participants[0], "pfp").then((res) => res?.pfp)
				// last message time
				const lastMessageTimeDiff = chat.lastMessageTime ? Date.now() - chat.lastMessageTime.getTime() : null
				const lastMessageTimeNumber = chat.lastMessageTime ? new Date(chat.lastMessageTime.getTime()) : null
				const lastMessageTime =
					lastMessageTimeDiff && lastMessageTimeNumber
						? lastMessageTimeDiff >= 172800000
							? // Jan 10 format
							  `${lastMessageTimeNumber.toDateString().split(" ")[1]} ${
									lastMessageTimeNumber.toDateString().split(" ")[2]
							  }`
							: lastMessageTimeDiff >= 86400000
							? "Yesterday"
							: // 15:03 format
							  lastMessageTimeNumber.getHours() +
							  ":" +
							  (lastMessageTimeNumber.getMinutes() < 10 ? "0" : "") +
							  lastMessageTimeNumber.getMinutes()
						: null
				return {
					_id: chat._id.toString(),
					name: chatName,
					image: chatImage,
					lastMessage: chat.lastMessage,
					lastMessageTime: lastMessageTime,
					unread: chat.unread
				}
			})
		)
	})()
	if (!chats) return <>no chats</>

	return (
		<div className={`${className} flex flex-col py-4`}>
			<SearchProvider message>
				<Button className="mb-2">New chat</Button>
			</SearchProvider>
			{chats.map((chat) => {
				return (
					<Link
						href={`/messages/${chat._id}`}
						className="cursor-pointer flex items-center gap-2 text-sm rounded-sm hover:bg-accent px-2 py-2 transition"
						key={chat._id}
					>
						<UserAvatar src={chat.image} className="w-8 h-8" />
						<div className="flex-1">
							<div className="flex items-center">
								<div className="line-clamp-1">{chat.name}</div>
								{chat.lastMessageTime && (
									<div className="text-xs opacity-80 whitespace-nowrap">&nbsp;· {chat.lastMessageTime}</div>
								)}
							</div>
							<div className="line-clamp-1 text-xs opacity-80">
								( {chat.unread} ) {chat.lastMessage}
							</div>
						</div>
					</Link>
				)
			})}
		</div>
	)
}
