"use client"
import { UserType } from "@/types/User"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

const initialState: UserType = {}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserType>) => {
      if(action.payload.auth !== undefined){
        state.auth = action.payload.auth
        if(action.payload.auth === false){
          state.is_signing_up = undefined
          state._id = undefined
          state.email = undefined
          state.username = undefined
          state.fullname = undefined
          state.bio = undefined
          state.pfp = undefined
          state.private_email = undefined,
          state.created = undefined
        }
      }
      if(action.payload.is_signing_up !== undefined) state.is_signing_up = action.payload.is_signing_up
      if(action.payload._id !== undefined) state._id = action.payload._id
      if(action.payload.email !== undefined) state.email = action.payload.email
      if(action.payload.username !== undefined) state.username = action.payload.username
      if(action.payload.fullname !== undefined) state.fullname = action.payload.fullname
      if(action.payload.bio !== undefined) state.bio = action.payload.bio
      if(action.payload.pfp !== undefined) state.pfp = action.payload.pfp
      if(action.payload.private_email !== undefined) state.private_email = action.payload.private_email
      if(action.payload.created !== undefined) state.created = action.payload.created
    }
  }
})

export const { setUser } = userSlice.actions
export default userSlice.reducer