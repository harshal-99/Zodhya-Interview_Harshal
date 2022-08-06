import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import Login from "./pages/Login";
import {useAuth} from "./components/Auth";
import Signup from "./pages/Signup";

import classes from "./App.module.css";
import {useEffect} from "react";
import Main from "./components/Main";

const App = () => {
	const auth = useAuth()

	useEffect(() => {
		auth.getCredentialsFromLocalStorage()
	}, [])

	return (
		<div>
			<BrowserRouter>
				<nav>
					<div>The Weather App</div>
					{auth.user
						? <button onClick={() => auth.logout()}>Logout</button>
						: <div className={classes.link}>
							<Link to="/login">Login</Link>
							<Link to="/signup">Signup</Link>
						</div>
					}
				</nav>

				<Routes>
					<Route path="/" element={<Main/>}/>
					<Route path="/login" element={<Login/>}/>
					<Route path="/signup" element={<Signup/>}/>
				</Routes>

			</BrowserRouter>

		</div>
	);
}

export default App;
