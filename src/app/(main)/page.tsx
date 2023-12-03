import Link from "next/link"
import UserCard from "./[username]/components/UserCard"
import get_user from "@/actions/get_user"
import { UserType } from "@/types/User"

export default async () => {
  const user: UserType | null = await get_user("mazhugasergei")

  return (
    <>
      { user && <UserCard {...{user}}>
        <Link href="/mazhugasergei" className="text-sm hover:underline">@mazhugasergei</Link>
      </UserCard> }
    </>
  )
}