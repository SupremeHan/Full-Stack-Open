import { useState } from 'react';

export function useNotification() {
	const [message, setMessage] = useState({ text: '', type: '' });

	const handleSetMessage = ({ text, type }) => {
		setMessage({
			text,
			type
		});
		setTimeout(() => {
			setMessage({
				text: null,
				type: ''
			});
		}, 3000);
	};

	return {
		message,
		setMessage: handleSetMessage
	};
}
