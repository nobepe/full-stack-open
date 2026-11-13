import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null)

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const countriesToShow = countries.filter(country =>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  )

  let content

  if (selectedCountry || countriesToShow.length === 1) {
    const country = selectedCountry || countriesToShow[0]

    content = (
      <div>
        <h2>{country.name.common}</h2>
        <p>Capital {country.capital}</p>
        <p>Area {country.area} km²</p>

        <h3>Languages</h3>
        <ul>
          {Object.values(country.languages).map(language =>
            <li key={language}>{language}</li>
          )}
        </ul>

        <img
          src={country.flags.png}
          alt={country.flags.alt}
          width="150"
        />
      </div>
    )
  } else if (countriesToShow.length > 10) {
    content = <p>Too many matches, specify another filter</p>
  } else if (countriesToShow.length > 1) {
    content = (
      <ul>
        {countriesToShow.map(country =>
          <li key={country.cca3}>
            {country.name.common}
            <button onClick={() => setSelectedCountry(country)}>
              Show
            </button>
          </li>
        )}
      </ul>
    )
  } else {
    content = <p>No countries found</p>
  }

  return (
    <div>
      <h1>Countries</h1>
      <div>
        find countries <input
          value={search}
          onChange={event => {
            setSearch(event.target.value)
            setSelectedCountry(null)
          }}
        />
      </div>
      {content}
    </div>
  )
}

export default App
