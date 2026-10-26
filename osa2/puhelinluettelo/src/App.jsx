import { useState } from 'react'
import Name from './components/Name'

const App = () => {
  const [persons, setPersons] = useState([
    { content: 'Arto Hellas', id: '1' }
  ]) 
  const [newName, setNewName] = useState('')

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      content: newName,
      id: String(persons.length + 1),
    }

    setPersons(persons.concat(nameObject))
    setNewName('')
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const namesToShow = persons
  
  return (
    <div>
      <h2>Phonebook</h2>
      <div>
      </div>
      <form onSubmit={addName}>
        <input
        value={newName}
        onChange={handleNameChange}
        /> <br />
        <button type="submit">add</button>
      </form>
    <h2>Numbers</h2>
      <div>
          {namesToShow.map(person => (
            <Name key={person.id} name={person.content} />
          ))}
      </div>
    </div>
  )

}

export default App