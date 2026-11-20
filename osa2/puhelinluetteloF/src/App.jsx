import { useState, useEffect } from 'react'
import Person from './components/Person'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  // hlöiden hakeminen nyt siis palvelun kautta?
  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        console.log('Backend palautti:', initialPersons)
        setPersons(initialPersons)
      })
  }, [])

  // onnistumisviesti
  const showSuccessMessage = (message) => {
    setSuccessMessage(message)

    setTimeout(() => {
      setSuccessMessage(null)
    }, 5000)
  }
  // virheviesti
  const showErrorMessage = (message) => {
    setErrorMessage(message)

    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  
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

    const nameObject = {
      name: newname,
      number: newnumber,
    }

    // lisätään uusi henkilö palveluun
    // backend tarkistaa, onko samanniminen henkilö jo olemassa
    // ja jos nimi on jo käytössä se palauttaa virheilmoituksen
    personService
      .create(nameObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        showSuccessMessage(`Information of ${returnedPerson.name} has been added to the server`)
      })
      .catch(error => {
        showErrorMessage(
          error.response?.data?.error || `Could not add ${nameObject.name}`
        )
      })
  }


  // poistetaan henkilö palvelusta
  const removePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
          showSuccessMessage(`Information of ${name} has been removed from server`)
        })
        .catch(error => {
        // vai pitäskö olla ${name} has already been removed from server?
        showErrorMessage(`Could not delete ${name}`)
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

      <Notification message={successMessage} type="success" />
      <Notification message={errorMessage} type="error" />
      
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