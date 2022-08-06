import React, {useState} from "react";

import AuthService from "../services/auth.service";

const AuthContext = React.createContext(null);

export const AuthProvider = ({children}) => {
	const [user, setUser] = useState(null);

	const getCredentialsFromLocalStorage = () => {
		const user = localStorage.getItem("user");
		if (user) {
			setUser(JSON.parse(user));
		}
	}

	const login = async (user, callback) => {
		try {
			const data = await AuthService.login(user)
			setUser(data)
			localStorage.setItem("user", JSON.stringify(data))
			callback()
		} catch (e) {
			return e.response.data.error
		}
	}

	const logout = (callback) => {
		localStorage.removeItem("user")
		setUser(null)
		if (typeof callback === "function") {
			callback()
		}
	}
	return <AuthContext.Provider
		value={{user, login, logout, getCredentialsFromLocalStorage}}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
	return React.useContext(AuthContext)
}
