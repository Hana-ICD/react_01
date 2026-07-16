import { useState, useEffect, useRef, useReducer } from 'react';
import FormTasks from '@/components/FormTasks';
import FilterButton from '@/components/Filter';
import TodoTask from '@/components/TodoTask';
import { nanoid } from 'nanoid'
import heroLogo from '@/assets/hero.png'
import Layout from "@/components/layouts";

const propTitle = "Todo"
const TODOTASK = [
  { id: "task-000", name: "Light", completed: true },
  { id: "task-001", name: "Dark", completed: false },
  { id: "task-002", name: "Night", completed: true },
]

function tasksReducer(tasks, action) {
  switch (action.type){
    case "added": {        
      return [
        ...tasks, {
          id: `task-${action.id}`,
          name: action.name,
          completed: false,
        }        
      ]
    }
    case "edited": {
      return tasks.map((item) => {
        if(item.id === action.id) {
          return {...item, name: action.newName}
        }
        return item;
      })
    }
    case "deleted": {
      return tasks.filter(item => item.id !== action.id);
    }
    case "completed": {
      return tasks.map((item) => {
        if(item.id === action.id) {
          return {...item, completed: !item.completed}
        }
        return item;
      })
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}
export default function Todo() {
  const [filter, setFilter] = useState("All");
  const [tasks, dispatch] = useReducer(tasksReducer, TODOTASK);

  // Add task
  function addTask(name) {
    console.log(name, 'name');
    
    let id = nanoid();
    dispatch({
      type: "added",
      id: id,
      name: name,
      completed: false,
    });
  }

  // Complete status
  function handleTaskComplete(id) {     
    dispatch({
      type: "completed",
      id: id,
    })
  }
  
  // Delete task
  function deleteTask(id) {
    dispatch({
      type: "deleted",
      id: id,
    })
  }

  // Edit task
  function editTask(id, newName) {    
    dispatch({
      type: "edited",
      id: id,
      newName: newName,
    })
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

  const toTask = tasks
    .filter(FITER_MAP[filter])
    .map((task) => (
      <TodoTask 
        id = {task.id} 
        name = {task.name} 
        completed = {task.completed} 
        key = {`${task.id}`} 
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
  const prevRemainTitle = usePrevious(tasks.length);
  const refRemainHeading = useRef(null);

  useEffect(() => {
    if(tasks.length < prevRemainTitle) {
      refRemainHeading.current.focus(); 
    }
  }, [tasks.length, prevRemainTitle]);

  return (
    <Layout title="TODO">
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
    </Layout>
  );
}