import { useState } from 'react';

export function SortByBtn({ onSetSortBy, item }) {
  const [order, setOrder] = useState(false);
  return (
    <button
      onClick={(e) => {
        onSetSortBy(item + (order ? ' ASC' : ' DESC'));
        setOrder(!order);
      }}
    >
      {item}
    </button>
  );
}
