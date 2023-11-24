"use client"
import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"

export default ({ children, ...props }: ThemeProviderProps) => {
  return <NextThemesProvider {...props} defaultTheme={localStorage?.getItem("theme") || "light"}>{children}</NextThemesProvider>
}