import { CoursePart } from '../data';
import { Part } from './Part';

interface ContentProps {
	data: CoursePart[];
}

export function Content({ data }: ContentProps) {
	return (
		<div>
			{data.map((course) => (
				<Part data={course} />
			))}
		</div>
	);
}
