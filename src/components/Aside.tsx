"use client"
import Link from "next/link"
import { LuHome } from "react-icons/lu"
import { LuMessageSquare } from "react-icons/lu"
import { LuSearch } from "react-icons/lu"
import { LuSettings } from "react-icons/lu"

export default () => {
  return (
    <aside className="max-md:hidden sticky top-14 z-49 w-full flex flex-col gap-4 pl-1 py-8">
      <Link href="/" className="flex items-center gap-3" ><LuHome />Home</Link>
      <Link href="/messages" className="flex items-center gap-3" ><LuMessageSquare />Messages</Link>
      <Link href="/search" className="flex items-center gap-3" ><LuSearch />Search</Link>
      <Link href="/settings" className="flex items-center gap-3" ><LuSettings />Settings</Link>
    </aside>
  )
}