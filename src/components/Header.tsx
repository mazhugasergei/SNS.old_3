"use client"
import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store/store"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuGroup } from "@/components/ui/dropdown-menu"
import { setUser } from "@/store/slices/user.slice"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BsPersonFill } from "react-icons/bs"
import Logo from "./Logo"
import MobileMenu from "./MobileMenu"
import AvatarSkeleton from "./skeletons/AvatarSkeleton"


export default () => {
  const dispatch = useDispatch()
  const auth = useSelector((state: RootState) => state.user.auth)
  const username = useSelector((state: RootState) => state.user.username)
  const fullname = useSelector((state: RootState) => state.user.fullname)
  const pfp = useSelector((state: RootState) => state.user.pfp) as string

  const handleLogOut = () => {
    localStorage.removeItem("token")
    dispatch(setUser({ auth: false }))
  }

  return (
    <header className="fixed top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* container */}
      <div className="container h-14 flex items-center px-4 sm:px-8">
        {/* desktop */}
        <div className="hidden md:flex items-center w-full justify-between">
          {/* logo */}
          <div className="mr-auto">
            <Logo />
          </div>
          {/* auth */}
          { auth === null && <AvatarSkeleton /> }
          { auth === true && 
            <DropdownMenu>
              <DropdownMenuTrigger className="w-8 h-8 rounded-full transition hover:shadow-[0_0_0_.2rem_#F0F0F0]">
                <Avatar className="w-full h-full bg-cover bg-center border">
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
                  <Link href={`/${username}`}><DropdownMenuItem>Profile</DropdownMenuItem></Link>
                  <Link href="/settings"><DropdownMenuItem>Settings</DropdownMenuItem></Link>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogOut}>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          }
          { auth === false &&
            <>
              <Link href="/log-in" className={`${buttonVariants({ variant: "outline" })} bg-background mr-4`}>Log in</Link>
              <Link href="/sign-up" className={buttonVariants()}>Sign up</Link>
            </>
          }
        </div>
        
        {/* mobile */}
        <MobileMenu />
      </div>
    </header>
  )
}