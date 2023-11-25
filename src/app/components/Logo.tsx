import Link from "next/link"

export default () => {
  return (
    <Link className="flex items-center mr-auto" href="/">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="h-6 w-6 mr-2">
        <rect width="256" height="256" fill="none" />
        <line x1="208" y1="128" x2="128" y2="208" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
        <line x1="192" y1="40" x2="40" y2="192" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
      </svg>
      <span className="font-bold">Wave</span>
    </Link>
  )
}