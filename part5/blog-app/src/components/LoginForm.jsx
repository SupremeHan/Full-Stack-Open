/* eslint-disable react/prop-types */

export function LoginForm({ formData, onChange, onSubmit }) {
	return (
		<form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
			<label>
				Username <input value={formData.username} onChange={onChange} name="username" />
			</label>
			<label>
				Password <input value={formData.password} onChange={onChange} name="password" type="password" />
			</label>
			<button style={{ width: '100px' }} type="submit">
				Login
			</button>
		</form>
	);
}
