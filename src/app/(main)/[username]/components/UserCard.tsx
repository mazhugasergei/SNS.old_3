import { UserType } from "@/types/User"
import Link from "next/link"
import Avatar from "../../components/Avatar"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"

export default ({ user, children }: { user: UserType, children: React.ReactNode }) => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        { children }
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="space-y-2">
          <Link href={`/${user.username}`} className="inline-block hover:brightness-[.92] transition">
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