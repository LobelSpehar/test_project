export function SearchBar({ schemaName, search, searchHandler }) {
  return (
    <div className='searchBar'>
      <label htmlFor={`search${schemaName}`}>Search : </label>
      <br />
      <input
        id={`search${schemaName}`}
        value={search}
        onChange={searchHandler}
        onBlur={searchHandler}
        placeholder='Type here'
      ></input>
    </div>
  );
}
