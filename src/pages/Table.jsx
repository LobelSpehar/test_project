import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { observer } from 'mobx-react';

import { APIUtils } from 'common/utilities';
import { TableRow, TableHead, Pagination } from 'components';

export const Table = observer(({ observable, schemaName }) => {
  const { fetchItems, delItem } = APIUtils();
  const [page, setPage] = useState(0);
  const [sortBy, setSortBy] = useState('name');
  const [rpp, setRpp] = useState(10);
  const pathname = useLocation().pathname;

  const list = observable.data.list;
  const total = observable.data.total;
  const refresh = () => {
    fetchItems(page, rpp, sortBy, schemaName, observable);
  };
  useEffect(() => {
    refresh();
  }, [page, sortBy, rpp, pathname]);

  if (total - rpp * page === 0 && page !== 0) {
    setPage(page - 1);
  }
  return (
    <>
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
              page={page}
              rpp={rpp}
              key={item.id}
              item={item}
              index={index}
              onDelete={delItem}
              onRefresh={refresh}
              schemaName={schemaName}
            />
          ))}
        </tbody>
      </table>
      {total ? (
        <Pagination total={total} page={page} setPage={setPage} rpp={rpp} />
      ) : null}
    </>
  );
});
