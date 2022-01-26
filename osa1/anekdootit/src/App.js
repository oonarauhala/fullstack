import React, { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]

  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Uint8Array(7))

  const pickAnecdote = () => {
    setSelected(Math.floor(Math.random() * 7))
  }

  const voteAnecdote = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <Points selected={selected} points={points} />
      <Button handleClick={pickAnecdote} text="Next anecdote" />
      <Button handleClick={voteAnecdote} text="Vote" />
      <br />
      <h1>Anecdote with the most votes</h1>
      <BestAnecdote points={points} anecdotes={anecdotes} />

    </div>
  )
}

const BestAnecdote = ({ points, anecdotes }) => {
  const max = Math.max(...points)
  const maxIndex = points.indexOf(max)
  return (
    <>
      <p>
        {anecdotes[maxIndex]}
      </p>
      <p>Has {max} points</p>
    </>

  )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Points = ({ selected, points }) => (
  <p>
    Has {points[selected]} points
  </p>
)

export default App