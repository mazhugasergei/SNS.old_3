import { useForm } from "react-hook-form"
import { Button } from "../../../components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../../../components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormMessage } from "../../../components/ui/form"
import { Input } from "../../../components/ui/input"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import delete_account from "@/actions/delete_account"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store/store"
import { toast } from "../../../components/ui/use-toast"
import { ToastAction } from "../../../components/ui/toast"
import { setUser } from "@/store/slices/user.slice"
import useToastError from "@/hooks/useToastError"
import useFormError from "@/hooks/useFormError"

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
    await delete_account(username as string, data.password)
      .then(() => {
        localStorage.removeItem("token")
        dispatch(setUser({ auth: false }))
      })
      .catch(err => {
        if(err.message === "Error: ") useToastError(form.handleSubmit(onSubmit))
        else useFormError(form, err)
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