import { configureStore } from '@reduxjs/toolkit';

//reducers
import anecdotesReducer from './reducers/anecdoteReducer';
import filterReducer from './reducers/filterReduces';
import notificationReducer from './reducers/notificationReducer';

const store = configureStore({
	reducer: {
		anecdotes: anecdotesReducer,
		filter: filterReducer,
		notification: notificationReducer
	}
});

export default store;
