import Layout from "@/components/layouts"
import { ThemeContext  } from "@/components/ThemeContext";
import { useContext, useState, useDeferredValue, useEffect, useEffectEvent, useId, useMemo } from "react";

const listText = Array.from(
  { length: 10000 }, 
  (_, i) => `Product ${i + 1}`
);

export default function HooksApi() {
  const {theme, toggleTheme} = useContext(ThemeContext);  

  const [text01, setText01] = useState("");
  const [text02, setText02] = useState("");

  const [count2, setCount2] = useState(0);

  // useDeferredValue: defer updating a part of the UI
  const textDeferred = useDeferredValue(text02);

  const filterText = listText.filter(item => item.toLowerCase().includes(text01.toLowerCase()));

  // const filtered = listText.filter(item => item.toLowerCase().includes(textDeferred.toLowerCase()));
  const filtered = useMemo(() => {
    console.log("6666"); // khi use useMemo => this console will run when textDeferred changes
    return listText.filter(
      item => item.toLowerCase().includes(textDeferred.toLowerCase())
    );
  }, [textDeferred]);

  // useEffect & useEffectEvent
  const [count, setCount] = useState(0);
  const [increment, setIncrement] = useState(1);

  // useEffectEvent: sẽ trả về giá trị mới nhất và sử dụng nó trong useEffect 
  const effEventCount = useEffectEvent(() => {
    setCount(count + increment);
  })
  // useEffect: chạy sau khi load => render mỗi lần nếu không có tham số or array sau , []
  useEffect(() => {
    console.log("useEffect");  
    const id = setInterval(() => {
      effEventCount();
    }, 1000);
    return () => {
      clearInterval(id)
    }
  }, []) // [] nếu không co [] or [editting] thì sẽ render liên tục 

  /** useId */
  const passwordId = useId();

  // useMemo
  const [inputMemo, setInputMemo] = useState("");
  const [countMemo, setCountMemo] = useState(0);

  return (
    <Layout title="Hooks & Api">
      <div className="container">
        <section className="p-4 mt-3" style={{ background: theme === 'light' ? '#fff' : '#333', color: theme === 'light' ? "#333" : "#fff" }}>
          <p>createContext & useContext</p>
          <p>Theme is: <strong>{theme}</strong></p>
          <div className={theme} style={{ background: theme === "light" ? "#fff" : "#333", color: theme === 'light' ? "#333" : "#fff"}}>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Similique maxime est quibusdam deleniti dolore dolorum, nam quae quis ut? Illum neque sapiente quis maxime recusandae tempora reiciendis quidem cum vitae?</p>
          </div>
          <button className="btn" type="button" onClick={toggleTheme}>Toggle theme</button>
        </section>

        <section className="py-4">
          <p>useDeferredValue</p>
          <form action="">
            <input type="text" name="" onChange={(e) => {setText01(e.target.value)}} value={text01} placeholder="Enter..." />
            <p>Input enter: {text01}</p>
            <ul>
              { filterText.slice(0, 10).map(item => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <input type="text" name="" onChange={(e) => {setText02(e.target.value)}} value={text02} placeholder="Enter..." />
            <p>Input useDeferredValue enter: {textDeferred}</p>
            <ul>
              { 
                filtered.slice(0, 10).map((item, key) => (
                  <li key={key}>{item}</li>
                ))
              }
            </ul>
            <button className="btn" type="button" onClick={() => setCount2(count2 + 1)}>
              Count2: {count2}
            </button>
          </form>
        </section>

        <section className="py-4">
          <h3 className="title">useEffect & useEffectEvent</h3>
          <p>Result: 
            <strong className="mx-4">{count}</strong>
            <button className="btn" type="button" onClick={() => {setCount(0)}}>Reset</button>
          </p>
          <p>Increment
            <button className="btn" type="button" disabled = {increment === 0} onClick={() => {setIncrement(i => i - 1)}}>-</button>
            <span className="mx-4"><strong>{increment}</strong></span>
            <button className="btn" type="button" disabled = {increment === 5} onClick={() => {setIncrement(i => i + 1)}}>+</button>
          </p>
          <h3>useId</h3>
          <label htmlFor={passwordId}>
            Label <br/>
            <input type="text" name="" aria-describedby={passwordId} className="input" id={passwordId} /><br/>
            <p>Get Id from useId() method: {passwordId}</p>
          </label>
          
        </section>

        <section className="py-4">
          <h3 className="title">useMemo</h3>
          <input className="input" type="text" name="" value={inputMemo} onChange={(e) => {setInputMemo(e.target.value)}} />
          <p>Input memo entered upperCase: {inputMemo.toUpperCase()}</p>
          <button type="button" className="btn" onClick={() => {setCountMemo(countMemo + 1)}}>Count memo: {countMemo}</button>
        </section>

        <pre class="code-block">
          <pre>
            <code>
              <div>
                <span>const a = 1; </span>
                <span>console.log(a);</span>
              </div>
            </code>
          </pre>
        </pre>
      </div>
    </Layout>
  );
}