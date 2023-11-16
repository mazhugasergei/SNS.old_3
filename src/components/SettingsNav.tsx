"use client"
import { RootState } from "@/store/store"
import Link from "next/link"
import { LuBrush, LuUser } from "react-icons/lu"
import { useSelector } from "react-redux"

export default () => {
  const auth = useSelector((state: RootState) => state.user.auth)

  return (
    <>
      { auth && <Link href="/settings/profile" className="flex items-center gap-3" ><LuUser />Profile</Link> }
      <Link href="/settings/appearance" className="flex items-center gap-3" ><LuBrush />Appearance</Link>
    </>
  )
}