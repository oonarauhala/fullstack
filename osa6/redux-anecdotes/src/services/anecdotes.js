import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const object = {
    id: getId(),
    votes: 0,
    content
  }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const like = async id => {
  const anecdoteResponse = await axios.get(baseUrl + `/${id}`)
  const anecdote = anecdoteResponse.data
  const changedAnecdote = {
    ...anecdote,
    votes: anecdote.votes + 1
  }
  const response = await axios.put(baseUrl + `/${id}`, changedAnecdote)
  return response.data
}


export default { getAll, createNew, like }