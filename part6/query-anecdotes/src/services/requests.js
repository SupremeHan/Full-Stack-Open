import axios from 'axios';

const BASE_URL = 'http://localhost:3001/anecdotes';

export const getAnecdotes = () => {
	return axios.get(BASE_URL).then((res) => res.data);
};

export const createAnecdote = (newAnecdote) => {
	return axios.post(BASE_URL, newAnecdote).then((res) => res.data);
};

export const updateAnecdoteVote = (updateAnecdote) => {
	return axios.put(`${BASE_URL}/${updateAnecdote.id}`, updateAnecdote).then((res) => res.data);
};
