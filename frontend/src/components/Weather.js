import CityInput from "./CityInput";
import {useState} from "react";
import classes from './Weather.module.css'
import SuggestionService from "../services/city.service.js";
import WeatherData from "./WeatherData";

const Weather = () => {
	const [weatherData, setWeatherData] = useState([]);
	const [sourceCity, setSourceCity] = useState("");
	const [destinationCity, setDestinationCity] = useState('')

	const handleSourceChange = (city) => {
		setSourceCity(city)
	}

	const handleDestinationChange = (city) => {
		setDestinationCity(city)
	}

	const handleGetWeather = async () => {
		const response = await SuggestionService.getCityWeather(sourceCity.latitude, sourceCity.longitude)
		setWeatherData(response.list)
	}


	return (
		<div style={{display: "flex", flexDirection: "column", width: '100%'}}>
			<div className={classes.container}>
				<CityInput name="source" handleChange={handleSourceChange}/>
				<CityInput name="destination" handleChange={handleDestinationChange}/>
			</div>
			<button onClick={handleGetWeather} style={{alignSelf: "center"}}>Get Weather</button>
			<div className={classes.weatherContainer}>
				{weatherData.length > 0
					&&
					weatherData
						.map(data => <WeatherData key={data.dt} data={data}/>)
				}
			</div>
		</div>
	)
}

export default Weather
