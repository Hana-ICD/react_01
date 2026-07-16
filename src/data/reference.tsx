
import { DynamicSidebar } from "../types/index"

export const REFERENCE:DynamicSidebar[] = [
  {
    id: 'rf-1',
    title: "React Reference Overview", 
    link: "/reference/react", 
    slug: "react",
    target: "", 
    isActive: false,
    description: 'This section provides detailed reference documentation for working with React. For an introduction to React, please visit the Learn section.',
    sections: [
      { 
        title: 'React',
        description: (<><p>Programmatic React features:</p><ul><li><a href="#">Hooks</a> - Use different React features from your components.</li></ul></>)
      },
      { 
        title: 'React DOM',
        description: (
          <>
            <p>React DOM contains features that are only supported for web applications (which run in the browser DOM environment). This section is broken into the following:</p>
            <ul><li><a href="#">Hooks</a> - Hooks for web applications which run in the browser DOM environment.</li></ul>
          </>
        )
      },
      { 
        title: 'React Compiler',
        description: (
          <>
            <p>The React Compiler is a build-time optimization tool that automatically memoizes your React components and values:</p>
            <ul><li><a href="#">Hooks</a> - Use different React features from your components.</li></ul>
          </>
        )
      },
    ]
  },
  {
    id: 'rf-2',
    title: "Built-in React Hooks", 
    link: "/reference/hooks", 
    slug: "hooks",
    target: "", 
    isActive: false, 
    description: `Hooks let you use different React features from your components. You can either use the built-in Hooks or combine them to build your own. This page lists all built-in Hooks in React.`,
    submenu: [
      {
        id: 'rf-21',
        title: "useState", 
        slug: 'useState',
        description: 'useState is a React Hook that lets you add a state variable to your component. ',
        link:"/reference/useState",
        isActive: false,
        sections: [
          {
            title: 'Reference',
            description: (
              <>
                <p>Call useState at the top level of your component to declare a state variable.</p>
              </>
            ),
            code: `import { useState } from "react"; \n \nfunction Todo() {\n const [input, setInput] = useState(""); \n} \n// ...`
          },
          {
            subtitle: 'useState(initialState)',
            description: (
              <p>- <strong>initialState (null | Boolean | "" | array | value)</strong>: The value you want the state to be initially.</p>
            )
          },
          {
            subtitle: 'Set functions, like setSomething(nextState) ',
            description: ``,
            code: `function onChangeInput(e) {\n setInput(e.target.value); \n}`
          },
          {
            title: 'Usage',
            code: `import { useState } from "react"; \n \nexport default function Todo() {\n const [input, setInput] = useState(""); \n\n return (\n  <form>\n    <input type="text" name="" onChange={(e) => {setInput(e.target.value)}} value={input} placeholder="Enter..." />\n    <button type="button">Submit</button>\n  </form>\n )\n}`
          }
        ]
      }, 
      {
        id: 'rf-22',
        title: "useEffect", 
        slug: 'useEffect',
        description: 'useEffect is a React Hook that lets you synchronize a component with an external system.',
        link:"/reference/useEffect",
        isActive: false,
        sections: [
          {
            title: 'Reference',
            description: (
              <>
                <p>Call useEffect at the top level of your component to declare an Effect:</p>
              </>
            ),
            code: `import { useState, useEffect } from "react"; `
          },
          {
            subtitle: 'useEffect(setup, dependencies?)',
            description: (
              <>
                <p>- <strong>setup</strong>: The function with your Effect’s logic. </p>
                <p>- <strong>optional <i>dependencies</i></strong>: The list of all reactive values referenced inside of the setup code. Reactive values include props, state, and all the variables and functions declared directly inside your component body.</p>
              </>
            )
          },
          {
            subtitle: 'Returns',
            description: (<>
              <p>useEffect after DOM rendered and run after isEditing changes</p>
              <p>useEffect returns undefined.</p>
            </>),
            code: `function Todo() {
  useEffect(() => {
    if(isEditing) {
      // ...
    }
  }, [isEditing])
  return (
    // ...
  )
}
            `
          },
          {
            title: 'Usage',
            code: `import { useState, useEffect } from "react"; 

export default Todo() {
  const [count, setCount] = useState(0);
  const [increment, setIncrement] = useState(1);

  const effEventCount = useEffectEvent(() => {
    setCount(count + increment);
  })

  useEffect(() => {
    console.log("useEffect");  
    const id = setInterval(() => {
      effEventCount();
    }, 1000);
    return () => {
      clearInterval(id)
    }
  }, []) 

  return (
    <section>
      <p>Result: 
        <strong>{count}</strong>
        <button type="button" onClick={() => {setCount(0)}}>Reset</button>
      </p>
      <p>Increment:
        <button type="button" disabled = {increment === 0} onClick={() => {setIncrement(i => i - 1)}}>-</button>
        <span><strong>{increment}</strong></span>
        <button type="button" disabled = {increment === 5} onClick={() => {setIncrement(i => i + 1)}}>+</button>
      </p>                  
    </section>
  )
}
            `,
          }
        ]
      },
      {
        id: 'rf-23',
        title: "useRef", 
        slug: 'useRef',
        description: 'useRef is a React Hook that lets you reference a value that’s not needed for rendering.',
        link:"/reference/useRef",
        isActive: false,
        sections: [
          {
            title: 'Reference ',
            description: (
              <>
                <p>Call useRef at the top level of your component to declare a ref.</p>
              </>
            ),
            code: `import { useState, useEffect, useRef } from 'react';`
          },
          {
            subtitle:'useRef(initialValue)',
            description: (
              <>
                <p>- <strong>initialValue(null | Boolean | "" | array | value)</strong></p>
                <p>The value you want the ref object’s current property to be initially. It can be a value of any type. This argument is ignored after the initial render.</p>
              </>
            )
          },
          {
            title: 'Usage',
            code: `import { useRef, useEffect } from "react"
function Todo() {
  function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    })
    return ref.current;
  }

  const colors = ["orange", "yellow", "blue"];    
  const prevRemainTitle = usePrevious(colors.length);
  const refRemainHeading = useRef(null);

  useEffect(() => {
    if(colors.length < prevRemainTitle) {
      refRemainHeading.current.focus(); 
    }
  }, [colors.length, prevRemainTitle]);

  return (
    <h3 ref={refRemainHeading}>Color remaining</h3>
  )
}
export default Todo;
`
          },
        ]
      },
      {
        id: 'rf-24',
        title: "useMemo", 
        slug: 'useMemo',
        description: 'useMemo is a React Hook that lets you cache the result of a calculation between re-renders.',
        link:"/reference/useMemo",
        isActive: false,
        sections: [
          {
            title: 'Reference',
            description: (
              <>
                <p>Call useMemo at the top level of your component to cache a calculation between re-renders:</p>
                <p>Cache value</p>
              </>
            ),
            code: `import { useMemo } from 'react';`
          },
          {
            subtitle: 'useMemo(calculateValue, dependencies)',
            description: (
              <>
                <p>- <strong>calculateValue</strong>: The function calculating the value that you want to cache.</p>
                <p>- <strong>dependencies</strong>: The list of all reactive values referenced inside of the calculateValue code. Reactive values include props, state, and all the variables and functions declared directly inside your component body.</p>
              </>
            )
          },
          {
            title: 'Usage',
            code: `import { useMemo, useState } from 'react';

function Todo() {
  const listText = Array.from(
    { length: 10000 }, 
    (_, i) => Product + (i + 1)
  );
  const [text, setText] = useState("");
  const filtered = useMemo(() => {
    console.log("run when changes"); // khi use useMemo => this console will run when textDeferred changes
    return listText.filter(
      item => item.toLowerCase().includes(text.toLowerCase())
    );
  }, [text]);   

  return (
    <input type="text" name="" onChange={(e) => {setText(e.target.value)}} value={text} placeholder="Enter..." />     
    <ul>
      { 
        filtered.slice(0, 10).map((item, key) => (
          <li key={key}>{item}</li>
        ))
      }
    </ul>
  )
}
            `
          }
        ]
      },
      {
        id: 'rf-25',
        title: "useCallback", 
        slug: 'useCallback',
        description: 'useCallback is a React Hook that lets you cache a function definition between re-renders. ',
        link:"/reference/useCallback",
        isActive: false,
        sections: [
          {
            title: 'Reference',
            description: (
              <>
                <p>Khi chỉ cần tạo 1 lần thôi, thì dùng useCallback + React.memo để render 1 lần duy nhất, tránh trường hợp khi làm gì cũng sẽ render</p>
                <p>Call useCallback at the top level of your component to cache a function definition between re-renders</p>
              </>
            ),
            code: `import { useCallback } from 'react';`
          },
          {
            subtitle: 'useCallback(fn, dependencies)',
            description: (
              <>
                <p>- <strong>fn</strong>: </p>
                <p>- <strong>dependencies</strong>: The list of all reactive values referenced inside of the fn code. Reactive values include props, state, and all the variables and functions declared directly inside your component body.</p>
                <p>- Truyền xuống memo component</p>
                <p>- dependency của useEffect/useMemo</p>
                <p>- performance optimization</p>
              </>
            )
          },
          {
            title: 'Usage',
            code: `import { useCallback, useState } from 'react';

function Todo() {
  const [actionCount, setActionCount] = useState(0);
  const actionIncrement = useCallback(() => {
    setActionCount(e => e + 1);
  }, [])
  
  return (
    <p>Count: {actionCount}</p>
  )
}
export default Todo;
            `
          }
        ]
      },
    ],
    sections: [
      { 
        title: 'State Hooks',
        description: (
          <>
            <p>State lets a component “remember” information like user input. For example, a form component can use state to store the input value, while an image gallery component can use state to store the selected image index.</p>
            <p>To add state to a component, use one of these Hooks:</p>
            <ul><li><a href="#">useState</a> - declares a state variable that you can update directly.</li></ul>
          </>
        )
      },
      {
        title: 'Effect Hooks',
        description: (
          <>
            <p>Effects let a component connect to and synchronize with external systems. This includes dealing with network, browser DOM, animations, widgets written using a different UI library, and other non-React code.</p>
          </>
        )
      },
      { 
        title: 'Ref Hooks',
        description: (
          <>
            <p>Refs let a component hold some information that isn’t used for rendering, like a DOM node or a timeout ID. Unlike with state, updating a ref does not re-render your component. Refs are an “escape hatch” from the React paradigm. They are useful when you need to work with non-React systems, such as the built-in browser APIs.</p>
            <ul><li><a href="#">useRef</a> - declares a ref. You can hold any value in it, but most often it’s used to hold a DOM node.</li></ul>
          </>
        )
      },
      {
        title: 'Memo Hooks',
        description: (
          <>
            <p>Memo lets you cache the result of an expensive calculation.</p>
          </>
        )
      },
      {
        title: 'Callback Hooks',
        description: (
          <>
            <p>Callback lets you cache a function definition before passing it down to an optimized component.</p>
          </>
        )
      }
    ]
  },
  {
    id: 'rf-3',
    title: "Built-in React Components", 
    link: "/reference/components", 
    slug: "components",
    target: "", 
    isActive: false, 
    description: `React exposes a few built-in components that you can use in your JSX.`,
    sections: [],
  },
  {
    id: 'rf-4',
    title: "Built-in React APIs", 
    link: "/reference/apis", 
    slug: "apis",
    target: "", 
    isActive: false, 
    description: `In addition to Hooks and Components, the react package exports a few other APIs that are useful for defining components. This page lists all the remaining modern React APIs.`,
    sections: [],
  }
]