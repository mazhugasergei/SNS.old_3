"use client"
import { RootState } from "@/store/store"
import { useSelector } from "react-redux"
import { buttonVariants } from "@/components/ui/button"
import { useEffect, useState } from "react"
import get_user from "@/actions/get_user"
import Link from "next/link"
import Avatar from "@/app/(main)/components/Avatar"
import { LuCalendarDays, LuMail } from "react-icons/lu"
import { UserType } from "@/types/User"
import get_posts from "@/actions/get_posts"
import { PostType } from "@/types/Post"
import { Separator } from "@/components/ui/separator"

export default ({ params }: { params: { profile: string } }) => {
  const username = useSelector((state: RootState) => state.user.username)
  const [profile, setProfile] = useState<UserType | null | undefined>()
  const [posts, setPosts] = useState<PostType[] | null | undefined>()

  useEffect(()=>{
    (async ()=>{
      const user = await get_user(params.profile)
      setProfile(user)
      const posts = user && await get_posts(user._id)
      setPosts(posts)
    })()
  }, [])

  return profile === undefined ?
    <>loading...</> :
  profile === null ?
    <>user not found</> :
  profile &&
    <>
      {/* profile details */}
      <div className="contianer relative border rounded-lg p-10 shadow-sm">
        { username === params.profile && <Link href="/settings/profile" className={`${buttonVariants({ variant: "outline" })} absolute top-5 right-5`}>Edit profile</Link> }

        <Avatar src={profile.pfp as string} className="w-20 h-20 mb-3" />
        <p className="text-3xl font-bold">{ profile.fullname }</p>
        <p className="opacity-[.75] text-sm">@{ profile.username }</p>
        <p className="text-sm my-1">{ profile.bio }</p>
        { !profile.private_email && <p className="opacity-[.75] text-sm">
          <a href={`mailto:${profile.email}`} className="flex items-center gap-1"><LuMail />{ profile.email }</a>
        </p> }
        { profile.created && <p className="flex items-center gap-1 opacity-[.75] text-sm"><LuCalendarDays /> Joined on { new Date(profile.created).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) }</p> }
      </div>

      {/* posts */}
      { posts === undefined ?
        <>loading...</> :
        <div className="py-2">
          { posts?.map((post, i) => <>
            { Boolean(i) && <Separator /> }
            <div className="grid grid-cols-[auto_1fr] gap-[.6875rem] text-sm px-10 py-5" key={post._id}>
              <Avatar src={profile.pfp as string} className="w-8 h-8" />
              <div>
                <p>
                  <span className="font-bold">{ profile.fullname } </span>
                  <span className="opacity-[.75]">@{ params.profile } · { new Date(post.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) }</span>
                </p>
                <p className="text-sm">{ post.body }</p>
              </div>
            </div>
          </>) }
        </div>
      }
    </>
}