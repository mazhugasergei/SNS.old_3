import Link from "next/link"
import UserCard from "./[username]/components/UserCard"
import { getUser } from "@/actions/getUser"

export default async () => {
  const user = await getUser("mazhugasergei")

  return (
    <>
      { user && <UserCard {...{user}}>
        <Link href="/mazhugasergei" className="text-sm hover:underline">@mazhugasergei</Link>
      </UserCard> }
    </>
  )
}