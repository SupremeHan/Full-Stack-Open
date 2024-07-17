/* eslint-disable react/prop-types */
export function Blog({ blog }) {
	return (
		<div>
			{blog.title} {blog.author}
		</div>
	);
}
