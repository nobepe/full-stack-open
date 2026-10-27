import { useState } from 'react'
import Person from './components/Person'

const App = () => {
  const [persons, setPersons] = useState([
    { id: '1', name: 'Arto Hellas', number: '040-123456' },
    { id: '2', name: 'Ada Lovelace', number: '39-44-5323523' },
    { id: '3', name: 'Dan Abramov', number: '12-43-234345' },
    { id: '4', name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')

  const addPerson = (event) => {
    // preventdef. estää lomakkeen lähetyksen oletusarvoisen toiminnan
    event.preventDefault()
    // trim poistaa turhat völilyönnit alusta ja lopusta, jotta
    // "juu" & "  juu" ei olisi eri nimiä
    const newname = newName.trim()
    const newnumber = newNumber.trim()
    
    // jos nro on annettu, tarkistetaan, et se on vaan nroita, muuten alert
    if (newnumber !== '' && !/^\d+$/.test(newnumber)) {
      alert(`${newnumber} is not a valid number`)
      return
    }

    // ei voi lisätä nimeä, jos se on jo olemassa
    if (persons.some(person => person.name === newname)) {
      alert(`${newname} is already added to phonebook`)
      return
    }

    const nameObject = {
      name: newname,
      number: newnumber,
      id: String(persons.length + 1),
    }

    setPersons(persons.concat(nameObject))
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  // näytettävät nimet, jotka sisältävät hakusanan
  const personToShow = persons.filter(person =>
    person.name.toLowerCase().includes(searchName.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with:
        <input
          value={searchName}
          onChange={event => setSearchName(event.target.value)}
        />
      </div>
      <h2>Add new</h2>
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
          <Person key={person.id} person={person} />
        ))}
      </div>
    </div>
  )

}

export default App