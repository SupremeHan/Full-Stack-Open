/* eslint-disable react/prop-types */

import { useParams } from 'react-router-dom';

export const Anecdote = ({ anecdotes }) => {
	const { id } = useParams();
	const anecdote = anecdotes.find((anecdote) => anecdote.id === parseInt(id));

	if (!anecdote) return null;

	return (
		<div>
			<h3>{anecdote.content}</h3>
			<p>By: {anecdote.author}</p>
		</div>
	);
};
