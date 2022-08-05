import dotenv from 'dotenv'

dotenv.config()

export const PORT = process.env.PORT || 3001

export const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/weather-app'

export const JWT_SECRET = process.env.JWT_SECRET || 'secret'

export const OPENAPI_KEY = process.env.OPENAPI_KEY

export const API_NINJA_KEY = process.env.API_NINJA_KEY

export const TWITTER_BEARER_TOKEN = process.env.TWITTER_BEARER_TOKEN
