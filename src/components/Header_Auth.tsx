import Link from "next/link"
import { HiOutlineArrowLeft } from "react-icons/hi"

export default () => {
  return (
    <header
      className="
        absolute
        top-0
        h-14
        w-full
        flex
        items-center
      "
    >
      <div className="w-full flex justify-between items-center">
        {/* logo */}
        <Link className="mr-6 flex items-center space-x-2 mr-auto" href="/">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="h-6 w-6">
            <rect width="256" height="256" fill="none" />
            <line x1="208" y1="128" x2="128" y2="208" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
            <line x1="192" y1="40" x2="40" y2="192" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
          </svg>
          <span className="inline-block font-bold text-baze">Wave</span>
        </Link>
        <Link href="/" className="flex items-center gap-1.5 text-sm font-semibold"><HiOutlineArrowLeft style={{ strokeWidth: "3" }} /> Go back</Link>
      </div>
    </header>
  )
}