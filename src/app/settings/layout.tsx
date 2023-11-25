import { Metadata } from "next"
import '@/styles/globals.css'
import '@/styles/index.css'
import { Separator } from "@/components/ui/separator"
import Aside from "./components/Aside"
import Header from "@/app/(main)/components/Header"
import Footer from "../(main)/components/Footer"

export const metadata: Metadata = {
  title: "Settings - Wave"
}

export default ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <div className="min-h-[calc(100vh-9.61rem)] container space-y-6">
        {/* Top Title */}
        <div className="space-y-0.5 pt-8">
          <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">
            Manage your account settings and appearance preferences.
          </p>
        </div>
        <Separator className="my-6" />
        {/* Main */}
        <div className="flex flex-col gap-6 md:flex-row md:gap-12">
          <Aside />
          <main className="flex-1">
            {children}
          </main>
          <aside className="hidden xl:block lg:w-1/6 -mr-4">
            <div className="sticky top-[5.05rem]" />
          </aside>
        </div>
      </div>
      <Footer />
    </>
  )
}