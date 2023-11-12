"use client"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface UserState {
  auth?: boolean | null
  is_signing_up?: boolean | null
  email?: string | null
  username?: string | null
  fullname?: string | null
  pfp?: string | null
  token?: string | null
}

const initialState: UserState = {
  auth: null,
  is_signing_up: null,
  email: null,
  username: null,
  fullname: null,
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
      if(typeof action.payload.username !== undefined) state.username = action.payload.username
      if(typeof action.payload.fullname !== undefined) state.fullname = action.payload.fullname
      if(typeof action.payload.pfp !== undefined) state.pfp = action.payload.pfp
      if(typeof action.payload.token !== undefined) state.token = action.payload.token
    }
  }
})

export const { setUser } = userSlice.actions
export default userSlice.reducer