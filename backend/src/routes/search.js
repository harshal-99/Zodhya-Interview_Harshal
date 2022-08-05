import {Router} from "express";
import {body, query, validationResult} from "express-validator";
import {getCityNames, getCityWeather} from "../utils/utils.js";

const searchRouter = Router()

searchRouter.get('/',
	query('city').isString().trim().escape(),
	async (request, response, next) => {
		const errors = validationResult(request)
		if (!errors.isEmpty()) {
			return response.status(400).json({error: errors.array()})
		}

		const {city} = request.query
		const cityNames = await getCityNames(city)
		response.json(cityNames)
	})

searchRouter.post('/',
	body('lat').escape().isNumeric(),
	body('lon').escape().isNumeric(),
	body('date').escape().isNumeric(),
	async (request, response, next) => {
		const errors = validationResult(request)
		if (!errors.isEmpty()) {
			return response.status(400).json({error: errors.array()})
		}

		const {lat, lon, date} = request.body

		const weatherData = await getCityWeather(lat, lon)
		console.log(weatherData)
		return response.json(weatherData)
	})

export default searchRouter
