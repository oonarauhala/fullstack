import { useParams } from 'react-router-dom'

const Anecdote = ({ anecdotes }) => {
  const id = useParams().id
  const anecdote = anecdotes.find(a => a.id === Number(id))
  return (
  <div>
    <h2>{anecdote.content}</h2>
    <div>has {anecdote.votes} votes</div>
    <div>for more info <a href={anecdote.info}>{anecdote.info}</a></div>
    <p></p>
  </div>
  )
}
  
export default Anecdote