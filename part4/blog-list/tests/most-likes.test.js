const { test, describe } = require('node:test');
const assert = require('node:assert');
const listHelper = require('../utils/list_helper');
const { listOfBlogs } = require('./helpers/mocks');

describe('most likes', () => {
	test('given a list of all blogs we should get the author that has the most likes on the all of its blogs', () => {
		const authorWithMostLikes = { author: 'Edsger W. Dijkstra', totalLikes: 17 };
		const result = listHelper.mostLikes(listOfBlogs);
		assert.deepStrictEqual(result, authorWithMostLikes);
	});
});
