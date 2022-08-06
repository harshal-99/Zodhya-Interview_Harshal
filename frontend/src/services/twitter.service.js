import axios from "axios";

const getTweets = async (lat, lon, callback, controller, token) => {
	const response = await axios.post('/api/tweets', {lat, lon}, {
		headers: {
			'Authorization': `Bearer ${token}`
		},
		signal: controller.signal
	})
	callback(response.data.data)
}

const TwitterService = {getTweets}

export default TwitterService;
