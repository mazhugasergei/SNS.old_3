import { ReactNode } from "react"
import { Chats } from "./components/Chats"
import { Aside } from "../(main)/components/Aside"
import RightAside from "../(main)/components/RightAside"

export default async ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-[calc(100vh-6.05rem)] container flex items-start gap-2 sm:gap-12 max-sm:px-2">
      <Aside />
      <main className="flex-1 h-[100vh] grid grid-cols-[auto_1fr] lg:grid-cols-[1fr_2fr] gap-3 lg:gap-6">
        <Chats />
        <div className="flex flex-col justify-center border-x">
          { children }
        </div>
      </main>
    </div>
  )
}