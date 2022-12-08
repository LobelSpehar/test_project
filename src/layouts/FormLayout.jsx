export function FormLayout({ children, submitHandler }) {
  return (
    <form onSubmit={submitHandler}>
      {children}
      <button>Submit</button>
    </form>
  );
}
