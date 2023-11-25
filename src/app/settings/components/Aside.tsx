"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { buttonVariants } from "@/components/ui/button"
import { useSelector } from "react-redux"
import { RootState } from "@/store/store"

const items = [
  {
    title: "Profile",
    href: "/settings/profile",
  },
  {
    title: "Appearance",
    href: "/settings/appearance",
  }
]

export default () => {
  const pathname = usePathname()
  const auth = useSelector((state: RootState) => state.user.auth)

  return (
    <aside className="md:w-1/5 lg:w-1/6 -ml-4">
      <nav className="sticky top-[5.05rem] flex flex-wrap gap-2 md:flex-col">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`${buttonVariants({ variant: "ghost" })} ${ pathname === item.href ? "bg-muted hover:bg-muted" : "hover:bg-transparent hover:underline"}`}
            style={{ justifyContent: "flex-start" }}
          >{item.title}</Link>
        ))}
      </nav>
    </aside>
  )
}