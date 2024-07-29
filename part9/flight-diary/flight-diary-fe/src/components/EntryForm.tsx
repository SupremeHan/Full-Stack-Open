import { useState } from "react";
import { NewDiaryEntry, Visibility, Weather } from "../types";
import { addNewEntry } from "../services/entryService";
import { VisibilityFormGroup } from "./VisibilityFormGroup";
import { WeatherFormGroup } from "./WeatherFormGroup";

const initialState: NewDiaryEntry = {
  weather: Weather.Cloudy,
  date: "2017-06-01",
  visibility: Visibility.Great,
  comment: "",
};

export function EntryForm() {
  const [formData, setFormData] = useState<NewDiaryEntry>(initialState);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData(prevVal => ({
      ...prevVal,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    addNewEntry(formData);
    setFormData(initialState);
  };

  return (
    <div>
      <h3>Add new entry</h3>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
        <label>
          Date
          <input
            type="date"
            placeholder="YYYY-MM-DD"
            value={formData?.date}
            onChange={handleChange}
            name="date"
          />
        </label>

        <VisibilityFormGroup formData={formData} onChange={handleChange} />

        <WeatherFormGroup formData={formData} onChange={handleChange} />

        <label>
          Comment <input value={formData?.comment} onChange={handleChange} name="comment" />
        </label>
        <button type="submit" style={{ width: "150px", marginTop: "10px" }}>
          Add
        </button>
      </form>
    </div>
  );
}
