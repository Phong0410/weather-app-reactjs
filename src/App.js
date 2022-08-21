import { stringify } from "query-string"
import { useState } from "react"
import { WEATHER_API_KEY, WEATHER_API_URL } from "./api/weather"
import "./App.css"
import CurrentWeather from "./components/CurrentWeather"
import Forecast from "./components/Forecast"
import Search from "./components/Search"

function App() {
	const [currentWeather, setCurrentWeather] = useState(null)
	const [forecast, setForecast] = useState(null)

	const handleOnSearchChange = (searchData) => {
		const { lat, lon } = searchData.value

		const query = {
			lat,
			lon,
			appid: WEATHER_API_KEY
		}

		const queryString = stringify(query)

		const currentWeatherFetch = fetch(
			`${WEATHER_API_URL}/weather?${queryString}&units=metric`
		)

		const forecastFetch = fetch(
			`${WEATHER_API_URL}/forecast?${queryString}&units=metric`
		)

		Promise.all([currentWeatherFetch, forecastFetch])
			.then(async (response) => {
				const weatherResponse = await response[0].json()
				const forecastResponse = await response[1].json()

				setCurrentWeather({ city: searchData.label, ...weatherResponse })
				setForecast({ city: searchData.label, ...forecastResponse })
			})
			.catch((err) => console.log(err))
	}

	return (
		<div className="container">
			<Search onSearchChange={handleOnSearchChange} />
			<CurrentWeather data={currentWeather} />
			<Forecast data={forecast} />
		</div>
	)
}

export default App
