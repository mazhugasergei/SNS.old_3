"use client"
import Logo from "@/app/components/Logo"
import Nav from "./Nav"
import { useSelector } from "react-redux"
import { RootState } from "@/store/store"
import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"

export default () => {
  const auth = useSelector((state: RootState) => state.user.auth)

  return (
    <aside className="max-md:hidden sticky top-0 md:w-1/5 lg:w-1/6 z-49 flex flex-col pt-8">
      <Logo className="mb-4" />
      <Nav />
      { auth && <Link href="/post" className={`block ${buttonVariants()}`}>Create Post</Link> }
      { auth === false && <>
        <Link href="/log-in" className={`${buttonVariants({ variant: "ghost" })} w-full bg-background mb-1.5`}>Log in</Link>
        <Link href="/sign-up" className={`${buttonVariants()} w-full`}>Sign up</Link>
      </> }
    </aside>
  )
}