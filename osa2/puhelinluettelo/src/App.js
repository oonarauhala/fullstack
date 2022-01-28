import React, { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  })

  const addPerson = (event) => {
    event.preventDefault()
    let foundName = false
    persons.forEach(person => {
      if (person.name === newName) {
        foundName = true
      }
    })
    if (foundName) {
      window.alert(`${newName} is already added to phonebook`)
    } else {
      const person = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(person))
      setNewName('')
      setNewNumber('')
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
      <Persons persons={persons} findPersons={findPersons} />
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

const Persons = ({ persons, findPersons }) => {
  const filteredPersons = findPersons(persons)
  const result = filteredPersons.map(person =>
    <div key={person.name}>
      <p>{person.name} {person.number}</p>
    </div>
  )
  return (
    <>
      {result}
    </>
  )
}

export default App