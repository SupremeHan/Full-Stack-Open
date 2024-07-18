import { useEffect, useRef, useState } from 'react';
import blogService from './services/blogs';
import loginService from './services/login';
import { LoginForm } from './components/LoginForm';
import { Blog } from './components/Blog';
import { BlogForm } from './components/BlogForm';
import Togglable from './components/Toggalabel';
import { useNotification } from './hooks/useNotifications';
import { Notification } from './components/Notification';
import './App.css';

function App() {
	const [user, setUser] = useState(null);
	const [blogs, setBlogs] = useState([]);
	const blogRef = useRef();

	const { message, setMessage } = useNotification();

	const login = (formData) => {
		loginService
			.login(formData)
			.then((user) => {
				window.localStorage.setItem('loggedUser', JSON.stringify(user));
				blogService.setToken(user.token);
				setUser(user);
			})
			.catch(() => {
				setMessage({
					type: 'error',
					msg: 'Wrong credentials'
				});
			});
	};

	const createNewBlog = (newBlog) => {
		blogService
			.create(newBlog)
			.then((res) => {
				setBlogs((prevState) => [...prevState, res]);

				setMessage({
					type: 'success',
					msg: `A new blog ${res.title} by ${res.author} added`
				});

				blogRef.current.toggleVisibility();
			})
			.catch(() => {
				setMessage({
					type: 'error',
					msg: 'Failed to add a new blog'
				});
			});
	};

	const addBlogLike = (blog) => {
		const updatedBlog = {
			...blog,
			likes: blog.likes + 1
		};
		blogService
			.update(updatedBlog)
			.then((res) => {
				setBlogs((prevState) =>
					prevState.map((blog) => {
						if (blog.id === res.id) {
							return res;
						} else {
							return blog;
						}
					})
				);
			})
			.catch(() => {
				setMessage({
					type: 'error',
					msg: 'Failed to update likes'
				});
			});
	};

	const removeBlog = (deletedBlog) => {
		if (window.confirm(`Remove blog ${deletedBlog.title} by ${deletedBlog.author}`)) {
			blogService
				.remove(deletedBlog.id)
				.then(() => {
					setBlogs((prevState) => prevState.filter((blog) => blog.id !== deletedBlog.id));
				})
				.catch(() => {
					setMessage({
						type: 'error',
						msg: 'Failed to delete blog'
					});
				});
		}
	};

	const logOut = () => {
		window.localStorage.clear();
		setUser(null);
	};

	useEffect(() => {
		blogService
			.getAll()
			.then((res) => setBlogs(res))
			.catch((e) => console.error(e));
	}, []);

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedUser');
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON);
			setUser(user);
			blogService.setToken(user.token);
		}
	}, []);

	return (
		<div>
			{user ? (
				<div className="blog-area">
					<div className="user-area">
						<p>{`${user.name} logged in`}</p>
						<button onClick={logOut}>Logout</button>
					</div>

					{message ? <Notification {...message} /> : null}

					<Togglable ref={blogRef} buttonLabel="new blog">
						<BlogForm addBlog={createNewBlog} />
					</Togglable>

					<div className="blog-cards">
						{blogs
							.sort((blog1, blog2) => blog2.likes - blog1.likes)
							.map((blog) => (
								<div key={blog.id}>
									<Blog blog={blog} addLike={addBlogLike} removeBlog={removeBlog} />
								</div>
							))}
					</div>
				</div>
			) : (
				<>
					<h2>Login to application</h2>
					<Togglable buttonLabel="view">
						<LoginForm loginUser={login} />
					</Togglable>
				</>
			)}
		</div>
	);
}

export default App;
