import axios from "axios";
import {open_api_url, rapid_api_url, twitter_api_url} from "./constants.js";
import {API_NINJA_KEY, OPENAPI_KEY, TWITTER_BEARER_TOKEN} from "./config.js";

export const getCityNames = async (cityName) => {
	const response = await axios.get(rapid_api_url, {
		params: {
			name: cityName,
			limit: 5
		},
		headers: {
			'X-Api-key': API_NINJA_KEY
		}
	})
	return response.data
}

export const getCityWeather = async (lat, lon, cnt = 5) => {
	const weather = await axios.get(open_api_url, {
		params: {
			appid: OPENAPI_KEY,
			lat, lon,
			cnt
		}
	})
	return weather.data
}

export const getTweets = async (cityName) => {
	const response = await axios.get(twitter_api_url, {
		params: {
			query: `${cityName} weather`,
			max_results: 10
		},
		headers: {
			Authorization: `Bearer ${TWITTER_BEARER_TOKEN}`
		}
	})

	return response.data
}
