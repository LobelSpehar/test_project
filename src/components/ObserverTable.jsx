import { useEffect } from 'react';

import { APIUtils } from 'common/utilities';
import { TableRow, TableHead, Pagination, SearchBar } from 'components';
import { observer } from 'mobx-react';
import { dbStore } from 'stores';

export const ObserverTable = observer(({ observable = dbStore, options }) => {
  const { delItem } = APIUtils();

  //making sure useEffect makes only 1 api call on mount
  useEffect(() => {
    if (!observable.schemaName) {
      observable.setSchemaName(options[1]);
    }
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
