import { useForm } from "react-hook-form"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form"
import { Input } from "./ui/input"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import delete_account from "@/actions/delete_account"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store/store"
import { toast } from "./ui/use-toast"
import { ToastAction } from "./ui/toast"
import { setUser } from "@/store/slices/user.slice"

const formSchema = z.object({
  password: z.string()
})

export default () => {
  const dispatch = useDispatch()
  const username = useSelector((state: RootState) => state.user.username)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: ""
    }
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const toastError = () => toast({
      variant: "destructive",
      title: "Uh oh! Something went wrong.",
      description: "There was an error saving the changes.",
      action: <ToastAction altText="Try again" onClick={form.handleSubmit(onSubmit)}>Try again</ToastAction>
    })

    await delete_account(username as string, data.password)
      .then(() => {
        localStorage.removeItem("token")
        dispatch(setUser({ auth: false }))
      })
      .catch(err => {
        toastError()
        const error = err.message.replace("Error: ", "")
        const errType = error.substring(1, error.indexOf("]: "))
        const errMessage = error.substring(error.indexOf("]: ")+3)
        form.setError(errType, { type: "server", message: errMessage })
        console.error(err.message)
      })
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
                <FormMessage />
              </FormItem>
            )} />
            <Button variant="destructive" className="w-full">Delete permanently</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}