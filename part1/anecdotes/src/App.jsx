import { useState } from 'react';

const Button = ({ text, onClick }) => {
	return <button onClick={onClick}>{text}</button>;
};

const HighestAnecdote = ({ allVotes, anecdotes }) => {
	const highestCountVote = Math.max(...allVotes);
	const highestCountVoteIndex = allVotes.indexOf(highestCountVote);
	const highestAnecdote = anecdotes[highestCountVoteIndex];

	if (highestCountVote === 0) {
		return <div>No votes present</div>;
	}

	return (
		<div>
			<h2>Anecdote with most votes</h2>
			<p>{highestAnecdote}</p>
		</div>
	);
};

const App = () => {
	const anecdotes = [
		'If it hurts, do it more often.',
		'Adding manpower to a late software project makes it later!',
		'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
		'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
		'Premature optimization is the root of all evil.',
		'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
		'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
		'The only way to go fast, is to go well.'
	];

	const [selected, setSelected] = useState(0);
	const [allVotes, setAllVotes] = useState(Array(anecdotes.length).fill(0));

	const handleClick = () => {
		const getRandomNum = () => {
			const max = anecdotes.length - 1;
			const min = 0;
			return Math.floor(Math.random() * (max - min + 1)) + min;
		};

		setSelected(getRandomNum());
	};

	const handleVoteClick = () => {
		const allVotesCopy = [...allVotes];
		allVotesCopy[selected] += 1;
		setAllVotes(allVotesCopy);
	};

	return (
		<div>
			<h2>Anecdote of the day</h2>
			<p>{anecdotes[selected]}</p>
			<p>{`has ${allVotes[selected]} votes`}</p>
			<Button onClick={handleVoteClick} text="vote" />
			<Button onClick={handleClick} text="next anecdote" />

			<HighestAnecdote allVotes={allVotes} anecdotes={anecdotes} />
		</div>
	);
};

export default App;
