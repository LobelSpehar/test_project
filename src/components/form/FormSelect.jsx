export function FormSelect({ value, onSelect, options }) {
  return (
    <>
      <label>Make</label>
      <br />
      <select value={value} required onChange={(e) => onSelect(e.target.value)}>
        <option value='' hidden>
          Select make
        </option>
        {options.map((make) => (
          <option key={make.id} value={make.id}>
            {make.name}
          </option>
        ))}
      </select>
    </>
  );
}
