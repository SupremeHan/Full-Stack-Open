import { useSelector } from 'react-redux';

export function Notification() {
	const message = useSelector((state) => state.notification);

	if (!message) return null;

	const style = {
		border: 'solid',
		padding: 10,
		borderWidth: 1,
		width: 'max-content',
		marginBottom: '10px'
	};
	return <div style={style}>{message}</div>;
}
