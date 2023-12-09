import Link from "next/link"
import UserCard from "./[username]/components/UserCard"
import { getUser } from "@/actions/getUser"

export default async () => {
  const mazhugasergei = await getUser({ username: "mazhugasergei" })
  const egormiroshnichenko = await getUser({ username: "egormiroshnichenko" })

  return (
    <>
      <div>
        { mazhugasergei && <UserCard user={mazhugasergei}>
          <Link href="/mazhugasergei" className="text-sm hover:underline">@mazhugasergei</Link>
        </UserCard> }
      </div>
      <div>
        { egormiroshnichenko && <UserCard user={egormiroshnichenko}>
          <Link href="/egormiroshnichenko" className="text-sm hover:underline">@egormiroshnichenko</Link>
        </UserCard> }
      </div>
    </>
  )
}