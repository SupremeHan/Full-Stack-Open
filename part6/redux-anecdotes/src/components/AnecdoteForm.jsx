import { useDispatch } from 'react-redux';
import { addAnecdote } from '../reducers/anecdoteReducer';

export function AnecdoteForm() {
	const dispatch = useDispatch();

	const createAnecdote = (event) => {
		event.preventDefault();
		const anecdote = event.target.anecdote.value;
		event.target.anecdote.value = '';

		dispatch(addAnecdote(anecdote));
	};
	return (
		<div>
			<h2>create new</h2>
			<form onSubmit={createAnecdote}>
				<div>
					<input name="anecdote" />
				</div>
				<button>create</button>
			</form>
		</div>
	);
}
