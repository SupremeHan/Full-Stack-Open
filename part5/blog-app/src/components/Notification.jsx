/* eslint-disable react/prop-types */
import './Notification.css';

export function Notification({ msg, type }) {
	if (!msg) {
		return null;
	}

	return <div className={`notification notification-${type}`}>{msg}</div>;
}
