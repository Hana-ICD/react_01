import { useState, useEffect, useRef } from 'react';
import FormTasks from '@/components/FormTasks';
import FilterButton from '@/components/Filter';
import TodoTask from '@/components/TodoTask';
import { nanoid } from 'nanoid'
import heroLogo from '@/assets/hero.png'

const propTitle = "Todo - old version"
const TODOTASK = [
  { id: "task-000", name: "Light", completed: true },
  { id: "task-001", name: "Dark", completed: false },
  { id: "task-002", name: "Night", completed: true },
]

export default function Todoold() {
  const [task, setTask] = useState(TODOTASK);
  const [filter, setFilter] = useState("All");

  // Add task
  function addTask(id, name) {
    id = nanoid();
    const newTask = {id: `task-${id}`, name: name, completed: false};
    setTask([...task, newTask]);    
  }

  // Complete status
  function handleTaskComplete(id) {      
    const updateTask = task.map((item) => {      
      if(item.id === id) {        
        return {...item, completed: !item.completed}
      }
      return item;
    })  
    setTask(updateTask);
  }
  
  // Delete task
  function deleteTask(id) {
    const tasksAfterDelete = task.filter(item => item.id !== id);    
    setTask(tasksAfterDelete);
  }

  // Edit task
  function editTask(id, newName) {    
    const editingTask = task.map((item) => {
      if(item.id === id) {
        return {...item, name: newName}
      }
      return item;
    })
    setTask(editingTask);
  }

  // Filter
  const FITER_MAP = {
    All: () => true,
    Active: (task) => !task.completed,
    Completed: (task) => task.completed
  }

  const FITER_NAME = Object.keys(FITER_MAP);

  const filterList = FITER_NAME.map((name) => (
    <FilterButton key={name} name={name} setFilter={setFilter} isPressed={filter === name } />
  ))  

  const toTask = task
    .filter(FITER_MAP[filter])
    .map((item) => (
      <TodoTask 
        id = {item.id} 
        name = {item.name} 
        completed = {item.completed} 
        key = {`${item.id}`} 
        handleTaskComplete = {handleTaskComplete} 
        deleteTask = {deleteTask}
        editTask = {editTask}
      />
    ));  
  
  const countTasks = toTask.length;
  const textTasks = countTasks > 1 ? 'tasks' : 'task';

  function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    })
    return ref.current;
  }
  const prevRemainTitle = usePrevious(task.length);
  const refRemainHeading = useRef(null);

  useEffect(() => {
    if(task.length < prevRemainTitle) {
      refRemainHeading.current.focus(); 
    }
  }, [task.length, prevRemainTitle]);

  return (
    <div className="text-left px-6">
      <div className="py-3 border-dashed border-b text-center">
        <p className="font-medium md:font-bold text-[18px] md:text-[20px]">Comming soon!</p>
        {propTitle && (
          <p>{propTitle}</p>
        )}
        <figure className='py-3'>
          <img className='mx-auto' src={heroLogo} alt="" width={70} />
        </figure>   
      </div>
      <div className="tasks-list py-3 border-dashed border-b"> 
        <FormTasks addTask={addTask} />
        <div className="filter-group">
          {filterList}
        </div>
        <h3 ref={refRemainHeading} tabIndex={-1}>{`${countTasks} ${textTasks} remaining`}</h3>
        <ul className="task-group">
          {toTask} 
        </ul>
      </div>
    </div>
  );
}