"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/components/ui/use-toast"
import { useTheme } from "next-themes" 
import { Separator } from "@/components/ui/separator"

export default () => {
  const { theme, setTheme } = useTheme()

  const FormSchema = z.object({
    dark_theme: z.boolean()
  })

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      dark_theme: theme === "dark" ? true : false
    }
  })

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    toast({
      title: "Changes were saved",
      description: (
        <div>Niceeeeee!</div>
      )
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* <div>
          <h3 className="text-lg font-medium">Appearance</h3>
          <p className="text-sm text-muted-foreground">Customize the appearance of the app.</p>
          <Separator className="my-6" />
        </div> */}

        {/* dark theme */}
        <FormField control={form.control} name="dark_theme"
          render={({ field }) => {
            return (
              <FormItem className="flex items-center justify-between rounded-lg border p-3 shadow-sm" onChange={() => setTheme(field.value ? "dark" : "light")}>
                <div className="space-y-0.5">
                  <FormLabel>Dark theme</FormLabel>
                  <FormDescription>
                    Make the interface appear in dark colors.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )
          }}
        />
        {/* <Button>Submit</Button> */}
      </form>
    </Form>
  )
}
