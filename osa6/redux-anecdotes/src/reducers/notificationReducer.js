import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    createNotification(state, action) {
      return action.payload
    },
    removeNotification(state, action) {
      return ''
    }
  }
})

export const notify = (message, duration) => {
  return async dispatch => {
    dispatch(createNotification(message))
    setTimeout(() => {dispatch(removeNotification())}, duration)
  }
}

export const { createNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer