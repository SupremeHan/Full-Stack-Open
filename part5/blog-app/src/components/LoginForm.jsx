/* eslint-disable react/prop-types */

import { useState } from 'react';
import { useNotification } from '../hooks/useNotifications';
import loginService from '../services/login';
import blogService from '../services/blogs';
import { Notification } from './Notification';
import './LoginForm.css';

export function LoginForm() {
	const [formData, setFormData] = useState({ username: '', password: '' });
	const { message, setMessage } = useNotification();

	const handleChange = (event) => {
		const { name, value } = event.target;

		setFormData((prevState) => ({
			...prevState,
			[name]: value
		}));
	};

	const onSubmit = async (e) => {
		e.preventDefault();

		try {
			const user = await loginService.login(formData);

			window.localStorage.setItem('loggedUser', JSON.stringify(user));
			blogService.setToken(user.token);

			setFormData({ username: '', password: '' });
		} catch (error) {
			setMessage({
				type: 'error',
				msg: 'Wrong credentials'
			});
		}
	};
	return (
		<div>
			{message ? <Notification {...message} /> : null}

			<form onSubmit={onSubmit} className="login-form">
				<label>
					Username <input value={formData.username} onChange={handleChange} name="username" />
				</label>
				<label>
					Password <input value={formData.password} onChange={handleChange} name="password" type="password" />
				</label>
				<button className="login-button" type="submit">
					Login
				</button>
			</form>
		</div>
	);
}
