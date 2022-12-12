import { RppSelect, SortByBtn } from 'components';

export function TableHead({ obj, setSortBy, setRpp, setPage, rpp, total }) {
  const rppOptions = [5, 10, 15, 20];
  var thList = [];

  //create heading for each property in object except id
  for (var key in obj) {
    if (key !== 'id') {
      thList.push(key);
    }
  }
  const selectHandler = (e) => {
    setRpp(e.target.value);
    setPage(0);
  };

  return thList.length ? (
    <thead>
      <tr>
        <th>{total}</th>
        {thList.map((item) => (
          <th key={item}>
            <SortByBtn onSetSortBy={setSortBy} item={item} />
          </th>
        ))}
        <th>
          <RppSelect
            rpp={rpp}
            selectHandler={selectHandler}
            rppOptions={rppOptions}
          />
        </th>
      </tr>
    </thead>
  ) : (
    <thead>
      <tr>
        <th>List is empty!</th>
      </tr>
    </thead>
  );
}
