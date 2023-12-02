import { UserType } from "@/types/User"
import Link from "next/link"
import Avatar from "../../components/Avatar"
import { CalendarIcon } from "@radix-ui/react-icons"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"

export default ({ user, children }: { user: UserType, children: React.ReactNode }) => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        { children }
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex items-start gap-4">
          <Link href={`/${user.username}`} className="hover:brightness-[.9] transition">
            <Avatar src={user.pfp || ""} />
          </Link>
          <div className="space-y-2">
            <Link href={`/${user.username}`}>
              <div className="text-md font-bold hover:underline">{ user.fullname }</div>
              <div className="text-sm opacity-70">@{ user.username }</div>
            </Link>
            <div className="text-sm">{ user.bio }</div>
            {/* <div className="flex items-center">
              <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />{" "}
              <span className="text-xs text-muted-foreground">
                Joined { new Date(user.createdAt!).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) }
              </span>
            </div> */}
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}