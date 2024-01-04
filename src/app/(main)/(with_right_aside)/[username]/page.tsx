import { UserAvatar } from "@/app/(main)/(with_right_aside)/components/UserAvatar"
import { LuCalendarDays, LuMail } from "react-icons/lu"
import { getPosts } from "@/actions/getPosts"
import Link from "next/link"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import UserCard from "./components/UserCard"
import { LuHeart } from "react-icons/lu"
import { LuMessageCircle } from "react-icons/lu"
import { getAuthId } from "@/actions/getAuthId"
import { Banner } from "../components/Banner"
import { User } from "@/models/User"

export const generateMetadata = async ({ params }: { params: { username: string } }) => {
	const user = await (async () => {
		const user = await User.findOne({ username: params.username }, ["username", "fullname"])
		if (!user) throw ""
		return {
			username: user.username,
			fullname: user.fullname
		}
	})()

	return {
		title: `${user && `${user.fullname} (@${user.username}) - `}Wave`
	}
}

export default async ({ params }: { params: { username: string } }) => {
	const authId = await getAuthId()
	const user = await (async () => {
		const user = await User.findOne({ username: params.username }, [
			"_id",
			"username",
			"fullname",
			"email",
			"pfp",
			"bio",
			"banner",
			"private_email",
			"createdAt"
		])
		if (!user) throw ""
		return {
			_id: user._id.toString(),
			username: user.username,
			fullname: user.fullname,
			email: user.email,
			pfp: user.pfp,
			bio: user.bio,
			banner: user.banner,
			private_email: user.private_email,
			createdAt: user.createdAt
		}
	})()
	if (!user) return <>user not found</>
	const posts = user._id ? await getPosts(user._id.toString()) : null

	return (
		<>
			{/* profile details */}
			<div className="contianer border-b">
				<Banner src={user.banner} />
				<div className="px-4 pb-3 sm:px-8 sm:pb-6">
					<UserAvatar
						src={user.pfp}
						className="w-[20vw] h-[20vw] sm:w-[8.40625rem] sm:h-[8.40625rem] border-4 border-background mb-3 -mt-[calc(20vw/2)] md:-mt-[4.203125rem]"
					/>
					<p className="text-2xl sm:text-3xl font-bold">{user.fullname}</p>
					<p className="opacity-70 text-sm">@{user.username}</p>
					<p className="text-sm my-1">{user.bio}</p>
					{!user.private_email && (
						<a
							href={`mailto:${user.email}`}
							className="inline-flex items-center gap-1 text-sm hover:underline opacity-70"
						>
							<LuMail />
							<span className="break-all">{user.email}</span>
						</a>
					)}
					{user.createdAt && (
						<p className="flex items-center gap-1 opacity-70 text-sm">
							<LuCalendarDays /> Joined{" "}
							{new Date(user.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
						</p>
					)}
				</div>
			</div>

			{/* posts */}
			{posts?.length ? (
				<div className="-mb-[.0625rem]">
					{posts.map((post) => (
						<div
							className="grid grid-cols-[auto_1fr] gap-[.6875rem] items-start border-b text-sm px-8 py-5"
							key={post._id}
						>
							{/* pfp */}
							<UserCard {...{ user }}>
								<Link href={`/${user.username}`} className="rounded-full">
									<UserAvatar src={user.pfp || ""} className="w-8 h-8 hover:brightness-[.92] transition" />
								</Link>
							</UserCard>
							{/* body */}
							<div>
								<UserCard {...{ user }}>
									<Link href={`/${user.username}`}>
										<span className="font-bold hover:underline">{user.fullname}</span>
										<span className="opacity-70"> @{user.username}</span>
									</Link>
								</UserCard>
								<span className="opacity-70"> · </span>
								<TooltipProvider>
									<Tooltip>
										<TooltipTrigger className="opacity-70 hover:underline">
											{new Date(post.createdAt).toLocaleDateString("en-US", {
												year: "numeric",
												month: "short",
												day: "numeric"
											})}
										</TooltipTrigger>
										<TooltipContent>
											{new Date(post.createdAt).toLocaleTimeString("en-US", {
												hour: "numeric",
												minute: "2-digit",
												hour12: true
											}) +
												" · " +
												new Date(post.createdAt).toLocaleDateString("en-US", {
													year: "numeric",
													month: "short",
													day: "numeric"
												})}
										</TooltipContent>
									</Tooltip>
								</TooltipProvider>
								<p className="text-sm">{post.body}</p>
								{/* post tools */}
								<div className="flex gap-8 mt-2">
									<div className="group cursor-pointer flex items-center gap-2">
										<div className="group-hover:bg-[#F918801A] rounded-full transition p-2 -m-2">
											<LuHeart
												className="group-hover:stroke-[#F92083] transition"
												style={{
													fill: authId && post.likes.includes(authId) ? "#F92083" : "",
													stroke: authId && post.likes.includes(authId) ? "#F92083" : ""
												}}
											/>
										</div>
										<span
											className="text-xs group-hover:text-[#F92083] transition"
											style={{ color: authId && post.likes.includes(authId) ? "#F92083" : "" }}
										>
											{post.likes.length}
										</span>
									</div>
									<div className="group cursor-pointer flex items-center gap-2">
										<div className="group-hover:bg-[#1D9BF01A] rounded-full transition p-2 -m-2">
											<LuMessageCircle className="group-hover:stroke-[#1D9BF0] transition" />
										</div>
										<span className="text-xs group-hover:text-[#1D9BF0] transition">{post.comments.length}</span>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			) : (
				<div className="text-center">no moments yet</div>
			)}
		</>
	)
}
