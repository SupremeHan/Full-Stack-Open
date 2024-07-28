import { CoursePart } from '../data';

interface PartProps {
	data: CoursePart;
}

export function Part({ data }: PartProps) {
	switch (data.kind) {
		case 'basic':
			return (
				<div>
					<p>
						{data.name} {data.exerciseCount}
					</p>
					<p>{data.description}</p>
				</div>
			);
		case 'background':
			return (
				<div>
					<p>
						{data.name} {data.exerciseCount}
					</p>
					<p>{data.description}</p>
					<p>{data.backgroundMaterial}</p>
				</div>
			);
		case 'group':
			return (
				<div>
					<p>
						{data.name} {data.exerciseCount}
					</p>
					<p>
						{data.kind} {data.groupProjectCount}
					</p>
				</div>
			);
		case 'special':
			return (
				<div>
					<p>
						{data.name} {data.exerciseCount}
					</p>
					<p>{data.description}</p>
					{data.requirements.map((req) => (
						<p>{req}</p>
					))}
				</div>
			);
		default:
			return null;
	}
}
