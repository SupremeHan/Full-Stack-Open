import { useDispatch, useSelector } from 'react-redux';
import { vote } from '../reducers/anecdoteReducer';

export function AnecdoteList() {
	const anecdotes = useSelector((state) => state.sort((anecdote1, anecdote2) => anecdote2.votes - anecdote1.votes));
	const dispatch = useDispatch();

	const anecdoteVote = (id) => {
		dispatch(vote(id));
	};
	return (
		<div>
			{anecdotes.map((anecdote) => (
				<div key={anecdote.id}>
					<div>{anecdote.content}</div>
					<div>
						has {anecdote.votes}
						<button onClick={() => anecdoteVote(anecdote.id)}>vote</button>
					</div>
				</div>
			))}
		</div>
	);
}
