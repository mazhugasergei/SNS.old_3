"use client"
import { RootState } from "@/store/store"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Button, buttonVariants } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Switch } from "@/components/ui/switch"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ReloadIcon } from "@radix-ui/react-icons"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Avatar from "@/components/Avatar"
import { toast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"
import update_profile from "@/actions/update_profile"
import { setUser } from "@/store/slices/user.slice"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { LuCalendarDays, LuMail } from "react-icons/lu"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import DeleteAccountDialog from "@/components/DeleteAccountDialog"

const formSchema = z.object({
  pfp: z.string().optional(),
  email: z.string().max(50),
  username: z.string()
    .min(2, { message: "Username must be at least 2 characters" })
    .max(50, { message: "Username must contain at most 50 characters" })
    .refine(value =>
      value !== "log-in" &&
      value !== "sign-up" &&
      value !== "verification" &&
      value !== "messages" &&
      value !== "settings",
      { message: "Invalid username" }
    ),
  fullname: z.string().min(2, { message: "Full Name must be at least 2 characters" }).max(50, { message: "Full Name must contain at most 50 characters" }),
  bio: z.string().max(999, { message: "Bio must contain at most 999 characters" }).optional(),
  private_email: z.boolean().optional()
})

export default () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const auth = useSelector((state: RootState) => state.user.auth)
  const pfp = useSelector((state: RootState) => state.user.pfp)
  const email = useSelector((state: RootState) => state.user.email)
  const username = useSelector((state: RootState) => state.user.username)
  const fullname = useSelector((state: RootState) => state.user.fullname)
  const bio = useSelector((state: RootState) => state.user.bio)
  const private_email = useSelector((state: RootState) => state.user.settings?.private_email)
  const created = useSelector((state: RootState) => state.user.created)
  const settings = useSelector((state: RootState) => state.user.settings)
  const [newPFP,  setNewPFP] = useState<typeof pfp>()
  const [loggedIn,  setLoggedIn] = useState(false)
  const emailDialogRef = useRef<HTMLButtonElement>(null)

  // redirect if not logged in
  useEffect(()=>{
    if(auth === false) router.push("/settings/appearance")
    else if(auth) setLoggedIn(true)
  }, [auth])

  useEffect(() => {
    setNewPFP(pfp)
  }, [pfp])

  const handlePFPChange = (file: File) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => setNewPFP(String(reader.result))
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const toastError = () => toast({
      variant: "destructive",
      title: "Uh oh! Something went wrong.",
      description: "There was an error saving the changes.",
      action: <ToastAction altText="Try again" onClick={form.handleSubmit(onSubmit)}>Try again</ToastAction>
    })
    
    const updateProfile = async (data: z.infer<typeof formSchema>) => {
      await update_profile(username as string, data)
        .then((res) => {
          if(res){
            toast({
              title: "Success.",
              description: res ? "Changes were saved." : "There was an error saving the changes."
            })
            dispatch(setUser(data))
          }
          else toastError()
        })
      .catch(err => {
        toastError()
        const error = err.message.replace("Error: ", "")
        const errType = error.substring(1, error.indexOf("]: "))
        const errMessage = error.substring(error.indexOf("]: ")+3)
        form.setError(errType, { type: "server", message: errMessage })
      })
    }

    // if changing email
    if(email !== data.email) emailDialogRef.current?.click()
    else updateProfile({...data, pfp: newPFP as string | undefined})
  }

  return loggedIn ? (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* public view */}
          <div>
            <h3 className="text-lg font-medium mb-4">Public view</h3>
            <div className="contianer relative border rounded-lg p-10 shadow-sm mb-6">
              <Avatar src={newPFP as string} className="w-20 h-20 mb-3" />
              <p className="text-3xl font-bold">{ form.watch("fullname") !== undefined ? form.watch("fullname") : fullname }</p>
              <p className="opacity-[.75] text-sm">{ form.watch("username") !== undefined ? form.watch("username") : username }</p>
              <p className="max-w-[44rem] my-2">{ form.watch("bio") !== undefined ? form.watch("bio") : bio }</p>
              { !(form.watch("private_email") !== undefined ? form.watch("private_email") : private_email) &&
                <p className="opacity-[.75] text-sm">
                  <a href={`mailto:${form.watch("email") !== undefined ? form.watch("email") : email}`} className="flex items-center gap-1">
                    <LuMail />
                    { form.getValues("email") !== undefined ? form.getValues("email") : email }
                  </a>
                </p>
              }
              { created && <p className="flex items-center gap-1 opacity-[.75] text-sm"><LuCalendarDays /> Joined on { new Date(created).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) }</p> }
            </div>
          </div>

          {/* settings */}
          <div className="space-y-4">
            <h3 className="mb-4 text-lg font-medium">Profile settings</h3>
            {/* pfp */}
            <FormField control={form.control} name="pfp" defaultValue=""
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Profile picture</FormLabel>
                  <FormControl>
                    <div className="flex flex-wrap gap-2">
                      <Avatar src={newPFP as string} className="w-[2.25rem] h-[2.25rem]" />
                      <Input id="pfpInput" className="hidden" type="file" {...field} onChange={e => e.target.files && handlePFPChange(e.target.files[0])} />
                      <Button type="button" variant="outline" onClick={() => document.getElementById("pfpInput")?.click()}>Choose picture</Button>
                      <Button type="button" variant="outline" onClick={() => setNewPFP(undefined)}>Remove picture</Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* fullname */}
            <FormField control={form.control} name="fullname" defaultValue={fullname || ""}
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Fullname</FormLabel>
                    <FormControl>
                      <Input placeholder="John Smith" {...field} required />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />
            {/* username */}
            <FormField control={form.control} name="username" defaultValue={username || ""}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="johnsmith" type="username" {...field} required />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* bio */}
            <FormField control={form.control} name="bio" defaultValue={bio || ""}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Tell us a little about yourself (optional)." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* email */}
            <FormField control={form.control} name="email" defaultValue={email || ""}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="johnsmith@example.com" type="email" {...field} required />
                  </FormControl>
                  <FormMessage>{form.formState.errors.email?.message}</FormMessage>
                </FormItem>
              )}
            />
            {/* email confirm */}
            <Dialog>
              <DialogTrigger ref={emailDialogRef} className="hidden">Open</DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Changing Email</DialogTitle>
                  <DialogDescription>For security reasons in order to change the email address you have to provide two codes: one is sent to your current email address, another is sent to the new one. Please, enter them both below.</DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
            {/* private_email */}
            <FormField control={form.control} name="private_email" defaultValue={settings?.private_email as boolean}
              render={({ field }) => (
                <FormItem className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
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
              )}
            />
            {/* danger zone */}
            {/* <Separator /> */}
            <div className="container text-destructive space-y-2 bg-destructive/[.1] rounded-lg p-4">
              <Label>Danger zone</Label>
              <Label htmlFor="deleteAccountDialog" className={`cursor-pointer block w-full text-center ${buttonVariants({ variant: "destructive" })}`}>Delete account</Label>
            </div>
            {/* <Separator /> */}
          </div>
          <div className="sticky bottom-0 bg-background rounded-tl-md rounded-tr-md pb-6" style={{ marginBottom: "-1.5rem" }}>
            <Button className="w-full" disabled={form.formState.isSubmitting}>{ form.formState.isSubmitting ? <><ReloadIcon className="mr-2 h-4 w-4 animate-spin" />Saving</> : "Save changes" }</Button>
          </div>
        </form>
      </Form>
      <DeleteAccountDialog />
    </>
  ) : <>loading...</>
}