export function TableHead({ obj, setSortBy, setRpp, setPage, rpp, total }) {
  const rppOptions = [5, 10, 15, 20];
  var thList = [];
  for (var key in obj) {
    if (key !== 'id') {
      thList.push(key);
    }
  }
  if (!thList.length) {
    return (
      <thead>
        <tr>
          <td>List is empty!</td>
        </tr>
      </thead>
    );
  }
  return (
    <thead>
      <tr>
        <th>{total}</th>
        {thList.map((item) => (
          <th key={item}>
            <button onClick={(e) => setSortBy(item)}>{item}</button>
          </th>
        ))}
        <th>
          <select
            value={rpp}
            onChange={(e) => {
              setRpp(e.target.value);
              setPage(0);
            }}
          >
            {rppOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </th>
      </tr>
    </thead>
  );
}
