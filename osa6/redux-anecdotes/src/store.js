import { configureStore } from '@reduxjs/toolkit'
import anecdoteReducer, { appendAnecdote, setAnecdotes } from './reducers/anecdoteReducer.js'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'

const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    notification: notificationReducer,
    filter: filterReducer
  }
})

export default store