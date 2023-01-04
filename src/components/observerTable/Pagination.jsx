import { ChangePageBtn } from 'components';

export function Pagination({ observable }) {
  return (
    <div id='paging'>
      <ChangePageBtn
        isDisabled={observable.page < 1}
        clickHandler={observable.setPage}
        value={-1}
        arrow={<>&larr;</>}
      />
      <span>
        {observable.page + 1}/{Math.ceil(observable.total / observable.rpp)}
      </span>
      <ChangePageBtn
        isDisabled={observable.page + 1 >= observable.total / observable.rpp}
        clickHandler={observable.setPage}
        value={1}
        arrow={<>&rarr;</>}
      />
    </div>
  );
}
