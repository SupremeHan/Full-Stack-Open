const { test, after, beforeEach } = require('node:test');
const assert = require('node:assert');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const BlogList = require('../models/bloglist');

const initialBlogs = [
	{
		title: 'React patterns',
		author: 'Michael Chan',
		url: 'https://reactpatterns.com/',
		likes: 7
	},
	{
		title: 'Go To Statement Considered Harmful',
		author: 'Edsger W. Dijkstra',
		url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
		likes: 5
	}
];
let token;

beforeEach(async () => {
	await User.deleteMany({});

	const passwordHash = await bcrypt.hash('randomhash123', 10);
	const user = new User({ username: 'test', name: 'Testing', passwordHash });

	await user.save();

	const userForToken = {
		username: user.username,
		id: user.id
	};
	token = jwt.sign(userForToken, process.env.SECRET);

	await BlogList.deleteMany({});
	const newBlogs = initialBlogs.map((blog) => new BlogList({ ...blog, user: user.id }));
	await BlogList.insertMany(newBlogs);
});

test('correct amount of blogs is returned', async () => {
	const response = await api.get('/api/blogs').set('Authorization', `bearer ${token}`);
	assert.strictEqual(response.body.length, initialBlogs.length);
});

test('a valid blog can be added ', async () => {
	const initialResponse = await api.get('/api/blogs').set('Authorization', `bearer ${token}`);

	const newBlog = {
		title: 'Full Stack',
		author: 'StackMaster',
		url: 'https://stack.com/',
		likes: 1
	};

	await api.post('/api/blogs').send(newBlog).set('Authorization', `bearer ${token}`);

	const response = await api.get('/api/blogs').set('Authorization', `bearer ${token}`);

	assert.strictEqual(response.body.length, initialResponse.body.length + 1);
});

test('if blog is added with no votes zero will be assumed', async () => {
	const newBlog = {
		title: 'Half Stack',
		author: 'StackDiscipline',
		url: 'https://halfstack.com/'
	};

	const response = await api.post('/api/blogs').send(newBlog).set('Authorization', `bearer ${token}`);

	assert.strictEqual(response.body.likes, 0);
});

test('if blog is added with no url or title it will not be added', async () => {
	const newBlog = {
		author: null,
		url: 'https://stack.com/',
		likes: 1
	};

	await api.post('/api/blogs').send(newBlog).set('Authorization', `bearer ${token}`).expect(400);
});

test('a blog may be removed by issuing http delete request', async () => {
	const newBlog = {
		title: 'Full Stack',
		author: 'StackMaster',
		url: 'https://stack.com/',
		likes: 1
	};

	const result = await api.post('/api/blogs').send(newBlog).set('Authorization', `bearer ${token}`);

	await api.delete(`/api/blogs/${result.body.id}`).set('Authorization', `bearer ${token}`).expect(204);
});

after(async () => {
	await mongoose.connection.close();
});
