import { ReactNode } from "react"
import { Chats } from "./components/Chats"

export default async ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-[calc(100vh-2rem)] flex gap-6 lg:gap-12 pb-8">
      <Chats />
      <div className="flex-1 border rounded-lg">{ children }</div>
    </div>
  )
}