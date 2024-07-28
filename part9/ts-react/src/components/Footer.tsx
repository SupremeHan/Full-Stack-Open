interface FooterProps {
	totalExercises: number;
}

export function Footer({ totalExercises }: FooterProps) {
	return <p>Number of exercises {totalExercises}</p>;
}
