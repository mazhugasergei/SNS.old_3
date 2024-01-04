import type { Metadata } from "next"
import { ReactNode } from "react"
import Footer from "./(with_right_aside)/components/Footer"
import { Aside } from "./(with_right_aside)/components/Aside"

export const metadata: Metadata = {
	title: "Home - Wave"
}

export default ({ children }: { children: ReactNode }) => {
	return (
		<>
			<div className="container flex items-start gap-2 sm:gap-8 max-sm:px-2 max-md:pl-2">
				<Aside />
				{children}
			</div>
			<Footer />
		</>
	)
}
