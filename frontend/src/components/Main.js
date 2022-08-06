import Tweets from "./Tweets";
import Weather from "./Weather";
import classes from './Main.module.css'
const Main = () => {
	return (
		<div className={classes.container}>
			<Weather/>
			<Tweets/>
		</div>
	)
}

export default Main
