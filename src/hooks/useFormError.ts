import { UseFormReturn } from "react-hook-form"
import * as z from "zod"

export default (form: UseFormReturn<z.infer<any>>, err: Error) => {
  const error = err.message.replace("Error: ", "")
  const errType = error.substring(1, error.indexOf("]: "))
  const errMessage = error.substring(error.indexOf("]: ")+3)
  form.setError(errType as string, { type: "server", message: errMessage })
}