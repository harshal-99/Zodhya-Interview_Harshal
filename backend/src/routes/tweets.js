import {Router} from "express";
import {body, validationResult} from "express-validator";
import {getCityWeather, getTweets} from "../utils/utils.js";

const tweetsRouter = Router()

tweetsRouter.post('/',
	body('lat').escape().isNumeric(),
	body('lon').escape().isNumeric(),
	async (request, response, next) => {
		const errors = validationResult(request)
		if (!errors.isEmpty()) {
			return response.status(400).json({error: errors.array()})
		}

		const {lat, lon} = request.body
		const cityWeather = await getCityWeather(lat, lon, 10)
		const cityName = cityWeather.city.name

		const tweets = await getTweets(cityName)

		response.json(tweets)
	}
)

export default tweetsRouter;
