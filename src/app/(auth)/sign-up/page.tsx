"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import Header_Auth from "@/components/Header_Auth"
import sign_up from "@/actions/sign_up"
import { useDispatch, useSelector } from "react-redux"
import { setUser } from "@/store/slices/user.slice"
import { useRouter } from "next/navigation"
import { ReloadIcon } from "@radix-ui/react-icons"
import { useEffect, useState } from "react"
import { RootState } from "@/store/store"

const formSchema = z.object({
  email: z.string().max(50),
  username: z.string().min(2).max(50),
  password: z.string().min(8).max(50),
  fullname: z.string().min(2).max(50)
})

export default () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const auth = useSelector((state: RootState) => state.user.auth)
  const [loggedIn,  setLoggedIn] = useState(true)

  // redirect if logged in
  useEffect(()=>{
    if(auth) router.push("/")
    else setLoggedIn(false)
  })

  const form = useForm<z.infer<typeof formSchema>>({
    mode: "onChange",
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "markuswedler8@gmail.com",
      username: "markuswedler",
      password: "12345678",
      fullname: "Markus Wedler"
    }
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // generate verification code
    const { email, username, fullname, password } = values
    await sign_up(email, username, fullname, password)
      .then(res => {
        dispatch(setUser({ email, is_signing_up: true }))
        setTimeout(() => dispatch(setUser({ email: null, is_signing_up: false })), 300000)
        router.push("/verification")
      })
      .catch(err => {
        const error = err.message.replace("Error: ", "")
        const errType = error.substring(1, error.indexOf("]: "))
        const errMessage = error.substring(error.indexOf("]: ")+3)
        form.setError(errType, { type: "server", message: errMessage })
      })
  }

  return !loggedIn && (
    <div className="relative h-full flex flex-col justify-center">
      <Header_Auth />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col max-w-sm space-y-2 mx-auto">
          <h1 className="text-4xl font-bold tracking-tight mb-2">Create account</h1>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input className="text-error" placeholder="johnsmith@example.com" type="email" {...field} required />
                </FormControl>
                <FormMessage>{form.formState.errors.email?.message}</FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="johnsmith" {...field} required />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="1231213" type="password" {...field} required />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fullname"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Smith" {...field} required />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={form.formState.isSubmitting}>{ form.formState.isSubmitting && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> }Create account</Button>
          <FormDescription className="text-center text-text">Already have an account? <Link href="/log-in" className="font-bold underline">Log in</Link></FormDescription>
        </form>
      </Form>
    </div>
  )
}