"use client"
import { HiMenuAlt4 } from "react-icons/hi"
import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store/store"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuGroup } from "@/components/ui/dropdown-menu"
import { setUser } from "@/store/slices/user.slice"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BsPersonFill } from "react-icons/bs"
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { HiOutlineDotsHorizontal } from "react-icons/hi"
import { LuHome } from "react-icons/lu"
import { LuMessageSquare } from "react-icons/lu"
import { LuSearch } from "react-icons/lu"
import { LuSettings } from "react-icons/lu"
import Logo from "./Logo"


export default () => {
  const dispatch = useDispatch()
  const auth = useSelector((state: RootState) => state.user.auth)
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
          { auth ?
            <DropdownMenu>
              <DropdownMenuTrigger className="w-8 h-8 rounded-full transition hover:shadow-[0_0_0_.2rem_#F0F0F0]">
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
        <Sheet>
          <SheetTrigger className="md:hidden">
            <HiMenuAlt4 className="h-5 w-5" />
          </SheetTrigger>
          <SheetContent side="left">
            <Logo />
            <div className="h-[calc(100%-5rem)] relative my-10 pl-6 pr-6 flex flex-col justify-between">
              {/* links */}
              <div className="flex flex-col gap-4">
                <SheetClose asChild className="block">
                  <Link href="/" className="flex items-center gap-3"><LuHome />Home</Link>
                </SheetClose>
                <SheetClose asChild className="block">
                  <Link href="/messages" className="flex items-center gap-3"><LuMessageSquare />Messages</Link>
                </SheetClose>
                <SheetClose asChild className="block">
                  <Link href="/search" className="flex items-center gap-3"><LuSearch />Search</Link>
                </SheetClose>
                <SheetClose asChild className="block">
                  <Link href="/settings" className="flex items-center gap-3"><LuSettings />Settings</Link>
                </SheetClose>
              </div>

              {/* auth */}
              <div className="flex flex-col gap-3 pt-6">
                { auth ?
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center gap-2 p-2 -m-2">
                      <Avatar className="w-8 h-8 bg-cover bg-center">
                        <AvatarImage src={pfp} />
                        <AvatarFallback>
                          <BsPersonFill className="opacity-[.5] w-[50%] h-[50%]" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="overflow-hidden flex-1 text-sm text-left font-medium whitespace-nowrap">{ fullname }</div>
                      <HiOutlineDotsHorizontal className="shrink-0" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>{ fullname }</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <SheetClose asChild className="block">
                          <Link href="/profile">
                            <DropdownMenuItem>Profile</DropdownMenuItem>
                          </Link>
                        </SheetClose>
                        <SheetClose asChild className="block">
                          <Link href="/settings">
                            <DropdownMenuItem>Settings</DropdownMenuItem>
                          </Link>
                        </SheetClose>
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleLogOut}>Log out</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                : <>
                  <Link href="/sign-up" className={buttonVariants()}>Sign up</Link>
                  <Link href="/log-in" className={buttonVariants({ variant: "outline" })}>Log in</Link>
                </> }
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}