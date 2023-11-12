"use client"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface UserState {
  auth?: boolean | null
  is_signing_up?: boolean | null
  _id?: string | null
  email?: string | null
  username?: string | null
  password?: string | null
  display_name?: string | null
  pfp?: string | null
  token?: string | null
}

const initialState: UserState = {
  auth: null,
  is_signing_up: null,
  _id: null,
  email: null,
  username: null,
  password: null,
  display_name: null,
  pfp: null,
  token: null
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      if(typeof action.payload.auth !== undefined) state.auth = action.payload.auth
      if(typeof action.payload.is_signing_up !== undefined) state.is_signing_up = action.payload.is_signing_up
      if(typeof action.payload.email !== undefined) state.email = action.payload.email
      if(typeof action.payload.password !== undefined) state.password = action.payload.password
      if(typeof action.payload.token !== undefined) state.token = action.payload.token
    }
  }
})

export const { setUser } = userSlice.actions
export default userSlice.reducer