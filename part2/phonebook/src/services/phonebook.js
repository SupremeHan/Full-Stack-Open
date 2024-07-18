import axios from 'axios';

const baseUrl = '/api/persons';

const getAll = () => {
	const req = axios.get(baseUrl);
	return req.then((res) => res.data);
};

const createPerson = (newObj) => {
	const req = axios.post(baseUrl, newObj);
	return req.then((res) => res.data);
};

const deletePerson = (id) => {
	const req = axios.delete(`${baseUrl}/${id}`);
	return req.then((res) => res.data);
};

const updatePerson = (id, updatedObj) => {
	const req = axios.put(`${baseUrl}/${id}`, updatedObj);
	return req.then((res) => res.data);
};

export default {
	getAll,
	createPerson,
	deletePerson,
	updatePerson
};
