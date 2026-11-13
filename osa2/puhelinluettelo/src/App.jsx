import { useState, useEffect } from 'react'
import Person from './components/Person'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')

  // hlöiden hakeminen nyt siis palvelun kautta?
  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

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

    // eli nyt toteutetaan osan2 kohtaD tehtävä 2.15
    // jos jo olemassa olevalle henkilölle lisätään numero,
    // korvaa lisätty numero aiemman numeron.

    // etsitään onko listalla henkilöä, jolla sama nimi kuin lisättävällä
    const existingPerson = persons.find(person => person.name === newname)

    // jos on, kysytään käyttäjältä, haluaako hän korvata vanhan numeron uudella
    if (existingPerson) {
      if (window.confirm(`${newname} is already added to phonebook, replace the old number with a new one?`)) {
        // luodaan uusi henkilö-olio, jossa on vanhan henkilön tiedot, mutta uusi numero (siis vaihdetaan vaan hlön puhnro)
        const changedPerson = { ...existingPerson, number: newnumber }

        personService
          .update(existingPerson.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person =>
              person.id !== existingPerson.id ? person : returnedPerson
            ))
            setNewName('')
            setNewNumber('')
          })
      }
      return
    }

    const nameObject = {
      name: newname,
      number: newnumber,
      id: String(persons.length + 1),
    }

    personService
      .create(nameObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
  }

  const removePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
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
          <Person
            key={person.id}
            person={person}
            deletePerson={() => removePerson(person.id, person.name)}
          />
        ))}
      </div>
    </div>
  )

}

export default App