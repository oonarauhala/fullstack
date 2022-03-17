import { connect } from 'react-redux'
import { likeAnecdote } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'

const AnecdoteList = props => {

  const vote = anecdote => {
    props.likeAnecdote(anecdote.id)
    props.notify(`You voted for '${anecdote.content}'`, 5000)
  }

  return (
    <div>
      {props.anecdotes.map(anecdote =>
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

const mapStateToProps = state => {    
  const query = state.filter
  const filteredAnecdotes = state.anecdotes.filter(anecdote => 
    anecdote.content.toLowerCase().indexOf(query.toLowerCase()) !== -1)
  const sortedAnecdotes = filteredAnecdotes.sort((first, second) => 
    (first.votes > second.votes) ? -1 : 1)
  return {
    anecdotes: sortedAnecdotes
  }
}

const mapDispatchToProps = {
  likeAnecdote, notify
}

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
  )(AnecdoteList)
export default ConnectedAnecdoteList
