import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Dispatch, SetStateAction } from "react"

export default ({ searchOpen, setSearchOpen }: { searchOpen: boolean, setSearchOpen: Dispatch<SetStateAction<boolean>> }) => {
  return (
    <CommandDialog open={searchOpen} onOpenChange={setSearchOpen}>
      <CommandInput placeholder="Type to search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>Mazhuga Sergei&nbsp;<span className="opacity-[.7] text-xs">mazhugasergei</span></CommandItem>
          <CommandItem>Markus Wedler&nbsp;<span className="opacity-[.7] text-xs">markuswedler</span></CommandItem>
          <CommandItem>Egor Miroshnichenko&nbsp;<span className="opacity-[.7] text-xs">egormiroshnichenko</span></CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}