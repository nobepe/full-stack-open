import { useState } from 'react'
import Name from './components/Name'
import Number from './components/Number'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '123456789', id: '1' },
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addPerson = (event) => {
    // preventdef. estää lomakkeen lähetyksen oletusarvoisen toiminnan
    event.preventDefault()
    // trim poistaa turhat völilyönnit alusta ja lopusta, jotta
    // "juu" & "  juu" ei olisi eri nimiä
    const newname = newName.trim()
    const newnumber = newNumber.trim()

    const nameObject = {
      name: newname,
      number: newnumber,
      id: String(persons.length + 1),
    }
    
    // jos nro on annettu, tarkistetaan, et se on vaan nroita, muuten alert
    if (newnumber !== '' && !/^\d+$/.test(newnumber)) {
      alert(`${newnumber} is not a valid number`)
    }

    // ei voi lisätä nimeä, jos se on jo olemassa
    if (persons.some(person => person.name === newname)) {
      alert(`${newname} is already added to phonebook`)
    } else {
      setPersons(persons.concat(nameObject))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const personToShow = persons
  
  return (
    <div>
      <h2>Phonebook</h2>
      <div>
      </div>
      <form onSubmit={addPerson}>
        name: <input
                value={newName}
                onChange={handleNameChange}
                required //required vaan
              />
        <div>number: <input 
                      value={newNumber}
                      onChange={handleNumberChange}
                    /></div>
        <br />
        <button type="submit">add</button>
      </form>
    <h2>Numbers</h2>
      <div>
        {personToShow.map(person => (
          <p key={person.id}>
            {person.name} {person.number}
          </p>
        ))}
      </div>
    </div>
  )

}

export default App