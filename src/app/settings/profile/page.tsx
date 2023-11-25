"use client"
import { RootState } from "@/store/store"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
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
import Avatar from "@/app/(main)/components/Avatar"
import { toast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"
import update_profile from "@/actions/update_profile"
import { setUser } from "@/store/slices/user.slice"
import { LuCalendarDays, LuMail } from "react-icons/lu"
import { Label } from "@/components/ui/label"
import DeleteAccountDialog from "@/app/settings/components/DeleteAccountDialog"
import send_email_codes from "@/actions/send_email_codes"
import ChangeEmailDialog from "@/app/settings/components/ChangeEmailDialog"
import { UserType } from "@/types/User"
import useFormError from "@/hooks/useFormError"
import { Separator } from "@/components/ui/separator"
import useToastError from "@/hooks/useToastError"

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
  const private_email = useSelector((state: RootState) => state.user.private_email)
  const created = useSelector((state: RootState) => state.user.created)
  const [newPFP,  setNewPFP] = useState<typeof pfp>()
  const [loggedIn,  setLoggedIn] = useState(false)

  // redirect if not logged in
  useEffect(()=>{
    if(auth === false) router.push("/settings/log-in")
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
    // check which values are changed
    let newData: UserType = {}
    if(pfp !== newPFP) newData["pfp"] = newPFP
    if(username !== data.username) newData["username"] = data.username
    if(fullname !== data.fullname) newData["fullname"] = data.fullname
    if(bio !== data.bio) newData["bio"] = data.bio
    if(private_email !== data.private_email) newData["private_email"] = data.private_email

    // if changing email
    if(email !== data.email){
      await send_email_codes(username as string, email as string, data.email)
        .then(res => {
          if(res) document.getElementById("changeEmailDialogTrigger")?.click()
        })
        .catch(err => useFormError(form, err))
    }
    
    // update profile
    if(Object.keys(newData).length){
      const moddedData = {...newData, pfp: newPFP as string | undefined}
      await update_profile(username as string, moddedData)
        .then(res => {
          if(res){
            toast({
              title: "Success.",
              description: "Changes were saved."
            })
            dispatch(setUser(moddedData))
          }
        })
      .catch(err => {
        if(err.message === "Error: ") useToastError(form.handleSubmit(onSubmit))
        useFormError(form, err)
      })
    }
  }

  return loggedIn ? (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* public view */}
          <div>
            {/* <h3 className="text-lg font-medium">Profile</h3>
            <p className="text-sm text-muted-foreground mb-4">This is how others will see you on the site.</p>
            <Separator className="my-6" /> */}
            <div className="contianer relative border rounded-lg p-10 shadow-sm mb-6">
              <Avatar src={newPFP as string} className="w-20 h-20 mb-3" />
              <p className="text-3xl font-bold">{ form.watch("fullname") !== undefined ? form.watch("fullname") : fullname }</p>
              <p className="opacity-[.75] text-sm">{ form.watch("username") !== undefined ? form.watch("username") : username }</p>
              <p className="my-2">{ form.watch("bio") !== undefined ? form.watch("bio") : bio }</p>
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
                  <FormDescription>
                    You can only change this once every 30 days.
                  </FormDescription>
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
            {/* private_email */}
            <FormField control={form.control} name="private_email" defaultValue={private_email as boolean}
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
            <div className="text-destructive space-y-3">
              <Label className="block">Account removal</Label>
              <Label htmlFor="deleteAccountDialog" className={`cursor-pointer block text-center ${buttonVariants({ variant: "destructive" })}`}>Delete account</Label>
            </div>
          </div>
          <div className="sticky bottom-0 bg-background rounded-tl-md rounded-tr-md pb-6">
            <Button className="w-full" disabled={form.formState.isSubmitting}>{ form.formState.isSubmitting ? <><ReloadIcon className="mr-2 h-4 w-4 animate-spin" />Saving</> : "Save changes" }</Button>
          </div>
        </form>
      </Form>
      <ChangeEmailDialog newEmail={form.watch("email")} />
      <DeleteAccountDialog />
    </>
  ) : <>loading...</>
}