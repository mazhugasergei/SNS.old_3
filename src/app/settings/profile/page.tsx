"use client"
import { RootState } from "@/store/store"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Switch } from "@/components/ui/switch"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "@/components/ui/use-toast"
import update_settings from "@/actions/update_settings"
import { ToastAction } from "@/components/ui/toast"
import { ReloadIcon } from "@radix-ui/react-icons"
import { setUser } from "@/store/slices/user.slice"

export default () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const auth = useSelector((state: RootState) => state.user.auth)
  const username = useSelector((state: RootState) => state.user.username)
  const settings = useSelector((state: RootState) => state.user.settings)
  const [loggedIn,  setLoggedIn] = useState(false)

  // redirect if not logged in
  useEffect(()=>{
    if(auth === false) router.push("/")
    else if(auth) setLoggedIn(true)
  }, [auth])

  const FormSchema = z.object({
    private_email: z.boolean().optional()
  })

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema)
  })

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    await update_settings(username as string, data)
      .then((res) => {
        toast({
          variant: res ? undefined : "destructive",
          title: res ? undefined : "Uh oh! Something went wrong.",
          description: res ? "Changes were saved." : "There was an error saving the changes.",
          action: res ? undefined : <ToastAction altText="Try again" onClick={form.handleSubmit(onSubmit)}>Try again</ToastAction>
        })
        if(res) dispatch(setUser({ settings: data }))
      })
  }

  return loggedIn && (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <h3 className="mb-4 text-lg font-medium">Profile</h3>
          <div className="space-y-4">
            <FormField control={form.control} name="private_email" defaultValue={settings?.private_email as boolean}
              render={({ field }) => {
                return (
                  <FormItem className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>Hide email</FormLabel>
                      <FormDescription>
                        Hide your email address from public view.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )
              }}
            />
          </div>
        </div>
        <Button disabled={form.formState.isSubmitting}>{ form.formState.isSubmitting ? <><ReloadIcon className="mr-2 h-4 w-4 animate-spin" />Saving</> : "Save changes" }</Button>
      </form>
    </Form>
  )
}