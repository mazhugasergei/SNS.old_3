import Link from "next/link"
import { LuHome, LuSearch } from "react-icons/lu"
import { LuMessageSquare } from "react-icons/lu"
import { LuSettings } from "react-icons/lu"
import { buttonVariants } from "@/components/ui/button"
import { LuUser2 } from "react-icons/lu"
import { getAuthUser } from "@/actions/getAuthUser"
import { Search } from "./Search"

export const Nav = async () => {
  const user = await getAuthUser()
  
  const buttonStyle = {
    className: `${buttonVariants({ variant: "ghost" })} gap-2 md:justify-start`
  }
  const iconStyle = {
    style: {
      width: "1rem",
      height: "1rem"
    }
  }

  const titleStyle = {
    className: "max-md:hidden"
  }

  return (
    <nav className="flex flex-col gap-1 mb-2">
      <Link href="/" {...buttonStyle}>
        <LuHome {...iconStyle} />
        <span {...titleStyle}>Home</span>
      </Link>
      
      <Link href={user ? `/messages` : "/log-in"} {...buttonStyle}>
        <LuMessageSquare {...iconStyle} />
        <span {...titleStyle}>Messages</span>
      </Link>

      <Search {...{buttonStyle}} {...{iconStyle}}>
        {/* <button {...buttonStyle} onClick={() => setSearchOpen(!searchOpen)}> */}
        <button {...buttonStyle}>
          <LuSearch {...iconStyle} />
          <span {...titleStyle}>Search</span>
        </button>
      </Search>

      <Link href={user ? `/${user.username}` : "/log-in"} {...buttonStyle}>
        <LuUser2 {...iconStyle} />
        <span {...titleStyle}>Profile</span>
      </Link>

      <Link href={`/settings/${user ? "profile" : "appearance"}`} {...buttonStyle}>
        <LuSettings {...iconStyle} />
        <span {...titleStyle}>Settings</span>
      </Link>
    </nav>
  )
}