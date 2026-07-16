import { useState } from "react"
import Todo from '@/components/Todo02';
import Form from '@/components/Form';
import heroLogo from '@/assets/hero.png'

const propTitle = "Demo"
const DATATODO02 = [
  { id: "todo02-01", name: "AB", completed: true},
  { id: "todo02-02", name: "BC", completed: true},
  { id: "todo02-02", name: "CA", completed: true},
]
const DATATODO03 = [
  { name: "Todo 1", completed: false},
  { name: "Todo 2", completed: true},
  { name: "Todo 3", completed: false},
]

export default function Demo() {
  const [count, setCount] = useState(0);
  const subject = "Say";
  const getDataTodo02 = DATATODO02?.map((item, index) => (
    <Todo
      id={item.name}
      name={item.name}
      completed={item.completed}
      key={`item_${index}`}
    />
  ));

  const [todo03, setTodo03] = useState(DATATODO03);
  const todo3List = todo03.map((todo, key) => (
    <Todo name={todo.name} completed={todo.completed} key={key} />
  ))  

  return (
    <div className="text-left px-6">
      <div className="py-3 border-dashed border-b text-center">
        <p className="font-medium md:font-bold text-[18px] md:text-[20px]">Comming soon! {subject.toUpperCase()}</p>
        {propTitle && (
          <p>{propTitle}</p>
        )}
        <figure className='py-3'>
          <img className='mx-auto' src={heroLogo} alt="" width={70} />
        </figure>   
      </div>
      <div className="py-3 text-left border-dashed border-b">
        <ul role="list">
          <Todo id="item-01" name="A" completed />
          <Todo id="item-02" name="B" />
          <Todo id="item-03" name="C" />
        </ul>
        <span className="border-b py-1 mb-2 inline-block w-2/12"></span>
        <ul role='list'>
          {getDataTodo02}
          <button className="btn" type="button" onClick={() => setCount((count) => count + 1)}>Click</button>
          <p>Count: {count}</p>
        </ul>
        <span className="border-b py-1 mb-2 inline-block w-2/12"></span>
        <ul role='list'>
          {todo3List}
        </ul>
      </div>

      <div className="my-tasks py-3 border-dashed border-b">
        <Form />
      </div>
    </div>
  );
}