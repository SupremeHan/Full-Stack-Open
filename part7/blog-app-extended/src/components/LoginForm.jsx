/* eslint-disable react/prop-types */

import { useState } from 'react';
import './LoginForm.css';

export function LoginForm({ loginUser }) {
	const [formData, setFormData] = useState({ username: '', password: '' });

	const handleChange = (event) => {
		const { name, value } = event.target;

		setFormData((prevState) => ({
			...prevState,
			[name]: value
		}));
	};

	const onSubmit = async (e) => {
		e.preventDefault();

		loginUser(formData);
		setFormData({ username: '', password: '' });
	};
	return (
		<form onSubmit={onSubmit} className="login-form" data-testid="login-form">
			<label>
				Username <input data-testid="username" value={formData.username} onChange={handleChange} name="username" />
			</label>
			<label>
				Password <input data-testid="password" value={formData.password} onChange={handleChange} name="password" type="password" />
			</label>
			<button className="login-button" type="submit">
				Login
			</button>
		</form>
	);
}
