import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')

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
    console.log(newName)
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
      <p>
        filter shown with <input value={nameFilter} onChange={handleFilterChange} />
      </p>
      <h2>Add new entry</h2>
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
      <h2>Numbers</h2>
      <Persons persons={persons} findPersons={findPersons} />
    </div>
  )
}

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