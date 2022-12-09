import { ChangePageBtn } from 'components';

export function Pagination({ total, page, setPage, rpp }) {
  return (
    <div id='paging'>
      <ChangePageBtn
        isDisabled={page < 1}
        clickHandler={setPage}
        value={page - 1}
        arrow={<>&larr;</>}
      />
      <span>
        {page + 1}/{Math.ceil(total / rpp)}
      </span>
      <ChangePageBtn
        isDisabled={page + 1 >= total / rpp}
        clickHandler={setPage}
        value={page + 1}
        arrow={<>&rarr;</>}
      />
    </div>
  );
}
