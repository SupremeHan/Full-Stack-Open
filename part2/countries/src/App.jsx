import { useEffect, useState } from 'react';
import { Countries } from './components/Countires';
import { getAllCountries } from './services/countiresService';

function App() {
	const [countrySerach, setCountrySearch] = useState('');
	const [countries, setCountries] = useState([]);
	const [selectedCountry, setSelectedCountry] = useState({});

	const handleCountrySearch = (event) => {
		setCountrySearch(event.target.value);
	};

	useEffect(() => {
		getAllCountries()
			.then((countries) => setCountries(countries))
			.catch((error) => console.error('Something unexpected happend', error));
	}, []);

	const filterCountries = !!countrySerach.length
		? countries.filter((country) => {
				return country.name.common.toLowerCase().includes(countrySerach.toLowerCase());
		  })
		: [];

	return (
		<div>
			<div>
				<label>Find countries</label>
				<input value={countrySerach} onChange={handleCountrySearch} />
			</div>
			<Countries countries={filterCountries} selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry} />
		</div>
	);
}

export default App;
