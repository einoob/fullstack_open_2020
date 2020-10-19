import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Wind = ({weather}) => {
	let direction = 'xx'
	if (weather.wind.deg > 338 || weather.wind.deg < 23) {
		direction = 'north'
	}
	else if (weather.wind.deg < 67) {
		direction = 'north-east'
	}
	else if (weather.wind.deg < 112) {
		direction = 'east'
	}
	else if (weather.wind.deg < 157) {
		direction = 'south-east'
	}
	else if (weather.wind.deg < 202) {
		direction = 'south'
	}
	else if (weather.wind.deg < 247) {
		direction = 'south-west'
	}
	else if (weather.wind.deg < 292) {
		direction = 'west'
	}
	else {
		direction = 'north-west'
	}	
	return (direction)
}

const Weather = ({ city, apiKey }) => {
	const [weather, setWeather] = useState(null)
	const api = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + apiKey

	useEffect(() => {
		axios
		.get(api)
		.then(response => {
			setWeather(response.data)
		})
	}, [api])
	if (weather) {
	return (
		<div>
			{weather.weather[0].description}<br/>
			temperature:	{Math.round(weather.main.temp)}° celsius<br/>
			wind: {Math.round(weather.wind.speed)} m/s from <Wind weather={weather} />
		</div>
	)
	}
	return ('')
}

export default Weather