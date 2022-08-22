import moment from "moment"
import React from "react"
import {
	Accordion,
	AccordionItem,
	AccordionItemButton,
	AccordionItemHeading,
	AccordionItemPanel
} from "react-accessible-accordion"
import styles from "./index.module.css"

const normalizeData = (data) => {
	if (data) {
		const filteredData = data.list.filter((item) => {
			const hour = moment.unix(item.dt).format("HH")
			const date = moment.unix(item.dt).format("l")
			const currentDate = moment().format("l")
			return (
				date !== currentDate &&
				(hour === "07" || hour === "13" || hour === "19")
			)
		})

		const simplificatedData = filteredData.map((item) => ({
			dt: item.dt,
			temp: item.main.temp,
			feels_like: item.main.feels_like,
			humidity: item.main.humidity,
			description: (() => {
				const descriptionText = item.weather[0].description
				if (descriptionText)
					return (
						descriptionText.charAt(0).toUpperCase() + descriptionText.slice(1)
					)
			})(),
			icon: item.weather[0].icon
		}))

		// Group forecast item with same date
		const forecastMap = new Map()

		simplificatedData.forEach((item) => {
			const dt = item.dt
			const date = moment.unix(dt).format("dddd")
			if (forecastMap.has(date))
				forecastMap.set(date, {
					...forecastMap.get(date),
					data: [...forecastMap.get(date).data, item]
				})
			else forecastMap.set(date, { date, data: [item] })
		})

		return Array.from(forecastMap.values()).slice(0, 3)
	}
}

const Forecast = ({ data }) => {
	const forecastData = normalizeData(data)

	return (
		<Accordion allowZeroExpanded>
			{forecastData?.map((item, index) => (
				<AccordionItem key={index} className={styles.forecastItem}>
					<AccordionItemHeading>
						<AccordionItemButton className={styles.container}>
							<span>{item.date}</span>
							<span className={styles.rightContent}>
								{item.data.map((item, index) => (
									<span key={index}>
										<img
											src={`https://openweathermap.org/img/wn/${item.icon}@2x.png`}
											alt="weather-icon"
											className={styles.weatherIcon}
										/>
										<span>{item.temp} &#8451;</span>
									</span>
								))}
							</span>
						</AccordionItemButton>
					</AccordionItemHeading>
					<AccordionItemPanel>
						<div className={styles.expandedContainer}>
							<span>Description</span>
							<div className={styles.rightContent}>
								{item.data.map((item, index) => (
									<span key={index}>{item.description}</span>
								))}
							</div>
						</div>
						<div className={styles.expandedContainer}>
							<span>Feels like</span>
							<span className={styles.rightContent}>
								{item.data.map((item, index) => (
									<span key={index}>{item.feels_like} &#8451;</span>
								))}
							</span>
						</div>
						<div className={styles.expandedContainer}>
							<span>Humidity</span>
							<span className={styles.rightContent}>
								{item.data.map((item, index) => (
									<span key={index}>{item.humidity} %</span>
								))}
							</span>
						</div>
					</AccordionItemPanel>
				</AccordionItem>
			))}
		</Accordion>
	)
}

export default Forecast
