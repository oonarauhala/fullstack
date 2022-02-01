import React, { useEffect, useState } from 'react'
import axios from 'axios'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    let foundName = false
    let foundId = -1
    persons.forEach(person => {
      if (person.name === newName) {
        foundName = true
        foundId = person.id
      }
    })
    if (foundName) {
      if (window.confirm(`${newName} is already added to the phonebook, replace old number with a new one?`)) {
        const person = {
          name: newName,
          number: newNumber
        }
        setNewName('')
        setNewNumber('')
        personService
          .update(foundId, person)
          .then(returnedPerson => {
            setPersons(persons.map(personInMap => personInMap.id !== foundId ? personInMap : returnedPerson))
          })
      }
    } else {
      const person = {
        name: newName,
        number: newNumber
      }
      setNewName('')
      setNewNumber('')
      personService
        .create(person)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
        })
        .catch(error => {
          console.log("Error")
        })
    }
  }

  const deletePerson = person => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService.drop(person.id)
        .then(
          setPersons(persons.filter(oldPerson => oldPerson.id !== person.id))
        )
    }
  }

  const findPersons = () => {
    const result = []
    persons.forEach(person => {
      if (person.name.toLowerCase().includes(nameFilter.toLowerCase())) {
        result.push(person)
      }
    })
    return result
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNameFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter nameFilter={nameFilter} handleFilterChange={handleFilterChange} />
      <h2>Add new entry</h2>
      <NewEntry addPerson={addPerson} handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        newName={newName} newNumber={newNumber} />
      <h2>Numbers</h2>
      <Persons persons={persons} findPersons={findPersons} deletePerson={deletePerson} />
    </div>
  )
}

const Filter = ({ nameFilter, handleFilterChange }) => (
  <p>
    filter shown with <input value={nameFilter} onChange={handleFilterChange} />
  </p>
)

const NewEntry = ({ addPerson, handleNameChange, handleNumberChange, newName, newNumber }) => (
  <form onSubmit={addPerson}>
    <div>
      name: <input value={newName} onChange={handleNameChange} />
    </div>
    <div>
      number: <input value={newNumber} onChange={handleNumberChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)

const Persons = ({ persons, findPersons, deletePerson }) => {
  const filteredPersons = findPersons(persons)
  const result = filteredPersons.map(person =>
    <div key={person.name}>
      {person.name} {person.number}
      <button onClick={() => deletePerson(person)}>Delete</button>
    </div>
  )
  return (
    <>
      {result}
    </>
  )
}

export default App