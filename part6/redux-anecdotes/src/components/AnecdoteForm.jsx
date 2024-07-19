import { useDispatch } from 'react-redux';
import { addAnecdote } from '../reducers/anecdoteReducer';
import anecdotesService from '../services/anecdotes';
import { setNotifiaction } from '../reducers/notificationReducer';

export function AnecdoteForm() {
	const dispatch = useDispatch();

	const createAnecdote = async (event) => {
		event.preventDefault();
		const anecdote = event.target.anecdote.value;
		event.target.anecdote.value = '';

		const newAnecdote = await anecdotesService.createAnecdote(anecdote);

		dispatch(addAnecdote(newAnecdote));
		dispatch(setNotifiaction(`New anecdote ${newAnecdote.content}`, 3));
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
