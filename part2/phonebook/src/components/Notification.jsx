import './Notification.css';

export function Notification({ text, type }) {
	if (!text) {
		return null;
	}

	return <div className={`notification notification-${type}`}>{text}</div>;
}
