"use client"
import { configureStore } from "@reduxjs/toolkit"
import uiReducer from "./slices/ui.slice"
import userReducer from "./slices/user.slice"

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    user: userReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch