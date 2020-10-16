import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Filterform = ({filter, onChange}) => {
	return (
		<form >
			<div>
				find countries by name <input value={filter} onChange={onChange} />
			</div>
		</form>
	)
}

const Country = ({country, filter}) => {
	if (country.name.toLowerCase().includes(filter.toLowerCase())) {
		return (
			<li>{country.name}</li>
			)
	}
	return ('')
}

const Languages = ({name}) => {
	return (
		<li>{name}</li>
	)
}

const Countryview = ({country}) => {
		return (
			<div>
				<h2>{country.name}</h2>
				capital {country.capital} <br/>
				population {country.population}
				<h3>Languages</h3>
				<ul>
					{country.languages.map(lang =>
						<Languages key={lang.name} name={lang.name}  />)}
				</ul>
				<br/>
				<img src={country.flag} alt={country.name} width={300}/>
				<h3>Weather in {country.capital}</h3>
			</div>
		)
	
}

const Countries = ({countryData, filter}) => {
	const toShow = countryData.filter(country =>
		country.name.toLowerCase().includes(filter.toLowerCase()))
		console.log('pituus', toShow.length)
		console.log('asiat', toShow);
	if (toShow.length > 10) {
		return ('Too many matches, sepcify another filter.')
	}
	else if (toShow.length === 0) {
		return ('Search doesn\'t match any countries.')
	}
	else if (toShow.length === 1) {
		return (<Countryview country={toShow[0]} />)
	}
	return (
		<ul>
			{ 
				countryData.map(country => 
				<Country key={country.name} country={country} filter={filter} />
			)}
		</ul>
	)
}

const App = () => {

	const [countryData, setCountries] = useState([])
	const [filter, setFilter] = useState('')

	useEffect(() => {
		axios
		.get('https://restcountries.eu/rest/v2/all')
		.then(response => {
			console.log('done')
			setCountries(response.data)
		})
	}, [])
	console.log(countryData.toString());

	const handleFilter = (event) => {
		event.preventDefault()
		setFilter(event.target.value)
	}
 
	return (
		<div>
			<Filterform value={filter}
			onChange={handleFilter}/>
			<ul>
				<Countries 
				countryData={countryData}  
				filter={filter} />
			</ul>
		</div>
	)
}

export default App
