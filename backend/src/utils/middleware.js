export const tokenExtractor = (request, response, next) => {
	const authorization = request.get('authorization')
	if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
		request.token = authorization.substring(7)
	}
	next()
}


export const errorHandler = (error, request, response, next) => {
	console.log(error.message)
	next(error)
}


export const unknownEndpoint = (request, response) => {
	response.status(404).send({error: "unknown endpoint"})
}
