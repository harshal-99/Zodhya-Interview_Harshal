import {useEffect, useState} from "react";
import TwitterService from "../services/twitter.service";
import {TwitterTweetEmbed} from "react-twitter-embed";
import classes from './Tweets.module.css'
import {useAuth} from "./Auth";

const Tweets = () => {
	const auth = useAuth()
	const [location, setLocation] = useState(null)
	const [tweets, setTweets] = useState([])
	useEffect(() => {
		navigator.geolocation.getCurrentPosition(pos => {
			setLocation(pos.coords)
		})
	}, [])

	useEffect(() => {
		if (!location || !auth?.token) return
		const controller = new AbortController()
		TwitterService.getTweets(location.latitude, location.longitude, setTweets, controller)
			.catch(e => console.log(e))
		return () => controller.abort()
	}, [location, auth])

	if (!auth) {
		return <div>Login to see tweets</div>
	}

	if (!location) {
		return <div>Please grant us permission to access your location</div>
	}

	if (!tweets || tweets.length === 0) {
		return <div>Loading tweets</div>
	}
	return (
		<div className={classes.tweets}>
			{tweets &&
				tweets
					.map(tweet =>
						<TwitterTweetEmbed tweetId={tweet.id} key={tweet.id}/>)}
		</div>
	)
}

export default Tweets
