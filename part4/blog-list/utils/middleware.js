const jwt = require('jsonwebtoken');
const logger = require('./logger');

const tokenExtractor = async (request, response, next) => {
	const authorization = request.get('authorization');
	if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
		request.token = authorization.substring(7);
	} else {
		request.token = null;
	}
	try {
		const decodedToken = await jwt.verify(request.token, process.env.SECRET);
		request.decodedToken = decodedToken;
	} catch (error) {
		request.decodedToken = null;
	}
	next();
};

const requestLogger = (request, response, next) => {
	logger.info('Method:', request.method);
	logger.info('Path:  ', request.path);
	logger.info('Body:  ', request.body);
	logger.info('---');
	next();
};

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error, request, response, next) => {
	if (error.name === 'CastError') {
		return response.status(400).send({ error: 'malformatted id' });
	} else if (error.name === 'ValidationError') {
		return response.status(400).json({ error: error.message });
	} else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
		return response.status(400).json({ error: 'expected `username` to be unique' });
	} else if (error.name === 'JsonWebTokenError') {
		return response.status(400).json({ error: 'token missing or invalid' });
	}

	next(error);
};

module.exports = { errorHandler, tokenExtractor, requestLogger, unknownEndpoint };
