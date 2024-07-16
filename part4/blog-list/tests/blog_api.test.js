const { test, after, beforeEach } = require('node:test');
const assert = require('node:assert');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);

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

beforeEach(async () => {
	await User.deleteMany({});

	const passwordHash = await bcrypt.hash('salasana', 10);
	const user = new User({ username: 'root', name: 'Master User', password: passwordHash });

	await user.save();

	const userForToken = {
		username: user.username,
		id: user.id
	};
	token = jwt.sign(userForToken, process.env.SECRET);

	await BlogList.deleteMany({});
	blogs = initialBlogs.map((blog) => new BlogList({ ...blog, user: user.id }));
	await BlogList.insertMany(initialBlogs);
});

test('blog list are returned as json', async () => {
	await api
		.get('/api/blogs')
		.expect(200)
		.expect('Content-Type', /application\/json/);
});

test('there are two blogs', async () => {
	const response = await api.get('/api/blogs');

	assert.strictEqual(response.body.length, 2);
});

test('unique identifier of the blog propery should be id', async () => {
	const response = await api.get('/api/blogs');

	const blog = response.body[0];
	assert.ok('id' in blog, 'Object has property id');
});

test('a valid blog can be added', async () => {
	const newBlog = {
		title: 'Leetcode is easy',
		author: 'Me',
		url: 'https://leetcode.com/',
		likes: 3
	};

	await api
		.post('/api/blogs')
		.send(newBlog)
		.expect(201)
		.expect('Content-Type', /application\/json/);

	const response = await api.get('/api/blogs');

	const title = response.body.map((blog) => blog.title);

	assert.strictEqual(response.body.length, initialBlogs.length + 1);
	assert(title.includes('Leetcode is easy'));
});

test('if blog has no likes property provided should set to 0', async () => {
	const newBlog = {
		title: 'Leetcode is easy',
		author: 'Me',
		url: 'https://leetcode.com/'
		// no likes property
	};

	const response = await api.post('/api/blogs').send(newBlog);

	assert.strictEqual(response.body.likes, 0);
});

test('if title or url properties missing server should responde with Bad request', async () => {
	// in this case the title will be missing
	const newBlog = {
		author: 'Me',
		url: 'https://leetcode.com/',
		likes: 0
	};

	await api.post('/api/blogs').send(newBlog).expect(400);
});

after(async () => {
	await mongoose.connection.close();
});
