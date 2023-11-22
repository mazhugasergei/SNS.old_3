import { useForm } from "react-hook-form"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Form, FormControl, FormField, FormItem } from "./ui/form"
import { Input } from "./ui/input"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const formSchema = z.object({
  password: z.string()
})

export default () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: ""
    }
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log(data)
  }

  return (
    <Dialog>
      <DialogTrigger id="deleteAccountDialog" className="hidden" />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>This action cannot be undone. This will permanently delete your account and remove your data from our servers.</DialogDescription>
        </DialogHeader>
        <Button type="button" variant="destructive" onClick={e => {
          const btn = e.target as HTMLButtonElement
          btn.parentElement?.querySelector("form.hidden")?.classList.remove("hidden")
          btn.classList.add("hidden")
        }}>I understand</Button>
        <Form {...form}>
          <form className="hidden space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField control={form.control} name="password" render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="password" placeholder="Password" {...field} required />
                </FormControl>
              </FormItem>
            )} />
            <Button variant="destructive" className="w-full">Delete permanently</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}