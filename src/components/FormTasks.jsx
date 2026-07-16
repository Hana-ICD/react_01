import { useState } from "react";
function FormTasks(props) {
  const [name, setName] = useState("");

  function handleSubmit(e) {
    e.preventDefault();    
    if(name.trim() !== "") {
      console.log(name, 'name 111');
      console.log(props, 'props 111');
      props.addTask(name);
      setName("");
    }
  }

  function handleOnChange(e) {
    setName(e.target.value)
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <p>What need to?</p>
      <input 
        type="text" 
        name="nameTask"
        value={name} 
        onChange={(e) => {setName(e.target.value)}}
      />
      <button className="btn" type="submit">Add</button>
    </form>
  );
}

export default FormTasks;