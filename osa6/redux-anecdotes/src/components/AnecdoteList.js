import { useSelector, useDispatch } from 'react-redux'
import { likeAnecdote } from '../reducers/anecdoteReducer'
import { createNotification, removeNotification } from '../reducers/notificationReducer'

const AnecdoteList = props => {
  const dispatch = useDispatch()

  const anecdotes = useSelector(state => {
    const query = state.filter
    const filteredAnecdotes = state.anecdotes.filter(anecdote => 
      anecdote.content.toLowerCase().indexOf(query.toLowerCase()) !== -1)
    const sortedAnecdotes = filteredAnecdotes.sort((first, second) => 
      (first.votes > second.votes) ? -1 : 1)
    return sortedAnecdotes
  })

  const vote = anecdote => {
    dispatch(likeAnecdote(anecdote.id))
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
