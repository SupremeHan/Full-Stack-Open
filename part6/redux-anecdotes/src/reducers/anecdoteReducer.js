import { createSlice } from '@reduxjs/toolkit';
import anecdoteService from '../services/anecdotes';

const anecdoteSlice = createSlice({
	name: 'anecdotes',
	initialState: [],
	reducers: {
		vote(state, action) {
			return state.map((anecdote) => (anecdote.id === action.payload.id ? action.payload : anecdote));
		},
		addAnecdote(state, action) {
			state.push(action.payload);
		},

		setAnecdotes(state, action) {
			return action.payload;
		}
	}
});

export const voteAnecdote = (anecdote) => {
	return async (dispatch) => {
		const udpdateObj = {
			...anecdote,
			votes: anecdote.votes + 1
		};
		const updateVote = await anecdoteService.updateAnecdoteVote(udpdateObj);
		dispatch(vote(updateVote));
	};
};

export const createAnecdote = (content) => {
	return async (dispatch) => {
		const newAnecdote = await anecdoteService.createNew(content);
		dispatch(addAnecdote(newAnecdote));
	};
};

export const initializeAnecdotes = () => {
	return async (dispatch) => {
		const anecdotes = await anecdoteService.getAll();
		dispatch(setAnecdotes(anecdotes));
	};
};

export const { vote, addAnecdote, setAnecdotes } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;
