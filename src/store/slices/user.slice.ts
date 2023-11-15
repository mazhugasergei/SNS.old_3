"use client"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface UserState {
  auth?: boolean | null
  is_signing_up?: boolean | null
  email?: string | null
  username?: string | null
  fullname?: string | null
  bio?: string | null
  pfp?: string | null
  created?: string | null
  token?: string | null
}

const initialState: UserState = {
  auth: null,
  is_signing_up: null,
  email: null,
  username: null,
  fullname: null,
  bio: null,
  pfp: null,
  created: null,
  token: null
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      if(typeof action.payload.auth !== undefined){
        state.auth = action.payload.auth
        if(state.auth === false){
          state.is_signing_up = null
          state.email = null
          state.username = null
          state.fullname = null
          state.bio = null
          state.pfp = null
          state.created = null
          state.token = null
        }
      }
      if(typeof action.payload.is_signing_up !== undefined) state.is_signing_up = action.payload.is_signing_up
      if(typeof action.payload.email !== undefined) state.email = action.payload.email
      if(typeof action.payload.username !== undefined) state.username = action.payload.username
      if(typeof action.payload.fullname !== undefined) state.fullname = action.payload.fullname
      if(typeof action.payload.bio !== undefined) state.bio = action.payload.bio
      if(typeof action.payload.pfp !== undefined) state.pfp = action.payload.pfp
      if(typeof action.payload.created !== undefined) state.created = action.payload.created
      if(typeof action.payload.token !== undefined) state.token = action.payload.token
    }
  }
})

export const { setUser } = userSlice.actions
export default userSlice.reducer