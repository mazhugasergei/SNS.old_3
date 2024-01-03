import Logo from "@/app/components/Logo"
import { Nav } from "./Nav"
import Link from "next/link"
import { Button, buttonVariants } from "@/components/ui/button"
import { getAuthId } from "@/actions/getAuthId"
import { LuPen } from "react-icons/lu"
import { logOut } from "@/actions/logOut"
import { User } from "@/models/User"
import { LuLogIn } from "react-icons/lu"
import { LuLogOut } from "react-icons/lu"

export const Aside = async () => {
	const authId = await getAuthId()
	const username = (await User.findById(authId, "username"))?.username

	return (
		<aside className="sticky min-h-[100vh] top-0 md:w-1/5 lg:w-1/6 z-49 flex flex-col border-r pb-2 pr-2">
			<div className="sticky top-4 sm:top-8 mb-2">
				<Logo className="mb-4" />
				<Nav />
			</div>
			<div className="mt-auto">
				{authId ? (
					<Link
						href={`/${username}` || "/log-in"}
						className={`min-h-[2.25rem] flex justify-center items-center bg-primary hover:bg-primary/90 text-center text-sm text-primary-foreground font-medium rounded-md shadow transition p-2 md:px-4`}
					></Link>
				) : (
					<Link
						href="/log-in"
						className={`min-h-[2.25rem] flex justify-center items-center bg-primary hover:bg-primary/90 text-center text-sm text-primary-foreground font-medium rounded-md shadow transition p-2 md:px-4`}
					>
						<LuLogIn className="md:hidden" />
						<span className="max-md:hidden">Log in</span>
					</Link>
				)}
			</div>
		</aside>
	)
}
