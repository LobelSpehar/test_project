import { useEffect, useState } from 'react';

import { APIUtils } from 'common/utilities';
import { TableRow, TableHead, Pagination, SearchBar } from 'components';

export function ObserverTable({ list, total, schemaName, refresh }) {
  const { delItem } = APIUtils();
  const [page, setPage] = useState(0);
  const [sortBy, setSortBy] = useState('name');
  const [rpp, setRpp] = useState(10);
  const [search, setSearch] = useState('');

  const onRefresh = () => {
    refresh(page, rpp, sortBy, search, schemaName);
  };

  useEffect(() => {
    onRefresh();
  }, [page, sortBy, rpp, search]);

  //after deleting last item on the page,go to previous page
  if (total - rpp * page === 0 && page !== 0) {
    setPage(page - 1);
  }
  const searchHandler = (e) => {
    setSearch(e.target.value);
    if (page) {
      setPage(0);
    }
  };
  return (
    <div>
      <h2>{schemaName}</h2>
      <SearchBar
        schemaName={schemaName}
        search={search}
        searchHandler={searchHandler}
      />
      <table>
        <TableHead
          obj={list[0]}
          setSortBy={setSortBy}
          setRpp={setRpp}
          setPage={setPage}
          rpp={rpp}
          total={total}
        />
        <tbody>
          {list.map((item, index) => (
            <TableRow
              key={item.id}
              position={page * rpp + index + 1}
              item={item}
              onDelete={delItem}
              onRefresh={onRefresh}
              schemaName={schemaName}
              search={search}
            />
          ))}
        </tbody>
      </table>
      {total ? (
        <Pagination total={total} page={page} setPage={setPage} rpp={rpp} />
      ) : null}
    </div>
  );
}
