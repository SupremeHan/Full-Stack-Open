import { NewDiaryEntry, Weather } from "../types";

interface WeatherFormGroupProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  formData: NewDiaryEntry;
}

export function WeatherFormGroup({ formData, onChange }: WeatherFormGroupProps) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <p>Weather</p>
      <label>
        Cloudy
        <input
          type="radio"
          value={Weather.Cloudy}
          checked={formData.weather === Weather.Cloudy}
          onChange={onChange}
          name="weather"
        />
      </label>
      <label>
        Rainy
        <input
          type="radio"
          value={Weather.Rainy}
          checked={formData.weather === Weather.Rainy}
          onChange={onChange}
          name="weather"
        />
      </label>
      <label>
        Stormy
        <input
          type="radio"
          value={Weather.Stormy}
          checked={formData.weather === Weather.Stormy}
          onChange={onChange}
          name="weather"
        />
      </label>
      <label>
        Sunny
        <input
          type="radio"
          value={Weather.Sunny}
          checked={formData.weather === Weather.Sunny}
          onChange={onChange}
          name="weather"
        />
      </label>
      <label>
        Windy
        <input
          type="radio"
          value={Weather.Windy}
          checked={formData.weather === Weather.Windy}
          onChange={onChange}
          name="weather"
        />
      </label>
    </div>
  );
}
