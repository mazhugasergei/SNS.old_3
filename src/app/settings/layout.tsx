import { Metadata } from "next"
import '@/styles/globals.css'
import '@/styles/index.css'
import { Separator } from "@/components/ui/separator"
import SidebarNav from "./components/SidebarNav"
import Header from "@/app/(main)/components/Header"
import Footer from "../(main)/components/Footer"

export const metadata: Metadata = {
  title: "Settings - Wave"
}

const sidebarNavItems = [
  {
    title: "Profile",
    href: "/settings/profile",
  },
  {
    title: "Appearance",
    href: "/settings/appearance",
  },
  {
    title: "Notifications",
    href: "/settings/notifications",
  }
]

export default ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <div className="min-h-[calc(100vh-9.61rem)] container space-y-6">
        {/* Top Title */}
        <div className="space-y-0.5 pt-8">
          <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">
            Manage your account settings and set e-mail preferences.
          </p>
        </div>
        <Separator className="my-6" />
        {/* Main */}
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <main className="flex-1 lg:max-w-2xl">{children}</main>
        </div>
      </div>
      <Footer />
    </>
  )
}