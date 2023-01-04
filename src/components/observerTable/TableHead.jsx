import { RppSelect } from 'components';

export function TableHead({ observable }) {
  const rppOptions = [5, 10, 15, 20];
  var thList = [];

  //create heading for each property in object except id
  for (var key in observable.list[0]) {
    if (key !== 'id') {
      thList.push(key);
    }
  }
  const selectHandler = (e) => {
    observable.setRpp(e.target.value);
    observable.setPage(0);
  };

  return thList.length ? (
    <thead>
      <tr>
        <th>{observable.total}</th>
        {thList.map((item) => (
          <th key={item}>
            <button
              onClick={(e) => {
                observable.setSortBy(item);
              }}
            >
              {item}
              {observable.sortBy === item ? (
                observable.asc ? (
                  <> &darr;</>
                ) : (
                  <> &uarr;</>
                )
              ) : (
                ''
              )}
            </button>
          </th>
        ))}
        <th>
          <RppSelect
            rpp={observable.rpp}
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
