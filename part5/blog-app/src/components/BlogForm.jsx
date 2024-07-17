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
					Title: <input value={newBlog.title} type="text" onChange={handleBlogFormChange} name="title" />
				</label>
				<label>
					Author: <input value={newBlog.author} type="text" onChange={handleBlogFormChange} name="author" />
				</label>
				<label>
					Url :<input value={newBlog.url} type="text" onChange={handleBlogFormChange} name="url" />
				</label>

				<button className="blog-button" type="submit">
					create
				</button>
			</form>
		</div>
	);
}
