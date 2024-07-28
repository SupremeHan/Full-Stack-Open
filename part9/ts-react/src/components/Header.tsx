interface HeaderProps {
	courseName: string;
}

export function Header({ courseName }: HeaderProps) {
	return <h1>{courseName}</h1>;
}
