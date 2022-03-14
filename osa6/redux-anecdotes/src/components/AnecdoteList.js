import { useSelector, useDispatch } from 'react-redux'
import { incrementLikes } from '../reducers/anecdoteReducer'
import { createNotification, removeNotification } from '../reducers/notificationReducer'

const AnecdoteList = props => {
  const dispatch = useDispatch()

  const anecdotes = useSelector(state => 
    state.anecdotes.sort((first, second) => 
    (first.votes > second.votes) ? -1 : 1))


  const vote = anecdote => {
    dispatch(incrementLikes(anecdote.id))
    dispatch(createNotification(`You voted for '${anecdote.content}'`))
    setTimeout(() => {dispatch(removeNotification())}, 5000)
  }

  return (
    <div>
      {anecdotes.map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote)}>vote</button>
        </div>
      </div>
    )} 
    </div>
  )
}

export default AnecdoteList
