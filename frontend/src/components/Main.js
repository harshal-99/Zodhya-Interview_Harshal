import Tweets from "./Tweets";
import Weather from "./Weather";
import classes from './Main.module.css'
import {useAuth} from "./Auth";

const Main = () => {
	const auth = useAuth()
	return (
		<div className={classes.container}>
			{auth.user && <Weather/>}
			{auth.user && <Tweets/>}
		</div>
	)
}

export default Main
