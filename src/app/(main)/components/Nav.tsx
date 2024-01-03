import Link from "next/link"
import { LuHome, LuPen, LuSearch } from "react-icons/lu"
import { LuMessageSquare } from "react-icons/lu"
import { LuSettings } from "react-icons/lu"
import { buttonVariants } from "@/components/ui/button"
import { LuUser2 } from "react-icons/lu"
import { getAuthId } from "@/actions/getAuthId"
import { SearchProvider } from "./SearchProvider"
import { User } from "@/models/User"

export const Nav = async () => {
	const authId = await getAuthId()
	const authUser = await User.findById(authId)

	const buttonStyle = {
		className: `min-h-[2.25rem] flex max-md:justify-center items-center gap-2 hover:bg-accent text-center text-sm font-medium rounded-md transition p-2 md:px-4`
	}

	const iconStyle = {
		style: {
			width: "1rem",
			height: "1rem"
		}
	}

	const titleStyle = {
		className: "max-md:hidden"
	}

	return (
		<nav className="flex flex-col gap-1">
			<Link href="/" {...buttonStyle}>
				<LuHome {...iconStyle} />
				<span {...titleStyle}>Home</span>
			</Link>

			<Link href={authId ? `/messages` : "/log-in"} {...buttonStyle}>
				<LuMessageSquare {...iconStyle} />
				<span {...titleStyle}>Messages</span>
			</Link>

			<SearchProvider>
				<button {...buttonStyle}>
					<LuSearch {...iconStyle} />
					<span {...titleStyle}>Search</span>
				</button>
			</SearchProvider>

			<Link href={`/${authUser?.username}` || "/log-in"} {...buttonStyle}>
				<LuUser2 {...iconStyle} />
				<span {...titleStyle}>Profile</span>
			</Link>

			<Link href={`/settings/${authId ? "profile" : "appearance"}`} {...buttonStyle}>
				<LuSettings {...iconStyle} />
				<span {...titleStyle}>Settings</span>
			</Link>

			{authId && (
				<Link
					href="/moment"
					className="min-h-[2.25rem] flex justify-center items-center bg-primary hover:bg-primary/90 text-center text-sm text-primary-foreground font-medium rounded-md shadow transition p-2 md:px-4"
				>
					<LuPen className="md:hidden" />
					<span className="max-md:hidden">New Moment</span>
				</Link>
			)}
		</nav>
	)
}
