import { useState } from 'react';
import { isEqual } from 'lodash';
import { Filter } from './components/Filter';
import { Form } from './components/Form';
import { Persons } from './components/Persons';

const App = () => {
	const [persons, setPersons] = useState([
		{ name: 'Arto Hellas', number: '040-123456', id: 1 },
		{ name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
		{ name: 'Dan Abramov', number: '12-43-234345', id: 3 },
		{ name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
	]);
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [searchName, setSearchName] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		const newPerson = {
			name: newName,
			number: newNumber,
			id: persons.length + 1
		};

		const isObjEqual = persons.some((person) => isEqual(person.name, newPerson.name));
		const isFieldMissing = !newName.length || !newNumber.length;

		if (isFieldMissing) {
			alert('All fields must be filled');
			return;
		}

		if (isObjEqual) {
			alert(`${newName} is already added to phonebook`);
			return;
		} else {
			setPersons((prevVal) => [...prevVal, newPerson]);
			setNewName('');
			setNewNumber('');
		}
	};

	const handleNameChange = (e) => {
		setNewName(e.target.value);
	};

	const handleNumberChange = (e) => {
		setNewNumber(e.target.value);
	};

	const handleFilterChange = (e) => {
		setSearchName(e.target.value);
	};

	const filteredNames = persons.filter((person) => person.name.toLocaleLowerCase().includes(searchName.toLocaleLowerCase()));

	return (
		<div>
			<h2>Phonebook</h2>
			<Filter value={searchName} onChange={handleFilterChange} />

			<h3>add a new</h3>
			<Form onSubmit={handleSubmit} name={newName} onNameChange={handleNameChange} number={newNumber} onNumberChange={handleNumberChange} />

			<h3>Numbers</h3>
			<Persons persons={filteredNames} />
		</div>
	);
};

export default App;
