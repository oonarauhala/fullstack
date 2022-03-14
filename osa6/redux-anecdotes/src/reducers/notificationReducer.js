import { createSlice } from '@reduxjs/toolkit'

const initialState = 'initial'

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    createNotification(state, action) {
      state = action.payload
    }
  }
})

export const { createNotification } = notificationSlice.actions
export default notificationSlice.reducer