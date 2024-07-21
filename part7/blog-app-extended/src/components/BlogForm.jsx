/* eslint-disable react/prop-types */
import { useState } from 'react';
import './BlogForm.css';

export function BlogForm({ addBlog }) {
	const [newBlog, setNewBlog] = useState({
		title: '',
		author: '',
		url: ''
	});

	const handleBlogFormChange = (event) => {
		const { name, value } = event.target;

		setNewBlog((prevState) => ({
			...prevState,
			[name]: value
		}));
	};

	const addNewBlog = (e) => {
		e.preventDefault();

		addBlog(newBlog);

		setNewBlog({
			title: '',
			author: '',
			url: ''
		});
	};

	return (
		<div className="blog-wrapper">
			<h2>Create a new blog</h2>
			<form onSubmit={addNewBlog} className="blog-form">
				<label>
					Title: <input value={newBlog.title} type="text" onChange={handleBlogFormChange} name="title" placeholder="Title" />
				</label>
				<label>
					Author: <input value={newBlog.author} type="text" onChange={handleBlogFormChange} name="author" placeholder="Author" />
				</label>
				<label>
					Url :<input value={newBlog.url} type="text" onChange={handleBlogFormChange} name="url" placeholder="Url" />
				</label>

				<button className="blog-button" type="submit" data-testid="blog-button">
					create
				</button>
			</form>
		</div>
	);
}
