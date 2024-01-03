import { ReactNode } from "react"
import { Chats } from "./components/Chats"
import { Aside } from "../(main)/components/Aside"

export default async ({ children }: { children: ReactNode }) => {
	return (
		<div className="container flex items-start gap-2 sm:gap-8 max-sm:px-2 max-md:pl-2">
			<Aside />
			<main className="flex-1 h-[100vh] grid grid-cols-[auto_1fr] lg:grid-cols-[1fr_2fr] gap-3 lg:gap-6">
				<Chats />
				<div className="flex flex-col justify-center border-x">{children}</div>
			</main>
		</div>
	)
}
