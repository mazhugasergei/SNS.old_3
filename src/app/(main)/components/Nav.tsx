import Link from "next/link"
import { LuHome } from "react-icons/lu"
import { LuMessageSquare } from "react-icons/lu"
import { LuSettings } from "react-icons/lu"
import { buttonVariants } from "@/components/ui/button"
import { LuUser2 } from "react-icons/lu"
import { getAuthUser } from "@/actions/getAuthUser"
import SearchButton from "./SearchButton"

export default async () => {
  const user = await getAuthUser()
  
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
    <nav className="flex flex-col gap-1 mb-2">
      <Link href="/" {...buttonStyle}>
        <LuHome {...iconStyle} />
        Home
      </Link>
      <Link href="/messages" {...buttonStyle}>
        <LuMessageSquare {...iconStyle} />
        Messages
      </Link>
      <SearchButton {...{buttonStyle}} {...{iconStyle}} />
      <Link href={user ? `/${user.username}` : "/log-in"} {...buttonStyle}>
        <LuUser2 {...iconStyle} />
        Profile
      </Link>
      <Link href={`/settings/${user ? "profile" : "appearance"}`} {...buttonStyle}>
        <LuSettings {...iconStyle} />
        Settings
      </Link>
    </nav>
  )
}