export function FormInput({ inputValue, inputName, onSetInput, isRequired }) {
  const eventHandler = (e) => {
    onSetInput(e.target.value);
  };
  return (
    <>
      <label htmlFor={inputName}>{inputName}</label>
      <br />
      <input
        required={isRequired}
        type='text'
        id={inputName}
        value={inputValue}
        onBlur={eventHandler}
        onChange={eventHandler}
      ></input>
      <br />
    </>
  );
}
