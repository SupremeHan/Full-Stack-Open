import { Part } from './Part';

export function Content({ parts }) {
	return (
		<div>
			{parts.map((part, index) => (
				<Part part={part} key={index} />
			))}
		</div>
	);
}
