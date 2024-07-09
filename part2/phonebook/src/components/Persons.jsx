export function Persons({ persons, onDelete }) {
	return (
		<div>
			{persons.map((person) => (
				<div key={person.id}>
					<p>
						{person.name} {person.number}
					</p>
					<button onClick={() => onDelete(person.id, person.name)}>delete</button>
				</div>
			))}
		</div>
	);
}
