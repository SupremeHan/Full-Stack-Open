import { useState } from 'react';

export function useNotification() {
	const [message, setMessage] = useState({ msg: '', type: '' });

	const handleSetMessage = ({ msg, type }) => {
		setMessage({
			msg,
			type
		});
		setTimeout(() => {
			setMessage({
				msg: '',
				type: ''
			});
		}, 3000);
	};

	return {
		message,
		setMessage: handleSetMessage
	};
}
