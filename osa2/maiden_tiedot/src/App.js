import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Countries from './components/Country'

const Filterform = ({filter, onChange}) => {
	return (
		<form >
			<div>
				find countries by name <input value={filter} onChange={onChange} />
			</div>
		</form>
	)
}

const App = () => {

	const [countryData, setCountries] = useState([])
	const [filter, setFilter] = useState('')
	const apiKey = process.env.REACT_APP_API_KEY

	useEffect(() => {
		axios
		.get('https://restcountries.eu/rest/v2/all')
		.then(response => {
			setCountries(response.data)
		})
	}, [])

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
				filter={filter}
				setFilter={setFilter}
				apiKey={apiKey}
				useEffect={useEffect} />
			</ul>
		</div>
	)
}

export default App
