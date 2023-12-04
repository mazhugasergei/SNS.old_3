"use client"
import { CSSProperties, useState } from "react"
import { LuSearch } from "react-icons/lu"
import Search from "./Search"

type Styles = {
  className?: string
  style?: CSSProperties
}

export default ({ buttonStyle, iconStyle }: { buttonStyle: Styles, iconStyle: Styles }) => {
  const [searchOpen, setSearchOpen] = useState(false)

  return (<>
    <button {...buttonStyle} onClick={() => setSearchOpen(!searchOpen)}>
      <LuSearch {...iconStyle} />
    Search</button>
    <Search {...{ searchOpen, setSearchOpen }} />
  </>)
}