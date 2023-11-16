"use client"
import { RootState } from "@/store/store"
import { useSelector } from "react-redux"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BsPersonFill } from "react-icons/bs"
import { buttonVariants } from "@/components/ui/button"
import { useEffect, useState } from "react"
import get_user from "@/actions/get_user"
import { UserState } from "@/store/slices/user.slice"
import Link from "next/link"

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

        <Avatar className="w-20 h-20 bg-cover bg-center border mb-2">
          <AvatarImage src={profile.pfp as string} />
          <AvatarFallback>
            <BsPersonFill className="opacity-[.5] w-[50%] h-[50%]" />
          </AvatarFallback>
        </Avatar>
        <h1 className="text-3xl font-bold mb-2">{ profile.fullname }</h1>
        { profile.bio && <p className="max-w-[44rem] mb-2">{ profile.bio }</p> }
        { profile.created && <p className="opacity-[.75] text-sm">Joined on { new Date(profile.created).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) }</p> }
      </div>
    </>
}