"use client"
import { Button } from "@/components/ui/button"
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
import update_profile from "@/actions/update_profile"
import { LuCalendarDays, LuMail } from "react-icons/lu"
import { sendEmailsCodes } from "@/actions/sendEmailsCodes"
import ChangeEmailDialog from "@/app/settings/profile/components/ChangeEmailDialog"
import useFormError from "@/hooks/useFormError"
import useToastError from "@/hooks/useToastError"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { useState } from "react"
import { User } from "@/types/User"

export const FormClientComponent = ({ user }: { user: User }) => {
  const { email, username, fullname, bio, pfp, private_email, createdAt } = user
  const [newPFP,  setNewPFP] = useState(pfp)
  
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
    bio: z.string().max(160, { message: "Bio must contain at most 160 characters" }).optional(),
    private_email: z.boolean().optional()
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  })

  const handlePFPChange = (file: File) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => setNewPFP(String(reader.result))
  }

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    // check which values are changed
    let newData: {
      pfp?: string
      username?: string
      fullname?: string
      bio?: string
      private_email?: boolean
    } = {
      // username: undefined
    }
    if(pfp !== newPFP) newData["pfp"] = newPFP
    if(username !== data.username) newData["username"] = data.username
    if(fullname !== data.fullname) newData["fullname"] = data.fullname
    if(bio !== data.bio) newData["bio"] = data.bio
    if(private_email !== data.private_email) newData["private_email"] = data.private_email

    // if changing email
    if(email !== data.email){
      await sendEmailsCodes(username, email, data.email)
        .then(res => {
          if(res) document.getElementById("changeEmailDialogTrigger")?.click()
        })
        .catch(err => useFormError(form, err))
    }
    
    // update profile
    if(Object.keys(newData).length){
      const moddedData = {...newData, pfp: newPFP || null}
      await update_profile(username as string, moddedData)
        .then(res => res && toast({
          title: "Success.",
          description: "Changes were saved."
        }))
      .catch(err => {
        if(err.message === "Error: ") useToastError(form.handleSubmit(onSubmit))
        useFormError(form, err)
      })
    }
  }

  return <>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* public view */}
        <div className="contianer relative border rounded-lg shadow-sm px-12 py-4 pb-6">
          <AspectRatio ratio={112400 / 37466} className="bg-border rounded-lg -mx-8">
            {/* <Image src={} /> */}
          </AspectRatio>
          <Avatar src={newPFP as string} className="w-[8.40625rem] h-[8.40625rem] border-4 border-background mb-3 -mt-[4.203125rem]" />
          <p className="text-3xl font-bold">{ form.watch("fullname") !== undefined ? form.watch("fullname") : fullname }</p>
          <p className="opacity-70 text-sm">@{ form.watch("username") !== undefined ? form.watch("username") : username }</p>
          <p className="text-sm my-1">{ form.watch("bio") !== undefined ? form.watch("bio") : bio }</p>
          { !(form.watch("private_email") !== undefined ? form.watch("private_email") : private_email) &&
            <a href={`mailto:${form.watch("email") !== undefined ? form.watch("email") : email}`} className="inline-flex items-center gap-1 text-sm hover:underline opacity-70">
              <LuMail />
              { form.getValues("email") !== undefined ? form.getValues("email") : email }
            </a>
          }
          { createdAt && <p className="flex items-center gap-1 opacity-70 text-sm"><LuCalendarDays /> Joined on { new Date(createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) }</p> }
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
                    <Button type="button" variant="outline" onClick={() => setNewPFP("")}>Remove picture</Button>
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
        </div>
        <div className="sticky bottom-0 bg-background rounded-tl-md rounded-tr-md pb-6">
          <Button className="w-full" disabled={form.formState.isSubmitting}>{ form.formState.isSubmitting ? <><ReloadIcon className="mr-2 h-4 w-4 animate-spin" />Saving</> : "Save changes" }</Button>
        </div>
      </form>
    </Form>
    
    {/* dialogs */}
    <ChangeEmailDialog newEmail={form.watch("email")} />
  </>
}