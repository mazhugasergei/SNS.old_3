import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { HiOutlineDotsHorizontal } from "react-icons/hi"
import { HiMenuAlt4 } from "react-icons/hi"
import Logo from "../../components/Logo"
import Link from "next/link"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuGroup } from "@/components/ui/dropdown-menu"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store/store"
import { buttonVariants } from "../../../components/ui/button"
import { setUser } from "@/store/slices/user.slice"
import Nav from "./Nav"
import Avatar from "./Avatar"

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
    <Sheet>
      <SheetTrigger className="md:hidden">
        <HiMenuAlt4 className="h-5 w-5" />
      </SheetTrigger>
      <SheetContent side="left">
        <Logo />
        <div className="h-[calc(100%-5rem)] relative my-10 pl-6 pr-6 flex flex-col justify-between">
          {/* links */}
          <div className="-ml-2">
            <SheetClose asChild>
              <Nav />
            </SheetClose>
          </div>

          {/* auth */}
          <div className="flex flex-col gap-3 pt-6">
            { auth ?
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-2 p-2 -m-2">
                  <Avatar src={pfp} className="w-8 h-8" />
                  <div className="overflow-hidden flex-1 text-sm text-left font-medium whitespace-nowrap">{ fullname }</div>
                  <HiOutlineDotsHorizontal className="shrink-0" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>{ fullname }</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <SheetClose asChild className="block">
                      <Link href={`/${username}`}>
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                      </Link>
                    </SheetClose>
                    <SheetClose asChild className="block">
                      <Link href={`/settings/${ auth ? "profile" : "appearance" }`}>
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
  )
}