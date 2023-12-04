"use client"
import { logIn } from "@/actions/logIn"
import useFormError from "@/hooks/useFormError"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as zod from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { ReloadIcon } from "@radix-ui/react-icons"
import { useRouter } from "next/navigation"

const formSchema = zod.object({
  email: zod.string(),
  password: zod.string()
})

export const FormClientComponent = () => {
  const router = useRouter()

  const form = useForm<zod.infer<typeof formSchema>>({
    mode: "onChange",
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "ghbdtnghbdtn8@gmail.com",
      password: "12345678"
    }
  })

  const onSubmit = async (values: zod.infer<typeof formSchema>) => {
    // generate verification code
    const { email, password } = values
    await logIn(email, password)
      .then(() => {
        form.reset()
        router.push("/")
      })
      .catch(err => useFormError(form, err))
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col max-w-sm space-y-2 mx-auto">
        <h1 className="text-4xl font-bold tracking-tight mb-2">Welcome back</h1>
        <FormField control={form.control} name="email"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel>Email or username</FormLabel>
              <FormControl>
                <Input placeholder="johnsmith@example.com" type="email" {...field} required />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField control={form.control} name="password"
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
        <Button disabled={form.formState.isSubmitting}>{ form.formState.isSubmitting && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> }Log In</Button>
        <FormDescription className="text-center text-text">Don't have an account? <Link href="/sign-up" className="font-bold underline">Sign up</Link></FormDescription>
      </form>
    </Form>
  )
}