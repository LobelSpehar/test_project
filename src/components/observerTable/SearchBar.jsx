export function SearchBar({ search, searchHandler }) {
  return (
    <div className='searchBar'>
      <label htmlFor={`search`}>Search : </label>
      <br />
      <input
        id={`search`}
        value={search}
        onChange={searchHandler}
        onBlur={searchHandler}
        placeholder='Type here'
      ></input>
    </div>
  );
}
