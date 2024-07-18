import Togglable from './Toggalabel';
import './Blog.css';

/* eslint-disable react/prop-types */
export function Blog({ blog, addLike, removeBlog }) {
	return (
		<div className="blog">
			<p className="blog-title" data-testid="blog-title">
				{blog.title} {blog.author}
			</p>

			<Togglable buttonLabel="view">
				<div data-testid="blog-hidden-conent">
					<p>{blog.url}</p>
					<div className="blog-likes">
						<p data-testid="blog-likes">likes {blog.likes}</p>
						<button data-testid="likes-button" onClick={() => addLike(blog)}>
							like
						</button>
					</div>
					<p>{blog.user.name}</p>

					<button onClick={() => removeBlog(blog)}>remove</button>
				</div>
			</Togglable>
		</div>
	);
}
