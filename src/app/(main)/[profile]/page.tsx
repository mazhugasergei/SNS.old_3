"use client"
import { RootState } from "@/store/store"
import { useSelector } from "react-redux"
import { BsPersonFill } from "react-icons/bs"
import { buttonVariants } from "@/components/ui/button"
import { useEffect, useState } from "react"
import get_user from "@/actions/get_user"
import { UserState } from "@/store/slices/user.slice"
import Link from "next/link"
import Avatar from "@/components/Avatar"

export default ({ params }: { params: { profile: string } }) => {
  const [profile, setProfile] = useState<UserState | null | undefined>()
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

        <Avatar src={profile.pfp as string} className="w-20 h-20" />
        <p className="text-3xl font-bold">{ profile.fullname }</p>
        <p className="opacity-[.75] text-sm">{ profile.username }</p>
        { profile.bio && <p className="max-w-[44rem] my-2">{ profile.bio }</p> }
        { !profile.settings?.private_email && <p className="opacity-[.75] text-sm"><a href={`mailto:${profile.email}`}>{ profile.email }</a></p> }
        { profile.created && <p className="opacity-[.75] text-sm">Joined on { new Date(profile.created).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) }</p> }
      </div>
    </>
}