import { useSelector, useDispatch } from 'react-redux'
import { incrementLikes } from '../reducers/anecdoteReducer'

const AnecdoteList = props => {
  const dispatch = useDispatch()

  const anecdotes = useSelector(state => 
    state.sort((first, second) => 
    (first.votes > second.votes) ? -1 : 1))


  const vote = id => {
    dispatch(incrementLikes(id))
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
          <button onClick={() => vote(anecdote.id)}>vote</button>
        </div>
      </div>
    )} 
    </div>
  )
}

export default AnecdoteList
