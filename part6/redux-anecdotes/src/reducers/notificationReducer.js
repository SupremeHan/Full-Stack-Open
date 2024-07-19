import { createSlice } from '@reduxjs/toolkit';

let timeoutID = '';
const notificationSlice = createSlice({
	name: 'notification',
	initialState: '',
	reducers: {
		createNotification(state, action) {
			return action.payload;
		},
		clearNotification() {
			return '';
		}
	}
});

export const setNotifiaction = (content, timer) => {
	const MILLISECONDS = 1000;
	return (dispatch) => {
		clearTimeout(timeoutID);
		dispatch(createNotification(content));
		timeoutID = setTimeout(() => {
			dispatch(clearNotification());
		}, timer * MILLISECONDS);
	};
};

export const { createNotification, clearNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
