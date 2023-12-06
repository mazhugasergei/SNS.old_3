"use client"
import { getUsers } from "@/actions/getUsers"
import { CommandDialog, CommandInput } from "@/components/ui/command"
import Link from "next/link"
import { useEffect, useRef, useState, CSSProperties } from "react"
import Avatar from "./Avatar"

export const Search = ({ children }: { children: React.ReactNode }) => {
  const [searchOpen, setSearchOpen] = useState(false)
  const [value, setValue] = useState<string>()
  const [defaultUsers, setDefaultUsers] = useState<{ pfp?: string | null, fullname: string, username: string }[]>()
  const [users, setUsers] = useState<{ pfp?: string | null, fullname: string, username: string }[]>()
  const [pending, setPending] = useState(false)
  let timeout = useRef<NodeJS.Timeout>()

  // getting default users
  useEffect(()=>{
    ( async ()=>{
      setPending(true)
      await getUsers("")
        .then(res => {
          setDefaultUsers(res)
          setPending(false)
        })
    } )()
  }, [])

  // getting users
  useEffect(()=>{
    clearTimeout(timeout.current)
    if(value){
      setPending(true)
      timeout.current = setTimeout(async ()=>{
        await getUsers(value)
          .then(res => {
            setUsers(res)
            setPending(false)
          })
      }, 500)
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
        defaultUsers && setPending(false)
        clearTimeout(timeout.current)
      }, 250)
    }
  }, [searchOpen])

  return (<>
    { children }
    <CommandDialog open={searchOpen} onOpenChange={setSearchOpen}>
      <CommandInput placeholder="Type to search..." onValueChange={setValue} />
      <div className="px-2 py-1"> {
        // Loading...
        pending ? <p className="text-center">loading...</p> :
        // Searching...
        value ? (
          // No results
          !users?.length ? <p className="text-center">No results found.</p> :
          // Yes results
          <>
            <p className={categoryClasses}>People</p>
            { users.map(user =>
              <Link href={`/${user.username}`} className={itemClasses} onClick={handleItemClick} key={user.username}>
                <Avatar src={user.pfp || ""} className="w-7 h-7" />
                { user.fullname }
                <span className="opacity-[.7] text-xs">{ user.username }</span>
              </Link>
            ) }
          </>
        ) :
        // Default values
        defaultUsers && <>
          <p className={categoryClasses}>People</p>
          { defaultUsers.map(user =>
            <Link href={`/${user.username}`} className={itemClasses} onClick={handleItemClick} key={user.username}>
              <Avatar src={user.pfp || ""} className="w-7 h-7" />
              { user.fullname }
              <span className="opacity-[.7] text-xs">{ user.username }</span>
            </Link>
          ) }
        </>
      } </div>
    </CommandDialog>
  </>)
}