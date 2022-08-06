import express from "express"
import cors from "cors"
import morgan from "morgan";
import "express-async-errors";
import mongoose from "mongoose";

import {MONGODB_URI, PORT} from "./utils/config.js";
import userRouter from "./routes/user.js";
import loginRouter from "./routes/login.js";
import {
	errorHandler
	, tokenExtractor, tokenValidator, unknownEndpoint
} from "./utils/middleware.js";
import searchRouter from "./routes/search.js";
import tweetsRouter from "./routes/tweets.js";


const app = express()

mongoose.connect(MONGODB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true
})
	.then(() => {
		console.log('Connected to DB')
	}).catch((error) => {
		console.log('Error connecting to DB:', error.message)
	}
)

app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

app.use('/api/signup', userRouter)
app.use('/api/login', loginRouter)

app.use(tokenExtractor)
app.use(tokenValidator)

app.use('/api/search', searchRouter)
app.use('/api/tweets', tweetsRouter)


app.use(unknownEndpoint)
app.use(errorHandler)

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
