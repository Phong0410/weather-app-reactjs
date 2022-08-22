import React, { useState } from "react"
import { AsyncPaginate } from "react-select-async-paginate"
import { geoApiOptions, GEO_API_URL } from "../../api/city"
import styles from "./index.module.css"

const Search = ({ onSearchChange }) => {
	const [search, setSearch] = useState(null)

	const handleOnChange = (searchData) => {
		setSearch(searchData)
		onSearchChange(searchData)
	}

	const loadOptions = (inputValue) => {
		return fetch(
			`${GEO_API_URL}/cities?namePrefix=${inputValue}`,
			geoApiOptions
		)
			.then((response) => response.json())
			.then((response) => ({
				options: response.data.map((city) => ({
					value: {
						lat: city.latitude,
						lon: city.longitude
					},
					label: `${city.name}, ${city.countryCode}`
				}))
			}))
			.catch((err) => console.error(err))
	}

	return (
		<AsyncPaginate
			placeholder="Search for city"
			debounceTimeout={1000}
			value={search}
			onChange={handleOnChange}
			loadOptions={loadOptions}
			className={styles.search}
		/>
	)
}

export default Search
