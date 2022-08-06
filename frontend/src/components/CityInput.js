import React,{useEffect, useState} from "react";
import SuggestionService from "../services/city.service";

const SuggestionBox = ({citySuggestion, handleClick}) => {
	return (
		<div>
			{citySuggestion.map(city =>
				<div key={city.name} onClick={handleClick.bind(null, city)}>{city.name}</div>)}
		</div>
	)
}

const CityInput = React.memo(({name, handleChange}) => {
	const [city, setCity] = useState("");
	const [citySuggestion, setCitySuggestion] = useState([])

	useEffect(() => {
		let id
		const controller = new AbortController()
		id = setTimeout(() => {
			SuggestionService
				.getSuggestions(city, controller)
				.then((suggestions) => {
					handleSuggestion(suggestions)
				})
		}, 250)

		return () => {
			controller.abort()
			clearTimeout(id)
		}
	}, [city])


	const handleInputChange = (event) => {
		setCity(event.target.value)
	}

	const handleSuggestion = (cities) => {
		setCitySuggestion(cities)
	}

	const handleClick = (city) => {
		handleChange(city)
		setCity(city.name)
		setCitySuggestion([])
	}


	return (
		<div>
			<div style={{display: "flex", flexDirection: "column"}}>
				<label htmlFor={name}>{name}</label>
				<input id={name} type="text" value={city} onChange={handleInputChange}/>
			</div>
			<SuggestionBox citySuggestion={citySuggestion} handleClick={handleClick}/>
		</div>
	)
})

export default CityInput
