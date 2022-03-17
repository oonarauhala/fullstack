import { createSlice } from '@reduxjs/toolkit'

let timeoutID = 0
const initialState = ''

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    createNotification(state, action) {
      clearTimeout(timeoutID)
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
    timeoutID = setTimeout(() => {
      dispatch(removeNotification())
    }, duration)
  }
}

export const { createNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer