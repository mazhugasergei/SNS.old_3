"use client"
import { RootState } from "@/store/store"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

export default () => {
  const router = useRouter()
  const auth = useSelector((state: RootState) => state.user.auth)
  const [loggedIn,  setLoggedIn] = useState(true)

  // redirect if not logged in
  useEffect(()=>{
    if(auth === false) router.push("/")
    else if(auth) setLoggedIn(true)
  }, [auth])

  return loggedIn && (
    <>settings/profile</>
  )
}