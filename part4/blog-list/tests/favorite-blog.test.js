const { test, describe } = require('node:test');
const assert = require('node:assert');
const listHelper = require('../utils/list_helper');
const { listOfBlogs } = require('./helpers/mocks');

describe('favorite blog', () => {
	test('given a list of blogs, we should get the blog with the most likes', () => {
		const result = listHelper.favoriteBlog(listOfBlogs);
		assert.deepStrictEqual(result.likes, listOfBlogs[2].likes);
	});

	test('if there is no blogs we should not recive a value', () => {
		const result = listHelper.favoriteBlog([]);
		assert.strictEqual(result, null);
	});
});
