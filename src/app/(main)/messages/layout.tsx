import { ReactNode } from "react"
import { Chats } from "./components/Chats"

export default async ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-[calc(100vh-2rem)] grid grid-cols-[auto_1fr] lg:grid-cols-[2fr_5fr] gap-3 lg:gap-6 pb-8">
      <Chats />
      { children }
    </div>
  )
}