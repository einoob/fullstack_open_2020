import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Personform from './components/Personform'
import Filterform from './components/Filterform'
import Persons from './components/Persons'

const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ filter, setFilter] = useState('')

  useEffect(() => {
    axios
    .get('http://localhost:3001/persons')
    .then(response => {
      console.log('promise fulfilled')
      setPersons(response.data)
    })
  }, [])
	
	const addPerson = (event) => {
		event.preventDefault()
		const newObj = {
      name: newName,
      number: newNumber
    }
    console.log(newName); //remove later
    if (persons.map(person =>
      person.name).includes(newName)) {
      alert(`${newName} is already added to phonebook`)
      setNewName('')
      setNewNumber('')
    }
    else {
		  setPersons(persons.concat(newObj))
      setNewName('')
      setNewNumber('')
    }
  }
  
  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    event.preventDefault()
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Personform addPerson={addPerson} newName={newName}
      newNumber={newNumber} handleNewName={handleNewName} handleNewNumber={handleNewNumber}/>
      <br/>
      <Filterform value={filter} onChange={handleFilter}/>
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} />
    </div>
  )
}

export default App
