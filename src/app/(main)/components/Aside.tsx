import Logo from "@/app/components/Logo"
import { Nav } from "./Nav"
import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { getAuthUser } from "@/actions/getAuthUser"

export const Aside = async () => {
  const user = await getAuthUser()

  return (
    <aside className="max-md:hidden sticky top-0 md:w-1/5 lg:w-1/6 z-49 flex flex-col pt-8">
      <Logo className="mb-4" />
      <Nav />
      { user ? <Link href="/post" className={`block ${buttonVariants()}`}>Create Post</Link> : <>
        <Link href="/log-in" className={`${buttonVariants({ variant: "ghost" })} w-full bg-background mb-1.5`}>Log in</Link>
        <Link href="/sign-up" className={`${buttonVariants()} w-full`}>Sign up</Link>
      </> }

      <div className="mt-4">
        <p>auth: { user ? user.username : "null" }</p>
      </div>
    </aside>
  )
}