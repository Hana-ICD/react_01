import { useEffect, useRef, useState } from "react";

/* eslint-disable react-hooks/refs */
function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;  
  });    
  return ref.current;
}
/* eslint-enable react-hooks/refs */ 
// row: eslint-enable react-hooks/refs co tac dung tat rang buoc chat che cua react-hook, nên để tại function đó thôi tránh ảnh hưởng nơi khác

function Todo(props) {
  const [isEditing, setEditing] = useState(false);
  const [newName, setNewName] = useState("");
  const [err, setErr] = useState(false);
  const editFieldRef = useRef(null);
  const editButtonRef = useRef(null);
  const wasEditing = usePrevious(isEditing);

  function changeNewName(e) {
    setNewName(e.target.value);
  }

  function submitEditing(e) {
    e.preventDefault();
    if (newName.trim() !== "") {  // remove space
      props.editTask(props.id, newName);
      setEditing(false);
      setNewName("");
      setErr(false);
    }
    else {
      setErr(true);
    }
  }

  const viewTemplate = (
    <>
      <label htmlFor="">
        <input
          type="checkbox"
          id={props.id}
          defaultChecked={props.completed}
          onChange={() => props.handleTaskComplete(props.id)}
          className="mr-2"
        />
        {props.name}
      </label>
      <div className="flex gap-3 ml-5">
        <button className="btn ring-black" type="button" onClick={() => { setEditing(true) }} ref={editButtonRef}>Edit</button>
        <button className="btn btn-delete" type="button" onClick={() => props.deleteTask(props.id)}>Delete</button>
      </div>
    </>
  );
  const editTemplate = (
    <>
      <form onSubmit={submitEditing} className="my-2 py-1 pr-5 pl-5 border-2 border-dashed inline-block">
        <h3 className="mb-1">New name for <strong>{props.name}</strong></h3>
        <input
          type="text"
          className="mr-2"
          value={newName}
          onChange={changeNewName}
          ref={editFieldRef}
        />
        {err && (
          <p className="error_requre text-pink-300">*Require</p>
        )}
        <div className="flex gap-3 mt-2">
          <button className="btn" type="button" onClick={() => { setEditing(false) }}>Cancel</button>
          <button className="btn btn-delete" type="submit">Save</button>
        </div>
      </form>
    </>
  );

  useEffect(() => { // after DOM rendered
    console.log("DOM have been rendered!");
    if (wasEditing == "undefined") return;

    if (!wasEditing && isEditing) {
      editFieldRef.current.focus();  // create focus after user entered the Edit button
    }
    else if (wasEditing && !isEditing) {
      editButtonRef.current.focus();
    }
  }, [isEditing, wasEditing]); // [isEditing] kiem tra gia tri editFieldRef thay doi => run code Focus, if khong co thi moi lan render will run code Focus

  return (
    <li className="">{isEditing ? editTemplate : viewTemplate}</li>
  );
}
export default Todo;