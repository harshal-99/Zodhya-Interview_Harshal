import classes from './WeatherData.module.css'

const WeatherData = ({data}) => {
	const currentTime = Intl.DateTimeFormat('en-us', {timeStyle: 'medium'}).format(new Date(data.dt))
	return (
		<div className={classes.card}>
			<h2>{data.weather[0].main}</h2>
			<p>{data.weather[0].description}</p>
			{data?.rain
				&& <p>Rain at {currentTime} could be {data.rain['3h']}mm</p>}
		</div>
	)
}

export default WeatherData
