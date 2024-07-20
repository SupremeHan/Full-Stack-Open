export const setNotification = (dispatchFn, message) => {
	dispatchFn({
		type: 'SET_NOTIFICATION',
		payload: message
	});
	setTimeout(() => {
		dispatchFn({
			type: 'CLEAR_NOTIFICATION'
		});
	}, 3000);
};
