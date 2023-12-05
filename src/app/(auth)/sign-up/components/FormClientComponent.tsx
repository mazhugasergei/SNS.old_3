"use client"
import * as zod from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { signUp } from "@/actions/signUp"
import { ReloadIcon } from "@radix-ui/react-icons"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useFormError } from "@/hooks/useFormError"

const formSchema = zod.object({
  email: zod.string().max(50),
  username: zod.string()
    .min(2, { message: "Username must be at least 2 characters" })
    .max(50, { message: "Username must contain at most 50 characters" })
    .refine(value =>
      value !== "log-in" &&
      value !== "sign-up" &&
      value !== "verification" &&
      value !== "messages" &&
      value !== "settings" &&
      !value.includes("/"),
      { message: "Invalid username" }
    ),
  password: zod.string().min(8, { message: "Password must be at least 8 characters" }).max(50, { message: "Password must contain at most 50 characters" }),
  fullname: zod.string().min(2, { message: "Full Name must be at least 2 characters" }).max(50, { message: "Full Name must contain at most 50 characters" })
})

export const FormClientComponent = () => {
  const form = useForm<zod.infer<typeof formSchema>>({
    mode: "onChange",
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
      fullname: ""
    }
  })

  const onSubmit = async (values: zod.infer<typeof formSchema>) => {
    // generate verification code
    const { email, username, fullname, password } = values
    await signUp(email, username, fullname, password)
      .then(() => {
        form.reset()
        // TODO: redirect
      })
      .catch(err => useFormError(form, err, onSubmit))
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col max-w-sm space-y-2 mx-auto">
        <h1 className="text-4xl font-bold tracking-tight mb-2">Create an account</h1>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="johnsmith@example.com" type="email" {...field} required />
              </FormControl>
              <FormMessage />
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
                <Input placeholder="••••••••" type="password" {...field} required />
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
  )
}