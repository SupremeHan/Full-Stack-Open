import { useState, useEffect } from 'react';
import { isEqual } from 'lodash';
import { Filter } from './components/Filter';
import { Form } from './components/Form';
import { Persons } from './components/Persons';
import phoneBookService from './services/phonebook';
import { v4 as uuidv4 } from 'uuid';

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [searchName, setSearchName] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		const newPerson = {
			name: newName,
			number: newNumber,
			id: uuidv4()
		};

		const personExists = persons.find((person) => isEqual(person.name, newPerson.name));

		const isFieldMissing = !newName.length || !newNumber.length;

		if (isFieldMissing) {
			alert('All fields must be filled');
			return;
		}

		if (personExists) {
			if (window.confirm(`${personExists.name} is already added to phonebook, replace the old number with the new one?`)) {
				phoneBookService.updatePerson(personExists.id, { ...personExists, number: newPerson.number }).then((res) => {
					setPersons((prevState) => {
						return prevState.map((person) => {
							if (person.id === res.id) {
								return res;
							}
							return person;
						});
					}),
						resetInputFields();
				});
			}
		} else {
			phoneBookService.createPerson(newPerson).then((person) => {
				setPersons((prevState) => [...prevState, person]);
				resetInputFields();
			});
		}
	};

	const resetInputFields = () => {
		setNewName('');
		setNewNumber('');
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

	const onDelete = (id, name) => {
		if (window.confirm(`Are you sure you want to delete ${name}`)) {
			phoneBookService.deletePerson(id).then((res) => {
				setPersons((prevVal) => prevVal.filter((person) => person.id !== res.id));
			});
		}
	};

	const filteredNames = persons.filter((person) => {
		return person.name.toLocaleLowerCase().includes(searchName.toLocaleLowerCase());
	});

	useEffect(() => {
		phoneBookService.getAll().then((res) => setPersons(res));
	}, []);

	return (
		<div>
			<h2>Phonebook</h2>
			<Filter value={searchName} onChange={handleFilterChange} />

			<h3>add a new</h3>
			<Form onSubmit={handleSubmit} name={newName} onNameChange={handleNameChange} number={newNumber} onNumberChange={handleNumberChange} />

			<h3>Numbers</h3>
			<Persons persons={filteredNames} onDelete={onDelete} />
		</div>
	);
};

export default App;
