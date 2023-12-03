import get_user from "@/actions/get_user"
import Avatar from "@/app/(main)/components/Avatar"
import { LuCalendarDays, LuMail } from "react-icons/lu"
import { UserType } from "@/types/User"
import get_posts from "@/actions/get_posts"
import { PostType } from "@/types/Post"
import Link from "next/link"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import UserCard from "./components/UserCard"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { LuHeart } from "react-icons/lu"

export const generateMetadata = async ({ params }: { params: { username: string } }) => {
  const user: UserType | null = await get_user(params.username)

  return {
    title: `${ user && `${user.fullname} (@${user.username}) - ` }Wave`
  }
}

export default async ({ params }: { params: { username: string } }) => {
  const user: UserType | null = await get_user(params.username)
  const posts: PostType[] | null = user && user._id ? await get_posts(user._id) : null

  return (
    user === null ? <>user not found</> :
    user && <>
      {/* profile details */}
      <div className="contianer border-b px-8 pb-5">
        <AspectRatio ratio={112400 / 37466} className="bg-border rounded-lg -mx-8">
          {/* <Image src={} /> */}
        </AspectRatio>
        <Avatar src={user.pfp || ""} className="w-[8.40625rem] h-[8.40625rem] mb-3 -mt-[4.203125rem]" />
        <p className="text-3xl font-bold">{ user.fullname }</p>
        <p className="opacity-70 text-sm">@{ user.username }</p>
        <p className="text-sm my-1">{ user.bio }</p>
        { !user.private_email && <a href={`mailto:${user.email}`} className="inline-flex items-center gap-1 text-sm hover:underline opacity-70"><LuMail />{ user.email }</a> }
        { user.createdAt && <p className="flex items-center gap-1 opacity-70 text-sm"><LuCalendarDays /> Joined { new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) }</p> }
      </div>

      {/* posts */}
      { posts === undefined ?
        <>loading...</> :
        <div className="-mb-[.0625rem]">
          { posts?.map((post, i) =>
            <div className="grid grid-cols-[auto_1fr] gap-[.6875rem] items-start border-b text-sm px-8 py-5" key={post._id}>
              {/* pfp */}
              <UserCard {...{user}}>
                <Link href={`/${user.username}`} className="rounded-full">
                  <Avatar src={user.pfp || ""} className="w-8 h-8 hover:brightness-[.92] transition" />
                </Link>
              </UserCard>
              {/* body */}
              <div>
                <UserCard {...{user}}>
                  <Link href={`/${user.username}`}>
                    <span className="font-bold hover:underline">{ user.fullname }</span>
                    <span className="opacity-70"> @{ user.username }</span>
                  </Link>
                </UserCard>
                <span className="opacity-70"> · </span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className="opacity-70 hover:underline">{ new Date(post.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) }</TooltipTrigger>
                    <TooltipContent>{
                      new Date(post.createdAt).toLocaleTimeString('en-US', {hour: 'numeric', minute: '2-digit', hour12: true})
                      + " · " +
                      new Date(post.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
                    }</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <p className="text-sm">{ post.body }</p>
                {/* post tools */}
                <div className="flex gap-4 mt-2">
                  <LuHeart />
                </div>
              </div>
            </div>
          ) }
        </div>
      }
    </>
  )
}