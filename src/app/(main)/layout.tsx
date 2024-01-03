import type { Metadata } from "next"
import Footer from "@/app/(main)/components/Footer"
import RightAside from "./components/RightAside"
import { Aside } from "./components/Aside"
import { ReactNode } from "react"

export const metadata: Metadata = {
	title: "Home - Wave"
}

export default ({ children }: { children: ReactNode }) => {
	return (
		<>
			<div className="container flex items-start gap-2 sm:gap-8 max-sm:px-2 max-md:pl-2">
				<Aside />
				<main className="flex-1 pt-4 sm:pt-8">{children}</main>
				<RightAside />
			</div>
			<Footer />
		</>
	)
}
