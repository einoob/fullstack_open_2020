import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>{text}</button>
)

const Mostpopular = ( {anecdotes, votes} ) => {
  if (Math.max(...votes) === 0) {
    return (
      <div>no votes given</div>
    )
  }
  return (
    <div>
      {anecdotes[votes.indexOf(Math.max(...votes))]}<br/>
      has {Math.max(...votes)} votes
    </div>
  )
}

const App = (props) => {
  const getRandomInt = (max) => (
    Math.floor(Math.random() * Math.floor(max))
  )

  const [selected, setSelected] = useState(getRandomInt(6))
  const [votes, setVotes] = useState([0, 0, 0, 0, 0, 0])

  const randomIndex = () => {
    setSelected(getRandomInt(6))
  }

  const increaseVotes = () => {
    const copy = [...votes]
    copy[selected] += 1
    return (
    setVotes(copy)
    )
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{props.anecdotes[selected]}</p>
      has {votes[selected]} votes<br/>
      <Button onClick={increaseVotes} text='vote' />
      <Button onClick={randomIndex} text='next anecdote' />
      <h1>Anecdote with most votes</h1>
      <Mostpopular anecdotes={props.anecdotes} votes={votes} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]


ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
