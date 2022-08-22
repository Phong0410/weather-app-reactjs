import styles from "./index.module.css"

import React from "react"
import moment from "moment"
import NoData from "../NoData"

const CurrentWeather = ({ data }) => {
	const weather = {
		city: data?.city,
		description: (() => {
			const descriptionText = data?.weather[0].description
			if (descriptionText)
				return (
					descriptionText.charAt(0).toUpperCase() + descriptionText.slice(1)
				)
		})(),
		icon: data?.weather[0].icon,
		temp: data?.main.temp,
		feels_like: data?.main.feels_like,
		wind: data?.wind.speed,
		humidity: data?.main.humidity,
		sunrise: moment.unix(data?.sys.sunrise).format("LT"),
		sunset: moment.unix(data?.sys.sunset).format("LT")
	}

	return (
		<div className={styles.weather}>
			{(data && (
				<>
					<div className={styles.top}>
						<p className={styles.city}>{weather.city}</p>
						<img
							src={
								weather.icon
									? `https://openweathermap.org/img/wn/${weather.icon}@2x.png`
									: ""
							}
							alt="weather-icon"
							className={styles.weatherIcon}
						/>
						<p className={styles.weatherDescription}>{weather.description}</p>
						<p className={styles.temperature}>{weather.temp} &#8451;</p>
					</div>
					<div className={styles.bottom}>
						<div className={styles.parameterRow}>
							<span>Feels like</span>
							<span>{weather.feels_like} &#8451;</span>
						</div>
						<div className={styles.parameterRow}>
							<span>Wind</span>
							<span>{weather.wind} m/s</span>
						</div>
						<div className={styles.parameterRow}>
							<span>Humidity</span>
							<span>{weather.humidity} %</span>
						</div>
						<div className={styles.parameterRow}>
							<span>Sunrise</span>
							<span>{weather.sunrise}</span>
						</div>
						<div className={styles.parameterRow}>
							<span>Sunset</span>
							<span>{weather.sunset}</span>
						</div>
					</div>
				</>
			)) || <NoData />}
		</div>
	)
}

export default CurrentWeather
