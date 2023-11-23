"use client"
import { RootState } from "@/store/store"
import { useSelector } from "react-redux"
import { BsPersonFill } from "react-icons/bs"
import { buttonVariants } from "@/components/ui/button"
import { useEffect, useState } from "react"
import get_user from "@/actions/get_user"
import Link from "next/link"
import Avatar from "@/components/Avatar"
import { LuCalendarDays, LuMail } from "react-icons/lu"
import { UserType } from "@/types/User"

export default ({ params }: { params: { profile: string } }) => {
  const [profile, setProfile] = useState<UserType | null | undefined>()
  const username = useSelector((state: RootState) => state.user.username)

  useEffect(()=>{
    (async ()=>{
      const user = await get_user(params.profile)
      setProfile(user ? user : null)
    })()
  }, [])

  return profile === undefined ?
    <>loading...</>
  : profile == null ?
    <>user not found</>
  : profile &&
    <>
      <div className="contianer relative border rounded-lg p-10 shadow-sm">
        { username === params.profile && <Link href="/settings/profile" className={`${buttonVariants({ variant: "outline" })} absolute top-5 right-5`}>Edit profile</Link> }

        <Avatar src={profile.pfp as string} className="w-20 h-20 mb-3" />
        <p className="text-3xl font-bold">{ profile.fullname }</p>
        <p className="opacity-[.75] text-sm">{ profile.username }</p>
        <p className="max-w-[44rem] my-2">{ profile.bio }</p>
        { !profile.private_email && <p className="opacity-[.75] text-sm">
          <a href={`mailto:${profile.email}`} className="flex items-center gap-1"><LuMail />{ profile.email }</a>
        </p> }
        { profile.created && <p className="flex items-center gap-1 opacity-[.75] text-sm"><LuCalendarDays /> Joined on { new Date(profile.created).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) }</p> }
      </div>
    </>
}