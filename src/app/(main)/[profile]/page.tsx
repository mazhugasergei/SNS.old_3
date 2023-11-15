"use client"
import { RootState } from "@/store/store"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BsPersonFill } from "react-icons/bs"
import { Button } from "@/components/ui/button"
import * as z from "zod"

export default () => {
  const router = useRouter()
  const [loggedIn, setLoggedIn] = useState(false)
  const auth = useSelector((state: RootState) => state.user.auth)
  const fullname = useSelector((state: RootState) => state.user.fullname)
  const bio = useSelector((state: RootState) => state.user.bio)
  const pfp = useSelector((state: RootState) => state.user.pfp) as string
  const created = useSelector((state: RootState) => state.user.created)

  // redirect if logged out
  useEffect(()=>{
    if(auth === false) router.push("/")
    else if(auth) setLoggedIn(true)
  }, [auth])

  const formSchema = z.object({
    email: z.string().max(50),
    username: z.string().min(2, { message: "Username must be at least 2 characters" }).max(50, { message: "Username must contain at most 50 characters" }),
    fullname: z.string().min(2, { message: "Full Name must be at least 2 characters" }).max(50, { message: "Full Name must contain at most 50 characters" })
  })

  return loggedIn && (
    <>
      <div className="contianer relative border rounded-md p-10">
        <Button variant="outline" className="absolute top-5 right-5">Edit profile</Button>

        <Avatar className="w-20 h-20 bg-cover bg-center border mb-2">
          <AvatarImage src={pfp} />
          <AvatarFallback>
            <BsPersonFill className="opacity-[.5] w-[50%] h-[50%]" />
          </AvatarFallback>
        </Avatar>
        <h1 className="text-3xl font-bold mb-2">{ fullname }</h1>
        { bio && <p className="max-w-[44rem] mb-2">{ bio }</p> }
        { created && <p className="opacity-[.75] text-sm">Joined on { new Date(created).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) }</p> }
      </div>
    </>
  )
}