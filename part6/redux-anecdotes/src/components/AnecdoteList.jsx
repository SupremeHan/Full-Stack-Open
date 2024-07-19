import { useDispatch, useSelector } from 'react-redux';
import { voteAnecdote } from '../reducers/anecdoteReducer';
import { setNotifiaction } from '../reducers/notificationReducer';

export function AnecdoteList() {
	const dispatch = useDispatch();
	const anecdotes = useSelector(({ anecdotes, filter }) =>
		anecdotes.filter(({ content }) => content.toLowerCase().includes(filter.toLowerCase())).sort((a, b) => b.votes - a.votes)
	);

	const anecdoteVote = (anecdote) => {
		dispatch(voteAnecdote(anecdote));
		dispatch(setNotifiaction(anecdote.content, 3));
	};
	return (
		<div>
			{anecdotes.map((anecdote) => (
				<div key={anecdote.id}>
					<div>{anecdote.content}</div>
					<div>
						has {anecdote.votes}
						<button onClick={() => anecdoteVote(anecdote)}>vote</button>
					</div>
				</div>
			))}
		</div>
	);
}
