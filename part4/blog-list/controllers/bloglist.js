const blogListRouter = require('express').Router();
const BlogList = require('../models/bloglist');
const User = require('../models/user');

blogListRouter.get('/', async (request, response) => {
	const blogs = await BlogList.find({}).populate('user', { name: 1, username: 1, _id: 1 });
	response.json(blogs);
});

blogListRouter.post('/', async (request, response) => {
	if (!request.token || !request.decodedToken) {
		return response.status(401).json({ error: 'token missing or invalid' });
	}

	const { body } = request;

	const user = await User.findById(request.decodedToken.id);

	if (!body.title || !body.url) {
		return response.status(400).end();
	}

	const blog = new BlogList({
		...body,
		likes: body.likes || 0,
		user: user._id
	});

	const savedBlog = await blog.save();
	user.blogs = user.blogs.concat(savedBlog._id);
	await user.save();

	response.status(201).json(savedBlog);
});

blogListRouter.delete('/:id', async (request, response) => {
	if (!request.token || !request.decodedToken) {
		return response.status(401).json({ error: 'token missing or invalid' });
	}

	try {
		const blog = await BlogList.findById(request.params.id);

		if (blog.user.toString() === request.decodedToken.id) {
			await BlogList.findByIdAndDelete(request.params.id);
			response.status(204).end();
		} else {
			response.status(400).end();
		}
	} catch (error) {
		response.status(400).end();
	}
});

module.exports = blogListRouter;
