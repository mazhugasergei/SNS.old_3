"use client"
import { Settings } from "@/interfaces/Settings"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface UserState {
  auth?: boolean | null
  is_signing_up?: boolean | null
  email?: string | null
  username?: string | null
  fullname?: string | null
  bio?: string | null
  pfp?: string | null
  settings?: Settings | null
  created?: string | null
}

const initialState: UserState = {
  auth: null,
  is_signing_up: null,
  email: null,
  username: null,
  fullname: null,
  bio: null,
  pfp: null,
  settings: null,
  created: null
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      if(action.payload.auth !== undefined){
        state.auth = action.payload.auth
        if(state.auth === false){
          state.is_signing_up = null
          state.email = null
          state.username = null
          state.fullname = null
          state.bio = null
          state.pfp = null
          state.settings = null
          state.created = null
        }
      }
      if(action.payload.is_signing_up !== undefined) state.is_signing_up = action.payload.is_signing_up
      if(action.payload.email !== undefined) state.email = action.payload.email
      if(action.payload.username !== undefined) state.username = action.payload.username
      if(action.payload.fullname !== undefined) state.fullname = action.payload.fullname
      if(action.payload.bio !== undefined) state.bio = action.payload.bio
      if(action.payload.pfp !== undefined) state.pfp = action.payload.pfp
      if(action.payload.settings !== undefined) state.settings = action.payload.settings
      if(action.payload.created !== undefined) state.created = action.payload.created
    }
  }
})

export const { setUser } = userSlice.actions
export default userSlice.reducer