import patientsData from '../data/patients';
import { NewPatient, PatientData } from '../types';
import { v1 as uuid } from 'uuid';

const getAllPatients = (): Omit<PatientData, 'ssn'>[] => {
	return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
		id,
		name,
		dateOfBirth,
		gender,
		occupation
	}));
};

const addPatient = (object: NewPatient) => {
	const id: string = uuid();

	const newPatient: PatientData = {
		id,
		...object
	};

	patientsData.push(newPatient);
	return newPatient;
};

export default { getAllPatients, addPatient };
