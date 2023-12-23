import Logo from "@/app/components/Logo"
import { Nav } from "./Nav"
import Link from "next/link"
import { Button, buttonVariants } from "@/components/ui/button"
import { getAuthUser } from "@/actions/getAuthUser"
import { LuPen } from "react-icons/lu"
import { logOut } from "@/actions/logOut"
import { RxExit } from "react-icons/rx"

export const Aside = async () => {
  const user = await getAuthUser()

  return (
    <aside className="sticky top-0 md:w-1/5 lg:w-1/6 z-49 flex flex-col pt-8">
      <Logo className="mb-4" />
      <Nav />
      { user ? <>
        <Link href="/moment" className={`block ${buttonVariants()} mb-2`}>
          <LuPen className="md:hidden" />
          <span className="max-md:hidden">New Moment</span>
        </Link>
        <form action={logOut}>
          <Button variant="outline" className="w-full">
            <RxExit className="md:hidden" />
            <span className="max-md:hidden">Log out</span>
          </Button>
        </form>
      </> :
        <>
          <Link href="/log-in" className={`${buttonVariants({ variant: "ghost" })} w-full bg-background mb-1.5`}>Log in</Link>
          <Link href="/sign-up" className={`${buttonVariants()} w-full`}>Sign up</Link>
        </>
      }

      <div className="text-xs mt-4" style={{ transform: "rotate(180deg)", writingMode: "vertical-rl", textOrientation: "sideways" }}>
        <p>auth: { user ? user.username : "null" }</p>
      </div>
    </aside>
  )
}