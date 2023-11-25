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
import { buttonVariants } from "@/components/ui/button"

export default () => {
  const [searchOpen, setSearchOpen] = useState(false)
  const auth = useSelector((state: RootState) => state.user.auth)
  const buttonStyle = {
    className: `${buttonVariants({ variant: "ghost" })} gap-2`,
    style: {
      justifyContent: "flex-start"
    }
  }
  const iconStyle = {
    style: {
      width: "1rem",
      height: "1rem"
    }
  }

  return (
    <nav className="sticky top-[5.5rem] flex flex-col gap-2">
      <Link href="/" {...buttonStyle}>
        <LuHome {...iconStyle} />
        Home
      </Link>
      <Link href="/messages" {...buttonStyle}>
        <LuMessageSquare {...iconStyle} />
        Messages
      </Link>
      <button {...buttonStyle} onClick={() => setSearchOpen(!searchOpen)}>
        <LuSearch {...iconStyle} />
      Search</button>
      <Search {...{ searchOpen, setSearchOpen }} />
      <Link href={`/settings/${auth ? "profile" : "appearance"}`} {...buttonStyle}>
        <LuSettings {...iconStyle} />
        Settings
      </Link>
    </nav>
  )
}