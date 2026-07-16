import { useId, useState } from "react";

function Form() {
  const [inputValue, setInputValue] = useState("");

  function handleOnchange(event) {
    setInputValue(event.target.value);
  }
  
  function handelSubmit(event) {
    event.preventDefault();
    alert("Submited");
    setInputValue("");
  }

  const inputId = useId();

  return (
    <form onSubmit={handelSubmit} className="text-left p-3">
      <p>What need to?</p>
      <label htmlFor={inputId}></label>
      <input type="text" name="" id={inputId} onChange={handleOnchange} value={inputValue} />
      <p>Typing: {inputValue}</p>
      <button className="btn" type="button" onClick={() => alert("Hi")}>Hi</button><br/>
      <button className="btn" type="submit">Send</button>
    </form>
  );
}
export default Form;