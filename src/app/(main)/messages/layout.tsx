import { getAuthUser } from "@/actions/getAuthUser"
import { getUsers } from "@/actions/getUsers"
import Link from "next/link"
import { redirect } from "next/navigation"
import { UserAvatar } from "../components/UserAvatar"
import { ReactNode } from "react"

export default async ({ children }: { children: ReactNode }) => {
  const user = await getAuthUser()
  if(!user) redirect("/log-in")

  // getting default users
  const users = await getUsers()

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

  return user && (
    <div className="min-h-[calc(100vh-2rem)] flex gap-6 lg:gap-12 pb-8">
      {/* users list */}
      <div className="flex flex-col">{
        users.map(user =>
          <Link href={`/messages/${user._id}`} className={itemClasses} key={user.username}>
            <UserAvatar src={user.pfp || ""} className="w-7 h-7" />
            { user.fullname }
          </Link>
        )
      }</div>

      <div className="flex-1 border rounded-lg">{ children }</div>
    </div>
  )
}