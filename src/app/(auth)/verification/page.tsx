import verifyEmail from "@/actions/verifyEmail"
import { toast } from "@/components/ui/use-toast"
import { redirect } from "next/navigation"

export default async ({ searchParams }: { searchParams: { _id: string, code: string } }) => {
  const { _id, code } = searchParams

  const ok = await verifyEmail(_id, code)
    .then(res => res.ok)
    .catch(() => redirect("/"))
  
  return ok && (<>
    <h1 className="text-4xl font-bold tracking-tight mb-2">Verified successfully!</h1>
    <p className="text-sm font-medium">Thanks for verifying your email.</p>
  </>)
}