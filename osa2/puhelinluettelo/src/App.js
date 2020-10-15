import React, { useState } from 'react'
import Personform from './components/Personform'
import Filterform from './components/Filterform'
import Persons from './components/Persons'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: '040-1231244'    
    },
    {
      name: 'Veikko Pilvi',
      number: '040-1000420'
    }
  ])

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ filter, setFilter] = useState('')
	
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
