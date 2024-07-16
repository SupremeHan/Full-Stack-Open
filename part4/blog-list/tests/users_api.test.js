const { test, after, beforeEach, describe } = require('node:test');
const assert = require('node:assert');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const User = require('../models/user');

const api = supertest(app);

beforeEach(async () => {
	await User.deleteMany({});
});

test('user with incorect password length should not be created', async () => {
	const newUser = {
		username: 'testest123',
		name: 'Alex test',
		password: '12'
	};

	await api.post('/api/users').send(newUser).expect(400);
});

test('should not added users with the same username', async () => {
	let newUser = {
		username: 'test123',
		name: 'test',
		password: '12345'
	};

	await api.post('/api/users').send(newUser);

	newUser = {
		username: 'test123',
		name: 'test2',
		password: '12345565'
	};

	await api.post('/api/users').send(newUser).expect(500);
});

after(async () => {
	await mongoose.connection.close();
});
