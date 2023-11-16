"use client"
import { RootState } from "@/store/store"
import Link from "next/link"
import { LuHome } from "react-icons/lu"
import { LuMessageSquare } from "react-icons/lu"
import { LuSearch } from "react-icons/lu"
import { LuSettings } from "react-icons/lu"
import { useSelector } from "react-redux"
import { useState } from "react"
import Search from "./Search"

export default () => {
  const [searchOpen, setSearchOpen] = useState(false)
  const auth = useSelector((state: RootState) => state.user.auth)

  return (
    <>
      <Link href="/" className="flex items-center gap-3"><LuHome />Home</Link>
      <Link href="/messages" className="flex items-center gap-3"><LuMessageSquare />Messages</Link>
      <button className="flex items-center gap-3" onClick={() => setSearchOpen(!searchOpen)}><LuSearch />Search</button>
      <Search {...{ searchOpen, setSearchOpen }} />
      <Link href={`/settings/${auth ? "profile" : "appearance"}`} className="flex items-center gap-3"><LuSettings />Settings</Link>
    </>
  )
}