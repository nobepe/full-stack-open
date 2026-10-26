import { useState } from 'react'
import Name from './components/Name'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', id: '1' }
  ]) 
  const [newName, setNewName] = useState('')

  const addName = (event) => {
    // preventdef. estää lomakkeen lähetyksen oletusarvoisen toiminnan
    event.preventDefault()
    // trim poistaa turhat völilyönnit alusta ja lopusta, jotta
    // "juu" & "  juu" ei olisi eri nimiä
    const newname = newName.trim()
    const nameObject = {
      name: newname,
      id: String(persons.length + 1),
    }
    
    if (persons.some(person => person.name === newname)) {
      alert(`${newname} is already added to phonebook`)
    } else {
      setPersons(persons.concat(nameObject))
      setNewName('')
    }
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
            <Name key={person.id} name={person.name} />
          ))}
      </div>
    </div>
  )

}

export default App