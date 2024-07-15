const mongoose = require('mongoose');
const logger = require('../utils/logger');
const config = require('../utils/config');

mongoose
	.connect(config.MONGODB_URI)
	.then(() => {
		logger.info('connected to Mongo');
	})
	.catch((error) => {
		logger.error('error connecting to Mongo', error.message);
	});

const blogSchema = new mongoose.Schema({
	title: String,
	author: String,
	url: String,
	likes: Number
});

module.exports = mongoose.model('Blog', blogSchema);
