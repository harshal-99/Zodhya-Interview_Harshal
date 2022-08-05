import bcrypt from 'bcrypt';
import {Router} from 'express';

import UserEntity from '../models/userEntity.js';
import {body, validationResult} from "express-validator";

const userRouter = Router()

userRouter.post('/',
	body('username').isString().trim().isLength({min: 3}).escape(),
	body('password').isString().trim().isLength({min: 3}).escape(),
	async (request, response, next) => {
		const errors = validationResult(request)
		if (!errors.isEmpty()) {
			return response.status(400).json({error: errors.array()})
		}
		const {password, username} = request.body


		const saltRounds = 10
		const passwordHash = 10
		await bcrypt.hash(password, saltRounds)

		const user = new UserEntity({
			username,
			passwordHash
		})

		const savedUser = await user.save()

		response.json(savedUser)
	}
)

export default userRouter;
