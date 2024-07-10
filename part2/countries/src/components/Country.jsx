import { useEffect } from 'react';
import { getCountryWeather } from '../services/countiresService';
import { useState } from 'react';
import { isObjectEmpty } from '../utils';
import { Weather } from './Weather';

export function Country({ country }) {
	const [weather, setWeather] = useState({});

	useEffect(() => {
		getCountryWeather(country.latlng[0], country.latlng[1])
			.then((res) => setWeather(res))
			.catch((error) => console.error('Failed to get the weather', error));
	}, []);

	return (
		<div>
			<h1>{country.name.common}</h1>
			<div>
				<p>Capital: {country.capital[0]}</p>
				<p>Area: {country.area}</p>
			</div>
			<div>
				<h3>Languages</h3>
				<ul>
					{Object.keys(country.languages).map((language) => (
						<li key={language}>{country.languages[language]}</li>
					))}
				</ul>
			</div>
			<img src={country.flags.png} alt={country.flags.alt} width={150} />

			{!isObjectEmpty(weather) ? <Weather weather={weather} /> : null}
		</div>
	);
}
