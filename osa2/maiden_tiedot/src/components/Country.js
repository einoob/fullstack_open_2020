import React from 'react'
import Weather from './Weather'



const Button = ({onClick, text}) => {
	return (
		<button onClick={onClick}> {text}</button>
	)
}

const Country = ({country, filter, setFilter}) => {
	if (country.name.toLowerCase().includes(filter.toLowerCase())) {
		return (
			<li>{country.name} <Button onClick={ () => setFilter(country.name)}  text='show' /></li>
			)
	}
	return ('')
}

const Languages = ({name}) => {
	return (
		<li>{name}</li>
	)
}

const Countryview = ({country, apiKey}) => {

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
				<img src={country.flag}
				alt={country.name}
				width={300}
				border={1}
				bordercolor={0x808080}/>
				<h3>Weather in {country.capital}</h3>
				<Weather city={country.capital} apiKey={apiKey} />
					
			</div>
		)
	
}

const Countries = ({countryData, filter, setFilter, apiKey}) => {
	const toShow = countryData.filter(country =>
		country.name.toLowerCase().includes(filter.toLowerCase()))
	//	console.log('pituus', toShow.length)
	if (toShow.length > 10) {
		return ('Too many matches, specify another filter.')
	}
	else if (toShow.length === 0) {
		return ('Search doesn\'t match any countries.')
	}
	else if (toShow.length === 1) {
		return (<Countryview country={toShow[0]} apiKey={apiKey}  />)
	}
	return (
		<ul>
			{ 
				countryData.map(country => 
				<Country key={country.name} country={country} filter={filter} setFilter={setFilter} />
			)}
		</ul>
	)
}

export default Countries