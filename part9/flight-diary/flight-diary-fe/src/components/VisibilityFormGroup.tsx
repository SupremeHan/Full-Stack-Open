import { NewDiaryEntry, Visibility } from "../types";

interface VisibilityFormGroupProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  formData: NewDiaryEntry;
}

export function VisibilityFormGroup({ formData, onChange }: VisibilityFormGroupProps) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <p>Visibility</p>
      <label>
        great
        <input
          type="radio"
          value={Visibility.Great}
          checked={formData.visibility === Visibility.Great}
          onChange={onChange}
          name="visibility"
        />
      </label>
      <label>
        good
        <input
          type="radio"
          value={Visibility.Good}
          checked={formData.visibility === Visibility.Good}
          onChange={onChange}
          name="visibility"
        />
      </label>

      <label>
        ok
        <input
          type="radio"
          value={Visibility.Ok}
          onChange={onChange}
          checked={formData.visibility === Visibility.Ok}
          name="visibility"
        />
      </label>
      <label>
        poor
        <input
          type="radio"
          value={Visibility.Poor}
          onChange={onChange}
          checked={formData.visibility === Visibility.Poor}
          name="visibility"
        />
      </label>
    </div>
  );
}
