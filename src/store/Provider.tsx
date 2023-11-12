"use client"
import { Provider, useDispatch } from "react-redux"
import { store } from "./store"
import is_auth from "@/actions/is_auth"
import { useEffect } from "react"
import { setUser } from "./slices/user.slice"

export default ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      { children }
    </Provider>
  )
}