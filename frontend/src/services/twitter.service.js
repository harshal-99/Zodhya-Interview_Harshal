import axios from "axios";

const getTweets = async (lat, lon, callback, controller) => {
	const response = await axios.post('/api/tweets', {lat, lon}, {
		headers: {
			'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
		},
		signal: controller.signal
	})
	callback(response.data.data)
}

const TwitterService = {getTweets}

export default TwitterService;
