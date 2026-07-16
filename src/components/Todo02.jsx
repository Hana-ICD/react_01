function Todo02(props) {
  return (
    <li className="flex gap-3">
      <label htmlFor={props.id}>{props.name}</label>
      <input type="checkbox" name="" id={props.id} defaultChecked={props.completed} />
      <div className="flex gap-2">
        <button type="button">Edit</button>
        <button type="button">Delete</button>
      </div>
    </li>
  );
}
export default Todo02;