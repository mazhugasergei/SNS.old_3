"use client"
import { RootState } from "@/store/store"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Button, buttonVariants } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ReloadIcon } from "@radix-ui/react-icons"
import { Label } from "@/components/ui/label"
import DeleteAccountDialog from "@/app/settings/components/DeleteAccountDialog"

const formSchema = z.object({})

export default () => {
  const router = useRouter()
  const auth = useSelector((state: RootState) => state.user.auth)
  const [loggedIn,  setLoggedIn] = useState(false)

  // redirect if not logged in
  useEffect(()=>{
    if(auth === false) router.push("/settings/log-in")
    else if(auth) setLoggedIn(true)
  }, [auth])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {}

  return loggedIn ? (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            {/* danger zone */}
            <div className="text-destructive space-y-3">
              <Label className="block">Account removal</Label>
              <Label htmlFor="deleteAccountDialog" className={`cursor-pointer block text-center ${buttonVariants({ variant: "destructive" })}`}>Delete account</Label>
            </div>
          </div>
          {/* <div className="sticky bottom-0 bg-background rounded-tl-md rounded-tr-md pb-6">
            <Button className="w-full" disabled={form.formState.isSubmitting}>{ form.formState.isSubmitting ? <><ReloadIcon className="mr-2 h-4 w-4 animate-spin" />Saving</> : "Save changes" }</Button>
          </div> */}
        </form>
      </Form>
      <DeleteAccountDialog />
    </>
  ) : <>loading...</>
}