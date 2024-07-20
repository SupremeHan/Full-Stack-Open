import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createAnecdote } from '../services/requests';
import { useNotification } from '../hooks/useNotification';
import { setNotification } from '../utils/setNotificaiton';

const AnecdoteForm = () => {
	const queryClient = useQueryClient();
	const [_notification, notificationDispatch] = useNotification();

	const anecdoteMutation = useMutation({
		mutationFn: createAnecdote,
		onSuccess: (newAnecdote) => {
			const anecdotes = queryClient.getQueryData(['anecdotes']);
			queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote));
			setNotification(notificationDispatch, `Anecdote ${newAnecdote.content} is added`);
		},
		onError: (error) => {
			setNotification(notificationDispatch, error.response.data.error);
		}
	});

	const onCreate = (event) => {
		event.preventDefault();
		const content = event.target.anecdote.value;
		event.target.anecdote.value = '';

		anecdoteMutation.mutate({ content, votes: 0 });
	};

	return (
		<div>
			<h3>create new</h3>
			<form onSubmit={onCreate}>
				<input name="anecdote" />
				<button type="submit">create</button>
			</form>
		</div>
	);
};

export default AnecdoteForm;
