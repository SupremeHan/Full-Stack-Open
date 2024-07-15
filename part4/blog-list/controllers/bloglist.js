const blogListRouter = require('express').Router();
const BlogList = require('../models/bloglist');

blogListRouter.get('/', async (request, response) => {
	const blogs = await BlogList.find({});
	response.json(blogs);
});

blogListRouter.post('/', async (request, response) => {
	const { body } = request;

	if (!body.title || !body.url) {
		return response.status(400).end();
	}

	const blog = new BlogList({
		...body,
		likes: body.likes || 0
	});

	const savedBlog = await blog.save();
	response.status(201).json(savedBlog);
});

module.exports = blogListRouter;
