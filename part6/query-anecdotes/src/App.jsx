import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import { getAnecdotes, updateAnecdoteVote } from './services/requests';
import { useNotification } from './hooks/useNotification';
import { setNotification } from './utils/setNotificaiton';

const App = () => {
	const queryClient = useQueryClient();
	const [_notification, notificationDispatch] = useNotification();

	const { isPending, isError, data, error } = useQuery({
		queryKey: ['anecdotes'],
		queryFn: () => getAnecdotes()
	});

	const voteMutation = useMutation({
		mutationFn: updateAnecdoteVote,
		onSuccess: (updatedAnecdote) => {
			const anecdotes = queryClient.getQueryData(['anecdotes']);
			queryClient.setQueryData(
				['anecdotes'],
				anecdotes.map((anecdote) => (anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote))
			);
			setNotification(notificationDispatch, `Anecdote '${updatedAnecdote.content}' voted`);
		}
	});

	const handleVote = (anecdote) => {
		const updateObj = {
			...anecdote,
			votes: anecdote.votes + 1
		};
		voteMutation.mutate(updateObj);
	};

	if (isPending) {
		return <span>Loading...</span>;
	}

	if (isError) {
		return <span>Anecdote service not available due to probles in server</span>;
	}

	return (
		<div>
			<h3>Anecdote app</h3>

			<Notification />
			<AnecdoteForm />

			{data.map((anecdote) => (
				<div key={anecdote.id}>
					<div>{anecdote.content}</div>
					<div>
						has {anecdote.votes}
						<button onClick={() => handleVote(anecdote)}>vote</button>
					</div>
				</div>
			))}
		</div>
	);
};

export default App;
