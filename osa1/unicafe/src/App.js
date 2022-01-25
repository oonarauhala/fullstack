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
      <Statistic title={"Good"} amount={good} />
      <Statistic title={"Neutral"} amount={neutral} />
      <Statistic title={"Bad"} amount={bad} />
      <Statistic title={"All"} amount={good + bad + neutral} />
      <Statistic title={"Average"} amount={(good * 1 + bad * (-1)) / (good + neutral + bad)} />
      <Statistic title={"Positive"} amount={good / (good + neutral + bad)} />
    </div>
  )
}

const Title = ({ title }) => <h1>{title}</h1>

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistic = ({ title, amount }) => (
  <>
    <p>{title} {amount}</p>
  </>
)

export default App