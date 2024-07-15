const { test, describe } = require('node:test');
const assert = require('node:assert');
const listHelper = require('../utils/list_helper');
const { listOfBlogs } = require('./helpers/mocks');

describe('most blogs', () => {
	test('should return the author with the most blogs', () => {
		const authorWithMostBlogs = { author: 'Robert C. Martin', blogs: 3 };
		const result = listHelper.mostBlogs(listOfBlogs);
		assert.deepStrictEqual(result, authorWithMostBlogs);
	});
});
