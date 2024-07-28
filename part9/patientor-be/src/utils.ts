import { Gender, NewPatient } from './types';

const isString = (text: unknown): text is string => {
	return typeof text === 'string' || text instanceof String;
};

const parseName = (name: unknown): string => {
	if (!isString(name)) {
		throw new Error('Incorrect or missing name');
	}

	return name;
};

const isGender = (param: string): param is Gender => {
	return Object.values(Gender)
		.map((g) => g.toString())
		.includes(param);
};

const parseGender = (gender: unknown): Gender => {
	if (!isString(gender) || !isGender(gender)) {
		throw new Error('Incorrect gender:' + gender);
	}

	return gender;
};

const parseOccupation = (occupation: unknown): string => {
	if (!isString(occupation)) {
		throw new Error('Incorrect value for occupation: ' + occupation);
	}

	return occupation;
};

const isValidDate = (date: string) => {
	const regex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;

	return regex.test(date);
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
	if (!isString(dateOfBirth) || !isValidDate(dateOfBirth)) {
		throw new Error('Incorrect value or format of date: ' + dateOfBirth);
	}

	return dateOfBirth;
};

const parseSnn = (snn: unknown): string => {
	if (!isString(snn)) {
		throw new Error('Incorrect ssn: ' + snn);
	}

	return snn;
};

const toNewPatientEntry = (object: unknown): NewPatient => {
	if (!object || typeof object !== 'object') {
		throw new Error('Incorrect or missing data');
	}

	if ('name' in object && 'gender' in object && 'occupation' in object && 'dateOfBirth' in object && 'ssn' in object) {
		const newPatient: NewPatient = {
			name: parseName(object.name),
			gender: parseGender(object.gender),
			occupation: parseOccupation(object.occupation),
			dateOfBirth: parseDateOfBirth(object.dateOfBirth),
			ssn: parseSnn(object.ssn)
		};
		return newPatient;
	}

	throw new Error('Incorrect data: a field missing');
};

export default toNewPatientEntry;
