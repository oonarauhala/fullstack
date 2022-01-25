import React, { useState } from 'react'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => setGood(good + 1)
  const handleNeutral = () => setNeutral(neutral + 1)
  const handleBad = () => setBad(bad + 1)

  return (
    <div>
      <Title title={"Give feedback"} />
      <Button handleClick={handleGood} text={"Good"} />
      <Button handleClick={handleNeutral} text={"Neutral"} />
      <Button handleClick={handleBad} text={"Bad"} />
      <Title title={"Statistics"} />
      <Statistics title={"Good"} amount={good} />
      <Statistics title={"Neutral"} amount={neutral} />
      <Statistics title={"Bad"} amount={bad} />
      <Statistics title={"All"} amount={good + bad + neutral} />
      <Statistics title={"Average"} amount={(good * 1 + bad * (-1)) / (good + neutral + bad)} />
      <Statistics title={"Positive"} amount={good / (good + neutral + bad)} />
    </div>
  )
}

const Title = ({ title }) => <h1>{title}</h1>

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistics = ({ title, amount }) => (
  <>
    <p>{title} {amount}</p>
  </>
)

export default App