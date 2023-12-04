import Link from "next/link"
import { HiOutlineArrowLeft } from "react-icons/hi"
import Logo from "@/app/components/Logo"

export default () => {
  return (
    <header className="absolute top-0 h-14 w-full flex items-center">
      <div className="w-full flex justify-between items-center">
        <Logo className="-ml-4" />
        {/* <Link href="/" className="flex items-center gap-1.5 text-sm font-semibold"><HiOutlineArrowLeft style={{ strokeWidth: "3" }} /> Go back</Link> */}
      </div>
    </header>
  )
}