import React from 'react'

const Person = ({person, filter}) => {
  if (person.name.toLowerCase().includes(filter.toLowerCase())
  || person.number.toLowerCase().includes(filter.toLowerCase())) {
  return (
    <li>{person.name}: {person.number}</li>
  )
  }
  return ('')
}

const Persons = ({persons, filter}) => {
  return (
    <ul>
    {persons.map(person =>
      <Person key={person.name}
      person={person} filter={filter} />)}
  </ul>
  )
}

export default Persons