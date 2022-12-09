export function RppSelect({ rpp, selectHandler, rppOptions }) {
  return (
    <select value={rpp} onChange={selectHandler}>
      {rppOptions.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}
