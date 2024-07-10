import { Country } from './Country';
import { isObjectEmpty } from '../utils';

export function Countries({ countries, selectedCountry, setSelectedCountry }) {
	if (countries.length === 1) {
		return <Country country={countries[0]} />;
	}

	// We have initilize our selectCountry state to {}
	// so we have to check if there is properties in the object
	// if not there is noting to show and component shouldnt be render
	if (!isObjectEmpty(selectedCountry)) {
		return <Country country={selectedCountry} />;
	}

	return (
		<div>
			{countries.length > 10 ? (
				<p>Too many matches, specify another filter</p>
			) : (
				countries.map((country, index) => {
					return (
						<div key={index} style={{ display: 'flex', alignItems: 'center' }}>
							<p>{country.name.common}</p>
							<button onClick={() => setSelectedCountry(country)}>show</button>
						</div>
					);
				})
			)}
		</div>
	);
}
