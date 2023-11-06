"use client"
import Link from "next/link"
import { LuHome } from "react-icons/lu"
import { LuMessageSquare } from "react-icons/lu"
import { LuSearch } from "react-icons/lu"
import { LuSettings } from "react-icons/lu"
import { buttonVariants } from "@/components/ui/button"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store/store"
import { toggleMenuOpened } from "@/store/slices/ui.slice"

export default () => {
  const dispatch = useDispatch()
  const menu_opened = useSelector((state: RootState) => state.ui.menu_opened)

  const handleMenuOpenedToogle = () => dispatch(toggleMenuOpened())

  return (
    <menu
      data-state={menu_opened ? "open" : "closed"}
      className="
        max-md:data-[state=closed]:pointer-events-none
        max-md:data-[state=open]:animate-in
        max-md:data-[state=closed]:animate-out
        max-md:data-[state=closed]:fade-out-0
        max-md:data-[state=open]:fade-in-0
        max-md:fixed
        max-md:inset-0
        max-md:z-50
        max-md:bg-background/80
        max-md:backdrop-blur-sm
        max-md:fill-mode-forwards
        max-md:overflow-hidden
        max-md:pl-8
        max-md:pr-6
        max-md:py-8

        md:sticky
        md:top-14
        md:z-49
        md:w-full
        md:shrink-0
        md:pl-1
        md:py-8
      "
    >

      {/* bg */}
      <div
        data-state={menu_opened ? "open" : "closed"}
        onClick={handleMenuOpenedToogle}
        className="menu-bg md:hidden fixed inset-0 z-50 max-md:data-[state=closed]:pointer-events-none"
      />

      {/* menu */}
      <div
        data-state={menu_opened ? "open" : "closed"}
        className="
          menu
          max-md:fixed
          max-md:z-50
          max-md:flex
          max-md:flex-col
          max-md:bg-background
          max-md:transition
          max-md:ease-in-out
          max-md:data-[state=open]:animate-in
          max-md:data-[state=closed]:animate-out
          max-md:data-[state=closed]:duration-300
          max-md:data-[state=open]:duration-500
          max-md:inset-y-0
          max-md:left-0
          max-md:h-full
          max-md:w-3/4
          max-md:border-r
          max-md:data-[state=closed]:slide-out-to-left
          max-md:data-[state=open]:slide-in-from-left
          max-md:sm:max-w-s
          max-md:fill-mode-forwards
          max-md:shadow-lg
          max-md:px-6
          max-md:pt-6
        "
      >

        {/* logo */}
        <Link className="logo inline-flex md:hidden items-center" href="/">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="mr-2 h-4 w-4">
            <rect width="256" height="256" fill="none" />
            <line x1="208" y1="128" x2="128" y2="208" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
            <line x1="192" y1="40" x2="40" y2="192" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
          </svg>
          <span className="font-bold">hello</span>
        </Link>

        {/* close menu btn */}
        <button onClick={handleMenuOpenedToogle} data-state={menu_opened ? "open" : "closed"} className="md:hidden absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 data-[state=open]:bg-secondary">
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
            <path d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" />
          </svg>
        </button>

        {/* menu list */}
        <div
          dir="ltr"
          className="
            menu-list
            max-md:h-full
            max-md:relative
            max-md:flex-1
            max-md:overflow-hidden
            max-md:my-10
            max-md:pl-6
            max-md:pr-6
            flex flex-col
            justify-between
          "
        >
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-3"><LuHome />Home</Link>
            <Link href="/messages" className="flex items-center gap-3"><LuMessageSquare />Messages</Link>
            <Link href="/search" className="flex items-center gap-3"><LuSearch />Search</Link>
            <Link href="/settings" className="flex items-center gap-3"><LuSettings />Settings</Link>
          </div>
          <div className="md:hidden flex flex-col gap-3 pt-6">
            <Link href="/sign-up" className={buttonVariants()}>Sign up</Link>
            <Link href="/sign-up" className={buttonVariants({ variant: "outline" })}>Log in</Link>
          </div>
        </div>
      </div>
    </menu>
  )
}