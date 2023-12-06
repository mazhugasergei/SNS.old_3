"use client"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Switch } from "@/components/ui/switch"
import * as zod from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ReloadIcon } from "@radix-ui/react-icons"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Avatar from "@/app/(main)/components/Avatar"
import { updateProfile } from "@/actions/updateProfile"
import { LuCalendarDays, LuMail } from "react-icons/lu"
import { useFormError } from "@/hooks/useFormError"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { useState } from "react"
import { User } from "@/types/User"
import { useChangesSuccess } from "@/hooks/useChangesSuccess"

export const FormClientComponent = ({ user }: { user: User }) => {
  const { _id, email, username, fullname, bio, pfp, private_email, createdAt } = user
  const [newPFP,  setNewPFP] = useState(pfp)
  
  const formSchema = zod.object({
    pfp: zod.string()
      .optional(),
    email: zod.string()
      .min(3, { message: "Email must be at least 3 characters" })
      .max(50, { message: "Email must contain at most 50 characters" }),
    username: zod.string()
      .min(2, { message: "Username must be at least 2 characters" })
      .max(50, { message: "Username must contain at most 50 characters" })
      .refine(value =>
        value !== "log-in" &&
        value !== "sign-up" &&
        value !== "verification" &&
        value !== "messages" &&
        value !== "settings" &&
        value !== "post" &&
        !value.includes("/"),
        { message: "Invalid username" }
      ),
    fullname: zod.string()
      .min(2, { message: "Fullname must be at least 2 characters" })
      .max(50, { message: "Fullname must contain at most 50 characters" }),
    bio: zod.string()
      .max(160, { message: "Bio must contain at most 160 characters" })
      .optional(),
    private_email: zod.boolean()
  })

  const form = useForm<zod.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: fullname || "",
      username: username || "",
      bio: bio || "",
      email: email || "",
      private_email: private_email
    }
  })

  const handlePFPChange = (file: File) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => setNewPFP(String(reader.result))
  }

  const onSubmit = async (data: zod.infer<typeof formSchema>) => {
    await updateProfile(_id, {_id, createdAt, ...data, pfp: newPFP})
      .then(res => res.ok && useChangesSuccess())
      .catch(err => useFormError(form, err, onSubmit))
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* public view */}
        <div className="contianer relative border rounded-xl shadow-sm px-6 py-2 pb-3 sm:px-12 sm:py-4 sm:pb-6">
          <AspectRatio ratio={112400 / 37466} className="bg-border rounded-lg -mx-4 sm:-mx-8">
            {/* <Image src={} /> */}
          </AspectRatio>
          <Avatar src={newPFP as string} className="w-[20vw] h-[20vw] sm:w-[8.40625rem] sm:h-[8.40625rem] border-4 border-background mb-3 -mt-[calc(20vw/2)] md:-mt-[4.203125rem]" />
          <p className="text-2xl sm:text-3xl font-bold">{ form.watch("fullname") !== undefined ? form.watch("fullname") : fullname }</p>
          <p className="opacity-70 text-sm">@{ form.watch("username") !== undefined ? form.watch("username") : username }</p>
          <p className="text-sm my-1">{ form.watch("bio") !== undefined ? form.watch("bio") : bio }</p>
          { !(form.watch("private_email") !== undefined ? form.watch("private_email") : private_email) &&
            <a href={`mailto:${form.watch("email") !== undefined ? form.watch("email") : email}`} className="inline-flex items-center gap-1 text-sm hover:underline opacity-70">
              <LuMail />
              <span className="break-all">{ form.getValues("email") !== undefined ? form.getValues("email") : email }</span>
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
                    <Button type="button" variant="outline" onClick={() => setNewPFP(undefined)}>Remove picture</Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* fullname */}
          <FormField control={form.control} name="fullname"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Fullname</FormLabel>
                  <FormControl>
                    <Input placeholder="John Smith" {...field} />
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
          <FormField control={form.control} name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="johnsmith" type="username" {...field} />
                </FormControl>
                <FormDescription>
                  You can only change this once every 30 days.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* bio */}
          <FormField control={form.control} name="bio"
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
          <FormField control={form.control} name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="johnsmith@example.com" type="email" {...field} />
                </FormControl>
                <FormMessage>{form.formState.errors.email?.message}</FormMessage>
              </FormItem>
            )}
          />
          {/* private_email */}
          <FormField control={form.control} name="private_email"
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
  )
}