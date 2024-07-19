import { useDispatch } from 'react-redux';
import { filter } from '../reducers/filterReduces';

export function Filter() {
	const dispatch = useDispatch();

	const handleChange = (event) => {
		dispatch(filter(event.target.value));
	};
	const style = {
		marginBottom: 10
	};

	return (
		<div style={style}>
			filter <input onChange={handleChange} />
		</div>
	);
}
