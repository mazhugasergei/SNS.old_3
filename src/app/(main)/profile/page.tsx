"use client"
import { RootState } from "@/store/store"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

export default () => {
  const router = useRouter()
  const [loggedIn, setLoggedIn] = useState(false)
  const auth = useSelector((state: RootState) => state.user.auth)
  const fullname = useSelector((state: RootState) => state.user.fullname)
  const bio = useSelector((state: RootState) => state.user.bio)
  const created = useSelector((state: RootState) => state.user.created)

  // redirect if logged out
  useEffect(()=>{
    if(auth === false) router.push("/")
    else if(auth) setLoggedIn(true)
  }, [auth])

  return loggedIn && (
    <>
      <div className="contianer border rounded-md p-10">
        <h1 className="text-3xl font-bold mb-2">{ fullname }</h1>
        { bio && <p className="max-w-[44rem] mb-2">{ bio }</p> }
        { created && <p className="opacity-[.75]">Joined on { new Date(created).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) }</p> }
      </div>
    </>
  )
}