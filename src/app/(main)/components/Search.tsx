"use client"
import get_users from "@/actions/get_users"
import { CommandDialog, CommandInput } from "@/components/ui/command"
import Link from "next/link"
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react"
import Avatar from "./Avatar"

export default ({ searchOpen, setSearchOpen }: { searchOpen: boolean, setSearchOpen: Dispatch<SetStateAction<boolean>> }) => {
  const [value, setValue] = useState<string>()
  const [defaultUsers, setdefaultUsers] = useState<{ pfp?: string | null, fullname: string, username: string }[]>()
  const [users, setUsers] = useState<{ pfp?: string | null, fullname: string, username: string }[]>()
  const [pending, setPending] = useState<boolean>()
  let timeout = useRef<NodeJS.Timeout>()

  useEffect(()=>{
    ( async () =>
      await get_users("")
        .then(res => {
          setdefaultUsers(res)
          setPending(false)
        }) )()
  }, [])

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
    flex
    items-center
    gap-2
    text-sm
    rounded-sm
    hover:bg-accent
    px-2
    py-2
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
      <div className="px-2 py-1">
        {/* No results */}
        { value && !users && <p className="text-center">{ pending ? "loading..." : "No results found." }</p> }
        {/* Yes results */}
        { users && <>
          <p className={categoryClasses}>People</p>
          { users.map(user =>
            <Link href={`/${user.username}`} className={itemClasses} onClick={handleItemClick} key={user.username}>
              <Avatar src={user.pfp || ""} className="w-7 h-7" />
              { user.fullname }
              <span className="opacity-[.7] text-xs">{ user.username }</span>
            </Link>
          ) }
        </> }
        {/* Default value */}
        { !value && defaultUsers && <>
          <p className={categoryClasses}>People</p>
          { defaultUsers.map(user =>
            <Link href={`/${user.username}`} className={itemClasses} onClick={handleItemClick} key={user.username}>
              <Avatar src={user.pfp || ""} className="w-7 h-7" />
              { user.fullname }
              <span className="opacity-[.7] text-xs">{ user.username }</span>
            </Link>
          ) }
        </> }
      </div>
    </CommandDialog>
  )
}