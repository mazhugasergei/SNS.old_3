"use client"
import { ToastAction } from "@/components/ui/toast"
import { toast } from "@/components/ui/use-toast"

export default (formSubmit: () => void) => toast({
  variant: "destructive",
  title: "Uh oh! Something went wrong.",
  description: "There was a problem with your request.",
  action: <ToastAction altText="Try again" onClick={formSubmit}>Try again</ToastAction>,
})