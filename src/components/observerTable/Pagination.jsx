export function Pagination({ total, page, setPage, rpp }) {
  return (
    <div id='paging'>
      <button disabled={page < 1} onClick={(e) => setPage(page - 1)}>
        &larr;
      </button>
      <span>
        {page + 1}/{Math.ceil(total / rpp)}
      </span>
      <button
        disabled={page + 1 >= total / rpp}
        onClick={(e) => setPage(page + 1)}
      >
        &rarr;
      </button>
    </div>
  );
}
