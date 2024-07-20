import { useContext } from 'react';
import NotificationContext from '../context/NotificationContext';

export const useNotification = () => {
	const [notification, notificationDispatch] = useContext(NotificationContext);

	return [notification, notificationDispatch];
};
