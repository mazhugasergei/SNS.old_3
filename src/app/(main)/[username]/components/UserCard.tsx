import { User } from "@/types/User"
import Link from "next/link"
import Avatar from "../../components/UserAvatar"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Button, buttonVariants } from "@/components/ui/button"
import { getAuthUser } from "@/actions/getAuthUser"

export default async ({ user, children }: { user: User, children: React.ReactNode }) => {
  const auth_user = await getAuthUser()

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        { children }
      </HoverCardTrigger>
      <HoverCardContent className="relative w-80">
        { auth_user ?
          auth_user._id !== user._id && <Button className="absolute top-4 right-4">Follow</Button> :
          <Link href="/log-in" className={`${buttonVariants()} absolute top-4 right-4`}>Follow</Link>
        }
        <div className="space-y-2">
          <Link href={`/${user.username}`} className="inline-block hover:brightness-[.85] transition mb-1">
            <Avatar src={user.pfp || ""} />
          </Link>
          <Link href={`/${user.username}`}>
            <div className="text-md font-bold hover:underline">{ user.fullname }</div>
            <div className="text-sm opacity-70">@{ user.username }</div>
          </Link>
          <div className="text-sm">{ user.bio }</div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}