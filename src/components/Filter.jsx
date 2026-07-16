function FilterButton(props) {
  return (
    <button className="filter-button btn" aria-pressed={props.isPressed} onClick={()=>props.setFilter(props.name)}>
      <span className="invisible">Show</span>
      <span className="">{props.name}</span>
      <span className="invisible">tasks</span>
    </button>
  );
}
export default FilterButton;