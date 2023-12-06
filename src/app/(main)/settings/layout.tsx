import { Metadata } from "next"
import { Separator } from "@/components/ui/separator"
import SettingsAside from "./components/SettingsAside"
import { Aside } from "../components/Aside"
import Footer from "../components/Footer"

export const metadata: Metadata = {
  title: "Settings - Wave"
}

export default ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex-1 space-y-6">
      {/* Top Title */}
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Manage your account settings and appearance preferences.
        </p>
      </div>
      <Separator className="my-6" />
      {/* Main */}
      <div className="flex flex-col gap-6 lg:flex-row lg:gap-12">
        <SettingsAside />
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  )
}