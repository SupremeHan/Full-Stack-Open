export function Total({ parts }) {
	return (
		<div>
			<strong>{`Total of ${parts.reduce((acc, curr) => acc + curr.exercises, 0)} exercises`}</strong>
		</div>
	);
}
