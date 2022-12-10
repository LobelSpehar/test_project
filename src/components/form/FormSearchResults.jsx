export function FormSearchResults({ searchRes, make, onSetMake }) {
  return (
    <ul>
      {searchRes.map((res) => (
        <li key={res.id}>
          <button
            type='button'
            className={make === res.id ? 'selected' : ''}
            onClick={(e) => {
              onSetMake(res.id);
            }}
          >
            {res.abrv}
          </button>
        </li>
      ))}
    </ul>
  );
}
