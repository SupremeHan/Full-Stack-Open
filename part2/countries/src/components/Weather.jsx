import { generateImgUrl } from '../utils';

export function Weather({ weather }) {
	return (
		<div>
			<h2>Weather in {weather.name}</h2>
			<p>Temerature: {weather.main.temp} Celsius</p>
			<img src={generateImgUrl(weather.weather[0].icon)} alt={weather.weather[0].description} width={70} />
			<p>Wind {weather.wind.speed} m/s</p>
		</div>
	);
}
