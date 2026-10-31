import { useState, useEffect } from 'react'
import axios from 'axios'
import Person from './components/Person'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')

  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }

  useEffect(hook, [])

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

  const handleSearchChange = (event) => {
  setSearchName(event.target.value)
 }

  // näytettävät nimet, jotka sisältävät hakusanan
  const personToShow = persons.filter(person =>
    person.name.toLowerCase().includes(searchName.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchName={searchName} handleSearchChange={handleSearchChange} />

      <h2>Add new</h2>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />

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