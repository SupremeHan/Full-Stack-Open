/* eslint-disable react/prop-types */
export function BlogForm({ formData, onChange, onSubmit }) {
	return (
		<form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
			<label>
				Title: <input value={formData.title} type="text" onChange={onChange} name="title" />
			</label>
			<label>
				Author: <input value={formData.author} type="text" onChange={onChange} name="author" />
			</label>
			<label>
				Url :<input value={formData.url} type="text" onChange={onChange} name="url" />
			</label>

			<button style={{ width: '100px' }} type="submit">
				create
			</button>
		</form>
	);
}
