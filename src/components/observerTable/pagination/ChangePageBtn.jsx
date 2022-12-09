export function ChangePageBtn({ isDisabled, clickHandler, value, arrow }) {
  return (
    <button disabled={isDisabled} onClick={(e) => clickHandler(value)}>
      {arrow}
    </button>
  );
}
