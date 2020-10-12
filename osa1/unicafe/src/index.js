import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>{text}</button>
)

const StatisticLine = ({text, value}) => {
  if (text === 'positive')
  {
    return (
      <div>{text} {value} %</div>
    )
  }
  return (
    <div>{text} {value}</div>
  )
}

const Statistics = ({stats}) => {
  if (stats.good === 0 && stats.bad === 0 && stats.neutral === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  return (
    <div>
      <StatisticLine text='good' value={stats.good} />
      <StatisticLine text='neutral' value={stats.neutral} />
      <StatisticLine text='bad' value={stats.bad} />
      <StatisticLine text='average'
      value={(stats.bad * -1 + stats.good) / stats.sum} />
      <StatisticLine text='positive' value={(stats.good / stats.sum * 100.0)} />
    </div>
  )
}


const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGood = () => {
    setGood(good + 1)
  }
  const increaseNeutral = () => {
    setNeutral(neutral + 1)
  }
  const increaseBad = () => {
    setBad(bad + 1)
  }

  const stats =  {
    good: good, neutral: neutral, bad: bad,
    sum: good + bad + neutral
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={increaseGood} text='good' />
      <Button onClick={increaseNeutral} text='neutral' />
      <Button onClick={increaseBad} text='bad' />
      <h2>statistics</h2>
      <Statistics stats={stats} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)