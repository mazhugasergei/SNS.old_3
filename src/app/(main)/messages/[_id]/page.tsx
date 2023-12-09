import { getUser } from "@/actions/getUser"
import { UserAvatar } from "../../components/UserAvatar"
import Link from "next/link"

export default async ({ params }: { params: { _id: string } }) => {
  const user = await getUser({ _id: params._id })

  return user ? <>
    <div className="border-b p-4">
      <Link href={`/${user.username}`} className="flex items-center gap-2">
        <div className="rounded-full hover:brightness-[.85] transition">
          <UserAvatar src={user.pfp || ""} className="w-7 h-7" />
        </div>
        <div className="text-xs font-bold">{ user.fullname }</div>
      </Link>
    </div>
    <div className="p-4">chat will be here</div>
  </> : <>user not found</>
}