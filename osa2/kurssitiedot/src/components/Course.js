import React from 'react'

const Part = (props) => {
	return (
	  <div>
		<p>{props.name} {props.number}</p>
	  </div>
	)
  }
  
  const Content = ({part}) => {
  
	return (
	  <div>
		<Part name={part.name} number={part.exercises}/>
	  </div>
	)
  }
  
  const Total = ({parts}) => {
	const exs = parts.map(nbr =>
	  nbr.exercises)
	const sum = exs.reduce((a,b) => a + b, 0)
	return (
	  <div>
		<strong>total of {sum} exercises</strong>
	  </div>
	)
  }
  
  const Course = ({course}) => {
	return (
	  <div>
		<h1>{course.name}</h1>
		{
		  course.parts.map(part =>
			<Content key={part.id} part={part}/>)
		}
		{
			<Total parts={course.parts}/>
		}
	  </div>
	)
  }

  export default Course