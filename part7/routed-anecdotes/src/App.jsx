import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { Menu } from './components/Menu';
import { AnecdoteList } from './components/AnecdoteList';
import { Footer } from './components/Footer';
import { About } from './components/About';
import { CreateAnecdote } from './components/CreateAnecdote';
import { Anecdote } from './components/Anecdote';

const App = () => {
	const [anecdotes, setAnecdotes] = useState([
		{
			content: 'If it hurts, do it more often',
			author: 'Jez Humble',
			info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
			votes: 0,
			id: 1
		},
		{
			content: 'Premature optimization is the root of all evil',
			author: 'Donald Knuth',
			info: 'http://wiki.c2.com/?PrematureOptimization',
			votes: 0,
			id: 2
		}
	]);

	const [notification, setNotification] = useState('');
	const navigate = useNavigate();

	const addNew = (anecdote) => {
		anecdote.id = Math.round(Math.random() * 10000);
		setAnecdotes(anecdotes.concat(anecdote));
		navigate('/');
		setNotification(`A new anecdote ${anecdote.content} created!`);

		setTimeout(() => {
			setNotification('');
		}, 3000);
	};

	const anecdoteById = (id) => anecdotes.find((a) => a.id === id);

	const vote = (id) => {
		const anecdote = anecdoteById(id);

		const voted = {
			...anecdote,
			votes: anecdote.votes + 1
		};

		setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
	};

	return (
		<div>
			<h1>Software anecdotes</h1>
			<Menu />
			{notification ? <h5>{notification}</h5> : null}
			<Routes>
				<Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
				<Route path="/create" element={<CreateAnecdote addNew={addNew} />} />
				<Route path="/about" element={<About />} />
				<Route path="/anecdotes/:id" element={<Anecdote anecdotes={anecdotes} />} />
			</Routes>
			<Footer />
		</div>
	);
};

export default App;
