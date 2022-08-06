import axios from "axios";

const getSuggestions = async (city, controller) => {
	if (city === '') return []
	const response = await axios.get('/api/search', {
		params: {
			city
		},
		headers: {
			'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
		},
		signal: controller.signal
	})
	return response.data
}

const getCityWeather = async (lat, lon) => {
	const response = await axios.post('/api/search', {
		lat, lon, date: new Date().getTime()
	}, {
		headers: {
			'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
		}
	})
	return response.data
}

const SuggestionService = {getSuggestions, getCityWeather}

export default SuggestionService
