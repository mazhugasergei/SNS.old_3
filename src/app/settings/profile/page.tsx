"use client"
import { RootState } from "@/store/store"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Switch } from "@/components/ui/switch"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "@/components/ui/use-toast"

export default () => {
  const router = useRouter()
  const auth = useSelector((state: RootState) => state.user.auth)
  const [loggedIn,  setLoggedIn] = useState(false)

  const FormSchema = z.object({
    private_email: z.boolean()
  })

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      private_email: false
    }
  })

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    toast({
      description: "Changes were saved"
    })
  }

  // redirect if not logged in
  useEffect(()=>{
    if(auth === false) router.push("/")
    else if(auth) setLoggedIn(true)
  }, [auth])

  return loggedIn && (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <h3 className="mb-4 text-lg font-medium">Profile</h3>
          <div className="space-y-4">
            <FormField control={form.control} name="private_email"
              render={({ field }) => {
                return (
                  <FormItem className="flex items-center justify-between rounded-lg border p-3 shadow-sm" onChange={() => console.log(field.value)}>
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
        <Button>Submit</Button>
      </form>
    </Form>
  )
}