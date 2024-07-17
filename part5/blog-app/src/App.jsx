import { useEffect, useState } from 'react';
import blogService from './services/blogs';
import loginService from './services/login';
import { LoginForm } from './components/LoginForm';
import { Notification } from './components/Notification';
import { Blog } from './components/Blog';
import { BlogForm } from './components/BlogForm';
import { useNotification } from './hooks/useNotifications';

function App() {
	const [formData, setFormData] = useState({ username: '', password: '' });
	const [user, setUser] = useState(null);

	const [blogs, setBlogs] = useState([]);
	const [newBlog, setNewBlog] = useState({
		title: '',
		author: '',
		url: ''
	});
	const { message, setMessage } = useNotification();

	const handleChange = (event) => {
		const { name, value } = event.target;

		setFormData((prevState) => ({
			...prevState,
			[name]: value
		}));
	};

	const handleBlogFormChange = (event) => {
		const { name, value } = event.target;

		setNewBlog((prevState) => ({
			...prevState,
			[name]: value
		}));
	};

	const addNewBlog = async (e) => {
		e.preventDefault();

		try {
			const blog = await blogService.create(newBlog);

			setNewBlog({
				title: '',
				author: '',
				url: ''
			});
			setMessage({
				type: 'success',
				msg: `A new blog ${blog.title} by ${user.name} added`
			});
		} catch (error) {
			setMessage({
				type: 'error',
				msg: 'Failed to add a new blog'
			});
		}
	};

	const onSubmit = async (e) => {
		e.preventDefault();

		try {
			const user = await loginService.login(formData);

			window.localStorage.setItem('loggedUser', JSON.stringify(user));
			blogService.setToken(user.token);

			setUser(user);
			setFormData({ username: '', password: '' });
		} catch (error) {
			setMessage({
				type: 'error',
				msg: 'Wrong credentials'
			});
		}
	};

	const logOut = () => {
		window.localStorage.clear();
	};

	useEffect(() => {
		if (user) {
			blogService.getAll().then((res) => setBlogs(res));
		}
	}, [user]);

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
			{message ? <Notification {...message} /> : null}
			{user ? (
				<>
					<p>{`${user.name} logged in`}</p>
					<button onClick={logOut}>Logout</button>

					<h2>Create a new blog</h2>
					<BlogForm formData={newBlog} onChange={handleBlogFormChange} onSubmit={addNewBlog} />

					{blogs.map((blog) => (
						<Blog key={blog.id} blog={blog} />
					))}
				</>
			) : (
				<>
					<h2>Login to application</h2>
					<LoginForm formData={formData} onChange={handleChange} onSubmit={onSubmit} />
				</>
			)}
		</div>
	);
}

export default App;
