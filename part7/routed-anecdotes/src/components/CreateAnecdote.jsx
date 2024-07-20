/* eslint-disable react/prop-types */
import { useField } from '../hooks';

export const CreateAnecdote = ({ addNew }) => {
	const content = useField('text');
	const author = useField('text');
	const info = useField('text');

	const handleSubmit = (e) => {
		e.preventDefault();
		addNew({
			content,
			author,
			info,
			votes: 0
		});
		resetFields();
	};

	const resetFields = () => {
		content.reset();
		author.reset();
		info.reset();
	};

	const spreadPropsWithoutReset = ({ reset, ...rest }) => rest;

	return (
		<div>
			<h2>create a new anecdote</h2>
			<form onSubmit={handleSubmit}>
				<div>
					content
					<input {...spreadPropsWithoutReset(content)} />
				</div>
				<div>
					author
					<input {...spreadPropsWithoutReset(author)} />
				</div>
				<div>
					url for more info
					<input {...spreadPropsWithoutReset(info)} />
				</div>

				<button>create</button>
			</form>
			<button onClick={resetFields}>reset</button>
		</div>
	);
};
