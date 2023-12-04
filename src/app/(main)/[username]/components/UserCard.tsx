import { User } from "@/types/User"
import Link from "next/link"
import Avatar from "../../components/Avatar"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Button } from "@/components/ui/button"

export default ({ user, children }: { user: User, children: React.ReactNode }) => {
  // const _id = useSelector((state: RootState) => state.user._id)

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        { children }
      </HoverCardTrigger>
      <HoverCardContent className="relative w-80">
        {/* { _id !== user._id && <Button className="absolute top-0 right-0">Follow</Button> } */}
        <Button className="absolute top-4 right-4">Follow</Button>
        <div className="space-y-2">
          <Link href={`/${user.username}`} className="inline-block hover:brightness-[.92] transition mb-1">
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