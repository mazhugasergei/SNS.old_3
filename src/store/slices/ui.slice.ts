"use client"
import { createSlice } from "@reduxjs/toolkit"

export interface UiState {
  menu_opened: boolean
}

const initialState: UiState = {
  menu_opened: false
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleMenuOpened: (state) => {
      state.menu_opened = !state.menu_opened
    }
  }
})

export const { toggleMenuOpened } = uiSlice.actions
export default uiSlice.reducer