import { useEffect } from 'react';

import { observer } from 'mobx-react';

import { TableRow, TableHead, Pagination, SearchBar } from 'components';
import { APIUtils } from 'common/utilities';
import { dbStore } from 'stores';

export const ObserverTable = observer(({ observable = dbStore, options }) => {
  const { delItem } = APIUtils();
  let renderCount = 0;

  //making sure useEffect makes only 1 api call on mount
  useEffect(() => {
    if (!renderCount) {
      observable.setSchemaName(options[0]);
    }
    renderCount++;
  }, []);

  const searchHandler = (e) => {
    observable.setSearch(e.target.value);
    if (observable.page) {
      observable.setPage(0);
    }
  };
  return (
    <div>
      <div id='tableNav'>
        {options.map((option) => (
          <h2
            key={option}
            className={option === observable.schemaName ? 'active' : ''}
          >
            <button
              disabled={option === observable.schemaName}
              className={option === observable.schemaName ? 'active' : ''}
              onClick={(e) => observable.setSchemaName(option)}
            >
              {option}
            </button>
          </h2>
        ))}
        {observable.loading ? <h2>Loading...</h2> : null}
      </div>

      <SearchBar search={observable.search} searchHandler={searchHandler} />
      <table>
        <TableHead observable={observable} />
        <tbody>
          {observable.list.map((item, index) => (
            <TableRow
              key={item.id}
              index={index}
              item={item}
              onDelete={delItem}
              observable={observable}
            />
          ))}
        </tbody>
      </table>
      {observable.total ? <Pagination observable={observable} /> : null}
    </div>
  );
});
