import { useForm } from "react-hook-form"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Input } from "./ui/input"
import { Button } from "./ui/button"

const formSchema = z.object({
  code_1: z.string().length(4, { message: "The code must contain 4 characters" }),
  code_2: z.string().length(4, { message: "The code must contain 4 characters" })
})

export default () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code_1: "",
      code_2: ""
    }
  })

  const onSubmit = () => {}

  return (
    <Dialog>
      <DialogTrigger id="changeEmailDialogTrigger" className="hidden">Open</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Email</DialogTitle>
          <DialogDescription>For security reasons in order to change the email address you have to provide two codes: one is sent to your current email address, another is sent to the new one. Please, enter them both below.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField control={form.control} name="code_1" render={({ field }) => (
              <FormItem>
                <FormLabel>First code</FormLabel>
                <FormControl>
                  <Input placeholder="****" {...field} required />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="code_2" render={({ field }) => (
              <FormItem>
                <FormLabel>Second code</FormLabel>
                <FormControl>
                  <Input placeholder="****" {...field} required />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <Button className="w-full">Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}