import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

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
        name: newName
      }
      setPersons(persons.concat(person))
      setNewName('')
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Persons persons={persons} />
    </div>
  )
}

const Persons = ({ persons }) => {
  const result = persons.map(person =>
    <div key={person.name}>
      <p>{person.name}</p>
    </div>
  )
  return (
    <>
      {result}
    </>
  )
}

export default App