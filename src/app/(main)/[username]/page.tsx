import { getUser } from "@/actions/getUser"
import { UserAvatar } from "@/app/(main)/components/UserAvatar"
import { LuCalendarDays, LuMail } from "react-icons/lu"
import { getPosts } from "@/actions/getPosts"
import Link from "next/link"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import UserCard from "./components/UserCard"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { LuHeart } from "react-icons/lu"
import { LuMessageCircle } from "react-icons/lu"
import { getAuthUser } from "@/actions/getAuthUser"
import { Banner } from "../components/Banner"

export const generateMetadata = async ({ params }: { params: { username: string } }) => {
  const user = await getUser(params.username)

  return {
    title: `${ user && `${user.fullname} (@${user.username}) - ` }Wave`
  }
}

export default async ({ params }: { params: { username: string } }) => {
  const auth_user = await getAuthUser()
  const user = await getUser(params.username)
  const posts = user?._id ? await getPosts(user._id) : null

  return user ? <>
    {/* profile details */}
    <div className="contianer border-b px-4 pb-3 px-4 pb-3 sm:px-8 sm:pb-6">
      <Banner src={user.banner} className="-mx-4 sm:-mx-8" />
      <UserAvatar src={user.pfp} className="w-[20vw] h-[20vw] sm:w-[8.40625rem] sm:h-[8.40625rem] border-4 border-background mb-3 -mt-[calc(20vw/2)] md:-mt-[4.203125rem]" />
      <p className="text-2xl sm:text-3xl font-bold">{ user.fullname }</p>
      <p className="opacity-70 text-sm">@{ user.username }</p>
      <p className="text-sm my-1">{ user.bio }</p>
      { !user.private_email && 
        <a href={`mailto:${user.email}`} className="inline-flex items-center gap-1 text-sm hover:underline opacity-70">
          <LuMail />
          <span className="break-all">{ user.email }</span>
        </a>
      }
      { user.createdAt && <p className="flex items-center gap-1 opacity-70 text-sm"><LuCalendarDays /> Joined { new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) }</p> }
    </div>

    {/* posts */}
    { posts?.length ?
      <div className="-mb-[.0625rem]">
        { posts.map(post =>
          <div className="grid grid-cols-[auto_1fr] gap-[.6875rem] items-start border-b text-sm px-8 py-5" key={post._id}>
            {/* pfp */}
            <UserCard {...{user}}>
              <Link href={`/${user.username}`} className="rounded-full">
                <UserAvatar src={user.pfp || ""} className="w-8 h-8 hover:brightness-[.92] transition" />
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
              <div className="flex gap-8 mt-2">
                <div className="group cursor-pointer flex items-center gap-2">
                  <div className="group-hover:bg-[#F918801A] rounded-full transition p-2 -m-2">
                    <LuHeart className="group-hover:stroke-[#F92083] transition" style={{ fill: auth_user && post.likes.includes(auth_user._id) ? "#F92083" : "", stroke: auth_user && post.likes.includes(auth_user._id) ? "#F92083" : "" }} />
                  </div>
                  <span className="text-xs group-hover:text-[#F92083] transition" style={{ color: auth_user && post.likes.includes(auth_user._id) ? "#F92083" : "" }}>{ post.likes.length }</span>
                </div>
                <div className="group cursor-pointer flex items-center gap-2">
                  <div className="group-hover:bg-[#1D9BF01A] rounded-full transition p-2 -m-2">
                    <LuMessageCircle className="group-hover:stroke-[#1D9BF0] transition" />
                  </div>
                  <span className="text-xs group-hover:text-[#1D9BF0] transition">{ post.comments.length }</span>
                </div>
              </div>
            </div>
          </div>
        ) }
      </div> :
      <>no moments yet</>
    }
  </> : <>user not found</>
}