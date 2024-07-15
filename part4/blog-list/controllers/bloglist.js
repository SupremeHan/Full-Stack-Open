const blogListRouter = require('express').Router();
const BlogList = require('../models/bloglist');

blogListRouter.get('/', (request, response) => {
	BlogList.find({}).then((blogs) => {
		response.json(blogs);
	});
});

blogListRouter.post('/', (request, response) => {
	const blog = new BlogList(request.body);

	blog.save().then((result) => {
		response.status(201).json(result);
	});
});

module.exports = blogListRouter;
