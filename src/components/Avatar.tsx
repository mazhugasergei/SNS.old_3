import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { HTMLAttributes } from "react"
import { BsPersonFill } from "react-icons/bs"

export default ({ src, className }: { src: string, className?: string }) => {
  return (
    <Avatar className={`bg-cover bg-center border ${className}`}>
      <AvatarImage src={src as string} style={{ objectFit: "cover" }} />
      <AvatarFallback>
        <BsPersonFill className="opacity-[.5] w-[50%] h-[50%]" />
      </AvatarFallback>
    </Avatar>
  )
}