const _ = require('loadsh');

const dummy = (blogs) => {
	return 1;
};

const totalLikes = (blogs) => {
	const total = blogs.reduce((acc, curr) => {
		return acc + curr.likes;
	}, 0);

	return total;
};

const favoriteBlog = (blogs) => {
	if (blogs.length === 0) return null;

	const favorite = blogs.reduce((acc, curr) => {
		return curr.likes > acc.likes ? curr : acc;
	});

	return {
		title: favorite.title,
		author: favorite.author,
		likes: favorite.likes
	};
};

const mostBlogs = (blogs) => {
	if (blogs.length === 0) return null;

	const groupedByAuthor = _.groupBy(blogs, 'author');
	const blogCounts = _.mapValues(groupedByAuthor, (blogs) => _.size(blogs));

	const authorWithMostBlogs = _.maxBy(Object.keys(blogCounts), (author) => blogCounts[author]);

	return {
		author: authorWithMostBlogs,
		blogs: blogCounts[authorWithMostBlogs]
	};
};

const mostLikes = (blogs) => {
	if (blogs.length === 0) return null;

	const authorLikes = _.mapValues(_.groupBy(blogs, 'author'), (blogs) => _.sumBy(blogs, 'likes'));

	const authorWithMostLikes = _.maxBy(_.keys(authorLikes), (author) => authorLikes[author]);

	return {
		author: authorWithMostLikes,
		totalLikes: authorLikes[authorWithMostLikes]
	};
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };
