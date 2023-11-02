"use client"
import { useState } from "react"
import { HiMenuAlt4 } from "react-icons/hi"
import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { LuHome } from "react-icons/lu"
import { LuMessageSquare } from "react-icons/lu"
import { LuSearch } from "react-icons/lu"
import { LuSettings } from "react-icons/lu"

export default () => {
  const [menuOpened, setMenuOpened] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container pl-4 pr-4 sm:pl-8 sm:pr-8 flex h-14 items-center">
          {/* desktop */}
          <div className="hidden md:block">
            <Link className="mr-6 flex items-center space-x-2" href="/">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="h-6 w-6">
                <rect width="256" height="256" fill="none" />
                <line x1="208" y1="128" x2="128" y2="208" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
                <line x1="192" y1="40" x2="40" y2="192" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
              </svg>
              <span className="hidden font-bold sm:inline-block">Hello</span>
            </Link>
          </div>
          {/* mobile */}
          <div className="md:hidden">
            {/* menu btn */}
            <button onClick={() => setMenuOpened(true)} className="flex">
              <HiMenuAlt4 className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <menu data-state={menuOpened ? "open" : "closed"} style={{ pointerEvents: menuOpened ? "unset" : "none", visibility: menuOpened ? "unset" : "hidden", transition: "visibility", transitionDelay: menuOpened ? "unset" : ".2s" }} className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fill-mode-forwards">
        {/* bg */}
        <div onClick={() => setMenuOpened(false)} className="fixed inset-0 z-50" />
        {/* menu */}
        <div data-state={menuOpened ? "open" : "closed"} className="fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500 inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm fill-mode-forwards">
          {/* logo */}
          <Link className="inline-flex items-center" href="/">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="mr-2 h-4 w-4">
              <rect width="256" height="256" fill="none" />
              <line x1="208" y1="128" x2="128" y2="208" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
              <line x1="192" y1="40" x2="40" y2="192" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
            </svg>
            <span className="font-bold">Hello</span>
          </Link>
          {/* close menu btn */}
          <button onClick={() => setMenuOpened(false)} data-state={menuOpened ? "open" : "closed"} className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 data-[state=open]:bg-secondary">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
              <path d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" />
            </svg>
          </button>
          {/* list */}
          <div dir="ltr" className="relative overflow-hidden h-[calc(100vh-8rem)] my-10 pl-6 pr-6" style={{ position: "relative" }}>
            <div className="h-full rounded-[inherit]">
              <div className="flex flex-col justify-between h-full">
                <div className="flex flex-col space-y-4">
                  <Link href="/" className="flex items-center gap-3"><LuHome />Home</Link>
                  <Link href="/messages" className="flex items-center gap-3"><LuMessageSquare />Messages</Link>
                  <Link href="/search" className="flex items-center gap-3"><LuSearch />Search</Link>
                  <Link href="/settings" className="flex items-center gap-3"><LuSettings />Settings</Link>
                </div>
                <div className="flex flex-col space-y-2">
                  <div className="flex flex-col space-y-3 pt-6">
                    <Link href="/sign-up" className={buttonVariants()}>Sign up</Link>
                    <Link href="/sign-up" className={buttonVariants({ variant: "outline" })}>Log in</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </menu>
    </>
  )
}