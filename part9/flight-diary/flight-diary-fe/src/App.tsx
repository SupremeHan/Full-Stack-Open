import { useEffect, useState } from "react";
import { DiaryEntry } from "./types";
import { getAllEntires } from "./services/entryService";
import { EntryForm } from "./components/EntryForm";

function App() {
  const [entries, setEnties] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    getAllEntires()
      .then(data => setEnties(data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <EntryForm />
      <h3>Diary entries</h3>
      {entries.map(e => {
        return (
          <div key={e.id}>
            <h4>{e.date}</h4>
            <p>visibility: {e.visibility}</p>
            <p>weather: {e.weather}</p>
          </div>
        );
      })}
    </div>
  );
}

export default App;
