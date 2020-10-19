import React from 'react'

const Person = ({person, filter, removeContact}) => {
  if (person.name.toLowerCase().includes(filter.toLowerCase())
  || person.number.toLowerCase().includes(filter.toLowerCase())) {
  return (
    <li>{person.name}: {person.number} <button onClick={() => removeContact(person={person})}>delete</button></li>
  )
  }
  return ('')
}

const Persons = ({persons, filter, removeContact}) => {
  return (
    <ul>
    {persons.map(person =>
      <Person key={person.name}
      person={person} filter={filter}
      removeContact={removeContact}
      />)}
  </ul>
  )
}

export default Persons