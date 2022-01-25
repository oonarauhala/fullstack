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
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

const Title = ({ title }) => <h1>{title}</h1>

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistics = ({ good, neutral, bad }) => {
  if (good + bad + neutral === 0) {
    return (
      <>
        <p>No feedback given yet</p>
      </>
    )
  }
  return (
    <>
      <StatisticLine title="Good" amount={good} />
      <StatisticLine title="Neutral" amount={neutral} />
      <StatisticLine title="Bad" amount={bad} />
      <StatisticLine title="All" amount={good + neutral + bad} />
      <StatisticLine title="Average" amount={(good - bad) / (good + neutral + bad)} />
      <StatisticLine title="Positive" amount={good / (good + neutral + bad)} />
    </>
  )
}

const StatisticLine = ({ title, amount }) => (
  <>
    <p>{title} {amount}</p>
  </>
)

export default App