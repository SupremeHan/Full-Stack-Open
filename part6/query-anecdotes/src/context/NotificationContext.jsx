/* eslint-disable react/prop-types */
import { createContext, useReducer } from 'react';

const notificationReducer = (state, action) => {
	switch (action.type) {
		case 'SET_NOTIFICATION':
			return {
				message: action.payload
			};

		case 'CLEAR_NOTIFICATION':
			return {
				message: ''
			};
	}
};

const NotificationContext = createContext();

export const NotificationContextProvider = ({ children }) => {
	const [notification, notificationDispatch] = useReducer(notificationReducer, { message: '' });

	return <NotificationContext.Provider value={[notification, notificationDispatch]}>{children}</NotificationContext.Provider>;
};

export default NotificationContext;
