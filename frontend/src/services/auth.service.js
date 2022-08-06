import axios from "axios";

const login = async ({username, password}) => {
	const response = await axios
		.post('/api/login', {username, password})

	return response.data
}

const signup = async ({username, password}) => {
	const response = await axios.post('/api/signup', {username, password})
	return response.data
}

const AuthService = {login, signup}

export default AuthService;
