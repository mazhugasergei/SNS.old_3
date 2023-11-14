"use client"
import { HiMenuAlt4 } from "react-icons/hi"
import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { useDispatch, useSelector } from "react-redux"
import { toggleMenuOpened } from "@/store/slices/ui.slice"
import { RootState } from "@/store/store"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuGroup } from "@/components/ui/dropdown-menu"
import { setUser } from "@/store/slices/user.slice"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BsPersonFill } from "react-icons/bs"


export default () => {
  const dispatch = useDispatch()
  const auth = useSelector((state: RootState) => state.user.auth)
  const fullname = useSelector((state: RootState) => state.user.fullname)
  const pfp = useSelector((state: RootState) => state.user.pfp) as string

  const handleMenuOpenedToogle = () => dispatch(toggleMenuOpened())

  const handleLogOut = () => {
    localStorage.removeItem("token")
    dispatch(setUser({ auth: false }))
  }

  return (
    <header
      className="
        fixed
        top-0
        z-50
        w-full
        border-b
        bg-background/95
        backdrop-blur
        supports-[backdrop-filter]:bg-background/60
      "
    >
      {/* container */}
      <div
        className="
          container
          h-14
          flex
          items-center
          px-4
          sm:px-8
        "
      >
        {/* desktop */}
        <div className="hidden md:flex w-full justify-between">
          {/* logo */}
          <Link className="mr-6 flex items-center space-x-2 mr-auto" href="/">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="h-6 w-6">
              <rect width="256" height="256" fill="none" />
              <line x1="208" y1="128" x2="128" y2="208" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
              <line x1="192" y1="40" x2="40" y2="192" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
            </svg>
            <span className="hidden font-bold sm:inline-block">Wave</span>
          </Link>
          {/* auth */}
          { auth ?
            <DropdownMenu>
              <DropdownMenuTrigger className="w-8 h-8 rounded-[50%] transition hover:shadow-[0_0_0_.2rem_#F0F0F0]">
                <Avatar className="w-full h-full bg-cover bg-center">
                  <AvatarImage src={pfp} />
                  <AvatarFallback>
                    <BsPersonFill className="opacity-[.5] w-[50%] h-[50%]" />
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="mr-8">
                <DropdownMenuLabel>{ fullname }</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <Link href="/profile"><DropdownMenuItem>Profile</DropdownMenuItem></Link>
                  <Link href="/settings"><DropdownMenuItem>Settings</DropdownMenuItem></Link>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogOut}>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          : <>
            <Link href="/log-in" className={buttonVariants({ variant: "outline" }) + " bg-background mr-4"}>Log in</Link>
            <Link href="/sign-up" className={buttonVariants()}>Sign up</Link>
          </>}
        </div>
        {/* mobile */}
        <div className="md:hidden">
          {/* menu btn */}
          <button onClick={handleMenuOpenedToogle} className="flex">
            <HiMenuAlt4 className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  )
}