import { useForm } from "react-hook-form"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../../../../components/ui/dialog"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../../../components/ui/form"
import { Input } from "../../../../components/ui/input"
import { Button } from "../../../../components/ui/button"
import verify_email_codes from "@/actions/verify_email_codes"
import { ReloadIcon } from "@radix-ui/react-icons"
import { toast } from "@/components/ui/use-toast"
import { useFormError } from "@/hooks/useFormError"

const formSchema = z.object({
  code_1: z.string().length(4, { message: "The code must contain 4 characters" }),
  code_2: z.string().length(4, { message: "The code must contain 4 characters" })
})

export default ({ newEmail }: { newEmail: string }) => {
  const email = ""

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code_1: "",
      code_2: ""
    }
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    await verify_email_codes(email as string, newEmail, data.code_1, data.code_2)
      .then(res => {
        if(res){
          toast({
            title: "Success.",
            description: "Email was updated."
          })
          document.getElementById("changeEmailDialogTrigger")?.click()
        }
      })
      .catch(err => {
        const errType = err.message.substring(err.message.indexOf("[")+1, err.message.indexOf("]: "))
        const errMessage = err.message.substring(err.message.indexOf("]: ")+3)
        if(errType === "codes"){
          form.setError("code_1", { type: "server", message: "" })
          form.setError("code_2", { type: "server", message: errMessage })
        }
        else useFormError(form, err, onSubmit)
      })
  }

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
            <Button disabled={form.formState.isSubmitting} className="w-full">{ form.formState.isSubmitting && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> }Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}