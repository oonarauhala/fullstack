import React, { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {

  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')


  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const filterCountries = () => {
    const result = []
    countries.forEach(country => {
      if (country.name.common.toLowerCase().includes(filter.toLowerCase())) {
        result.push(country)
      }
    })
    return result
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      find countries <input value={filter} onChange={handleFilterChange} />
      <Country filterCountries={filterCountries} />
    </div>
  );
}

const Country = ({ filterCountries }) => {
  const filteredCountries = filterCountries()

  if (filteredCountries.length === 1) {
    const country = filteredCountries[0]
    const languages = []
    Object.values(country.languages).map(language =>
      languages.push(
        <li key={language}>
          {language}
        </li>
      )
    )
    return (
      <div>
        <OneCountry country={country} languages={languages} />
      </div>
    )
  }
  if (filteredCountries.length > 10) {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  }
  const result = filteredCountries.map(country =>
    <div key={country.name.common}>
      <CountryLine country={country} />
    </div>
  )
  return (
    <div>
      {result}
    </div>
  )
}

const OneCountry = ({ country, languages }) => (
  <div>
    <h1>{country.name.common}</h1>
    <p>capital {country.capital[0]}</p>
    <p>population {country.population}</p>
    <h2>Languages</h2>
    <ul>
      {languages}
    </ul>
    <img src={country.flags.png} />
  </div>
)

const CountryLine = ({ country }) => (
  <div>
    {country.name.common}
  </div>
)

export default App;
