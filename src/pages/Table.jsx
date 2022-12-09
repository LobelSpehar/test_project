import { useEffect, useState } from 'react';

import { APIUtils } from 'common/utilities';
import { TableRow, TableHead, Pagination } from 'components';

export function Table({ list, total, schemaName, refresh }) {
  const { delItem } = APIUtils();
  const [page, setPage] = useState(0);
  const [sortBy, setSortBy] = useState('name');
  const [rpp, setRpp] = useState(10);
  const onRefresh = () => {
    refresh(page, rpp, sortBy, schemaName);
  };
  useEffect(() => {
    onRefresh();
  }, [page, sortBy, rpp]);

  //after deleting last item on the page,go to previous page
  if (total - rpp * page === 0 && page !== 0) {
    setPage(page - 1);
  }

  return (
    <div>
      <h2>{schemaName}</h2>
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
