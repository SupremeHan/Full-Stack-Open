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
	likes: Number,
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}
});

blogSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	}
});

module.exports = mongoose.model('Blog', blogSchema);
