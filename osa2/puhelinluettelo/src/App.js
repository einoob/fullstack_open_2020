import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Personform from './components/Personform'
import Filterform from './components/Filterform'
import Persons from './components/Persons'
import Notification from './components/Notification'
import Errormessage from './components/Errormessage'
import contactService from './services/contactService'


const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ filter, setFilter] = useState('')
  const [ message, setMessage] = useState(null)
  const [ errorMessage, setErrormessage] = useState(null)

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
      number: newNumber,
    }
    console.log(newName)
    if (persons.map(person =>
      person.name.toLowerCase()).includes(newName.toLowerCase())) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const contact = persons.find(p => p.name.toLowerCase() === newName.toLowerCase())
        console.log('old', contact)
        const changedContact = {...contact, name: newName, number: newNumber}
        console.log('new', changedContact)   
        contactService
        .update(changedContact.id, changedContact)
        .then((returnedContact) => {
          setPersons(persons.map(p => p.name.toLowerCase() === changedContact.name.toLowerCase() ? returnedContact : p))
          setMessage(`Added ${changedContact.name}`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
        .catch(error => {
          setErrormessage(`Information of '${changedContact.name}' has already been removed`)
          setPersons(persons.filter(p => p.id !== changedContact.id))
          setTimeout(() => {
            setErrormessage(null)
          }, 5000)
        })
      }
      else {
        contactService
        .getAll()
        .then(list => {
          setPersons(list)
        })
      }
      setNewName('')
      setNewNumber('')
    }
    else {
      contactService.create(newObj)
      .then(newContact => {
        setPersons(persons.concat(newContact))
        setNewName('')
        setNewNumber('')
      })
      setMessage(`Added ${newObj.name}`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
    }
  }

  const removeContact = ({person}) => {
    console.log('person data', person.name)
    const id = person.id

    if (window.confirm(`Delete ${person.name}?`)){
      contactService
      .remove(person)
      .then(() => {
        setPersons(persons.filter(p => p.id !== id))
    })}
    else {
      contactService
      .getAll()
      .then(list => {
        setPersons(list)
      })
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
      <Notification message={message} />
      <Errormessage errorMessage={errorMessage} />
      <Personform addPerson={addPerson} newName={newName}
      newNumber={newNumber} handleNewName={handleNewName} handleNewNumber={handleNewNumber}/>
      <br/>
      <Filterform value={filter} onChange={handleFilter}/>
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} removeContact={removeContact} />
    </div>
  )
}

export default App
