const { test, beforeEach, after } = require('node:test');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const User = require('../models/user');

const api = supertest(app);

beforeEach(async () => {
	await User.deleteMany({});

	const passwordHash = await bcrypt.hash('salasana', 10);
	const user = new User({ username: 'root', name: 'Master User', passwordHash });

	await user.save();
});

test('creating user', async () => {
	const newUser = {
		username: 'user',
		name: 'Stack Master',
		password: 'ultimateHax'
	};

	await api
		.post('/api/users')
		.send(newUser)
		.expect(200)
		.expect('Content-Type', /application\/json/);
});

test('creation fails when username already exists', async () => {
	const newUser = {
		username: 'user',
		name: 'Stack Master',
		password: 'ultimateHax'
	};

	await api
		.post('/api/users')
		.send(newUser)
		.expect(200)
		.expect('Content-Type', /application\/json/);

	await api
		.post('/api/users')
		.send(newUser)
		.expect(400)
		.expect('Content-Type', /application\/json/);
});

test('creation fails when password too short', async () => {
	const newUser = {
		username: 'user',
		name: 'Stack Master',
		password: 'aa'
	};

	await api
		.post('/api/users')
		.send(newUser)
		.expect(400)
		.expect('Content-Type', /application\/json/);
});

after(() => {
	mongoose.connection.close();
});
