import { useState } from 'react'
import Person from './components/Person'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')
  const [nameIsInList, setNameIsInList] = useState(false)
  
  const addName = (event) => {
    event.preventDefault()

    if (persons.some(person => person.name === newName)) {
      setNameIsInList(true)
      alert(`${newName} is already added to phonebook`)
      setNewName('')
      return;
    }

    const nameObject = {
      id: persons.length + 1,
      name: newName,
    }

    setPersons(persons.concat(nameObject))
    setNewName('')
    setNameIsInList(false)
  }

  const handlePersonChange = (event) => {
    setNewName(event.target.value)
    setNameIsInList(false)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handlePersonChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  
      <h2>Numbers</h2>
      <ul>
        {persons.map(person =>
          <Person key={person.id} person={person} />
        )}
      </ul>
    </div>
  )
}

export default App
