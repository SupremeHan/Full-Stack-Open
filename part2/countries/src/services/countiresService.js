import axios from 'axios';

const BASE_URL = 'https://studies.cs.helsinki.fi/restcountries';

const getAllCountries = () => {
	const req = axios.get(`${BASE_URL}/api/all`);

	return req.then((res) => res.data);
};

const getCountryWeather = (lat, lon) => {
	const req = axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${import.meta.env.VITE_API_KEY}&units=metric`);

	return req.then((res) => res.data);
};

export { getAllCountries, getCountryWeather };
