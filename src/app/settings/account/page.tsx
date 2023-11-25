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

const formSchema = z.object({
  pfp: z.string().optional(),
  email: z.string().max(50),
  username: z.string()
    .min(2, { message: "Username must be at least 2 characters" })
    .max(50, { message: "Username must contain at most 50 characters" })
    .refine(value =>
      value !== "log-in" &&
      value !== "sign-up" &&
      value !== "verification" &&
      value !== "messages" &&
      value !== "settings",
      { message: "Invalid username" }
    ),
  fullname: z.string().min(2, { message: "Full Name must be at least 2 characters" }).max(50, { message: "Full Name must contain at most 50 characters" }),
  bio: z.string().max(999, { message: "Bio must contain at most 999 characters" }).optional(),
  private_email: z.boolean().optional()
})

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