"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Header_Auth from "@/components/Header_Auth"
import { useDispatch, useSelector } from "react-redux"
import { setUser } from "@/store/slices/user.slice"
import { useRouter } from "next/navigation"
import { ReloadIcon } from "@radix-ui/react-icons"
import verify from "@/actions/verify"
import { RootState } from "@/store/store"
import { useEffect, useState } from "react"
import AuthBG from '@/components/AuthBG'

const formSchema = z.object({
  code: z.string().length(4)
})

export default () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [signingUp, setSigningUp] = useState(false)
  const is_signing_up = useSelector((state: RootState) => state.user.is_signing_up)
  const email = useSelector((state: RootState) => state.user.email)

  // redirect if not signing up
  useEffect(()=>{
    if(!is_signing_up) router.push("/")
    else setSigningUp(true)
  }, [is_signing_up])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: "",
    }
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { code } = values
    // verify the code
    await verify(email!, code)
      .then(res => {
        // redirect
        const { token, ...user } = res
        localStorage.setItem("token", token)
        dispatch(setUser({ auth: true, token, ...user }))
        router.push("/")
      })
      .catch(err => {
        const error = err.message.replace("Error: ", "")
        const errType = error.substring(1, error.indexOf("]: "))
        const errMessage = error.substring(error.indexOf("]: ")+3)
        form.setError(errType, { type: "server", message: errMessage })
      })
  }

  return signingUp && (
    <>
      <div className="relative h-full flex flex-col justify-center">
        <Header_Auth />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col max-w-sm space-y-2 mx-auto">
            <h1 className="text-4xl font-bold tracking-tight">Verification</h1>
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Verification code</FormLabel>
                  <FormControl>
                    <Input className="text-error" placeholder="****" type="code" {...field} required />
                  </FormControl>
                  <FormDescription>
                    Verification code was sent on your email.
                  </FormDescription>
                  <FormMessage>{form.formState.errors.code?.message}</FormMessage>
                </FormItem>
              )}
            />
            <Button disabled={form.formState.isSubmitting}>{ form.formState.isSubmitting && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> }Confirm</Button>
          </form>
        </Form>
      </div>
      <AuthBG />
    </>
  )
}