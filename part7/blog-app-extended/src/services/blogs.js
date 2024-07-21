import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = (newToken) => {
	token = `Bearer ${newToken}`;
};

const getAll = () => {
	const request = axios.get(baseUrl);
	return request.then((response) => response.data);
};

const create = async (newBlog) => {
	const config = {
		headers: { Authorization: token }
	};

	const response = await axios.post(baseUrl, newBlog, config);
	return response.data;
};

const update = async (updateBlog) => {
	const config = {
		headers: { Authorization: token }
	};

	const response = await axios.put(`${baseUrl}/${updateBlog.id}`, updateBlog, config);
	return response.data;
};

const remove = async (id) => {
	const config = {
		headers: { Authorization: token }
	};

	const response = await axios.delete(`${baseUrl}/${id}`, config);
	return response;
};

export default { getAll, create, setToken, update, remove };
