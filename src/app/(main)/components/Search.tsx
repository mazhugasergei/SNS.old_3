"use client"
import get_users from "@/actions/get_users"
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import Link from "next/link"
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react"

export default ({ searchOpen, setSearchOpen }: { searchOpen: boolean, setSearchOpen: Dispatch<SetStateAction<boolean>> }) => {
  const [value, setValue] = useState<string>()
  const [users, setUsers] = useState<{ fullname: string, username: string }[]>()
  const [pending, setPending] = useState<boolean>()
  let timeout = useRef<NodeJS.Timeout>()

  // search for users
  useEffect(()=>{
    clearTimeout(timeout.current)
    if(value){
      setPending(true)
      timeout.current = setTimeout(async ()=>{
        await get_users(value)
          .then(res => {
            setUsers(res)
            setPending(false)
          })
      }, 1000)
    }
    else setUsers(undefined)
  }, [value])

  const categoryClasses = `
    text-muted-foreground
    text-xs
    px-2
    py-1.5
  `

  const itemClasses = `
    cursor-pointer
    block
    text-sm
    rounded-sm
    hover:bg-accent
    px-2
    py-1.5
  `

  const handleItemClick = () => {
    setSearchOpen(false)
  }

  useEffect(()=>{
    if(!searchOpen){
      setTimeout(()=>{
        setValue(undefined)
        setUsers(undefined)
        setPending(false)
        clearTimeout(timeout.current)
      }, 250)
    }
  }, [searchOpen])

  return (
    <CommandDialog open={searchOpen} onOpenChange={setSearchOpen}>
      <CommandInput placeholder="Type to search..." onValueChange={setValue} />
      <div className="p-1">
        {/* No results */}
        { value && !users && <p className="text-center">{ pending ? "loading..." : "No results found." }</p> }
        {/* Yes results */}
        { users && <>
          <p className={categoryClasses}>People</p>
          { users.map(user => <Link href={`/${user.username}`} className={itemClasses} onClick={handleItemClick} key={user.username}>{ user.fullname }&nbsp;<span className="opacity-[.7] text-xs">{ user.username }</span></Link>) }
        </> }
        {/* Default value */}
        { !value && <>
          <p className={categoryClasses}>People</p>
          <Link href="/mazhugasergei" className={itemClasses} onClick={handleItemClick}>Mazhuga Sergei&nbsp;<span className="opacity-[.7] text-xs">mazhugasergei</span></Link>
          <Link href="/egormiroshnichenko" className={itemClasses} onClick={handleItemClick}>Egor Miroshnichenko&nbsp;<span className="opacity-[.7] text-xs">egormiroshnichenko</span></Link>
        </> }
      </div>
    </CommandDialog>
  )
}