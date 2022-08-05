import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import {Router} from 'express'

import UserEntity from "../models/userEntity.js";
import {body} from "express-validator";
import {JWT_SECRET} from "../utils/config.js";

const loginRouter = Router()

loginRouter.post('/',
	body('username').isString().trim(),
	body('password').isString().trim(),
	async (request, response, next) => {
		const {username, password} = request.body

		const user = await UserEntity.findOne({username})

		const passwordCorrect = user === null
			? false
			: await bcrypt.compare(password, user.passwordHash)

		if (!(user && passwordCorrect)) {
			return response.status(401).json({
				error: 'invalid username or password'
			})
		}

		const userForToken = {
			username: user.username,
			id: user._id
		}

		const token = jwt.sign(userForToken, JWT_SECRET, {expiresIn: 60 * 60})
		response
			.status(200)
			.send({token, username})
	}
)

export default loginRouter
