"use client"
import is_auth from "@/actions/is_auth"
import { setUser } from "@/store/slices/user.slice"
import { useEffect } from "react"
import { useDispatch } from "react-redux"

export default () => {
  const dispatch = useDispatch()
  // check auth status
  useEffect(()=>{
    const token = localStorage.getItem("token")
    if(token) (async ()=>{
      const user = await is_auth(token as string)
      if(user) dispatch(setUser({ auth: true, ...user }))
      else dispatch(setUser({ auth: false }))
    })()
    else dispatch(setUser({ auth: false }))
  }, [])

  return null
}