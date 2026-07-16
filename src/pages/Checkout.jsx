import Layout from '@/components/layouts';
import React, { useActionState, startTransition, useOptimistic, useRef, useState, useCallback } from 'react';
import { ErrorBoundary } from "react-error-boundary"
import { addToCart, rmCart } from "@/components/api"
import { formatJP, formatUSD, formatVND } from "@/components/Functions"

function Checkout() {
  const TITLE = "Use action state";
  const [state, dispatchAction, isPending] = useActionState(updateTicket, {count: 0, error: null});
  // const [count, dispatchAction, isPending] = useActionState();
  const [optimisticCount, setOptimisticCount] = useOptimistic(state.count); // Phan hoi nhanh

  const abortRef = useRef(null);

  function addTicket(quanty) {
    if(abortRef.current) {
      abortRef.current.abort();      
    }
    abortRef.current = new AbortController();
    startTransition(() => { // dispatchAction phai nam trong ham startTransition
      setOptimisticCount((c) => c + 1);
      dispatchAction({type: "add", quanty: quanty, isPending: isPending, signal: abortRef.current.signal});
    })        
  }
  function rmTicket(quanty) {
    // if dang co hanh dong dien ra => .abort() se huy bo => tranh viec click lien tuc nhieu lan
    if(abortRef.current) abortRef.current.abort(); 

    abortRef.current = new AbortController();
    startTransition(() => {
      setOptimisticCount((c) => c - 1);
      dispatchAction({type: "remove", quanty: quanty, signal: abortRef.current.signal});
    })    
  }

  return (
    <Layout title={TITLE}>
      <div className="clr-primary bg-gray-200 text-left px-6">
        <div className="py-3 border-dashed border-b text-center">
          <p className="font-medium md:font-bold text-[18px] md:text-[20px]">Comming soon!</p>
          <h4 className="text-[16px]">Checkout</h4>
        </div>
        <div className="tasks-list py-3 border-dashed border-b"> 
          <div className="flex gap-5">
            <p>Tour tickets</p>
            <p>Quanty: {state.count}</p>
            <p>Quanty optimisticCount: {optimisticCount}</p>
          </div>            
          <button type="button" className="btn w-48" onClick={(() => addTicket(1))}>Add ticket (1) {isPending ? '🌀' : ''} </button>
          <button type="button" className="btn w-48" onClick={(() => addTicket(10))}>Add ticket (10) {isPending ? '🌀' : ''} </button>
          <button type="button" className="btn w-48" onClick={(() => addTicket("abc123"))}>Add ticket (string) {isPending ? '🌀' : ''} </button>
          <button type="button" className="btn w-48" onClick={(() => addTicket(NaN))}>Add ticket (NaN) {isPending ? '🌀' : ''} </button>
          <button type="button" className="btn w-48" onClick={rmTicket}>RM ticket {isPending ? '🌀' : ''} </button>
          {state.error && (
            <p className='text-pink-800 text-[14px]'>Error: {state.error}</p>
          )}            
          <p>Total JP: {!isPending ? formatJP(state.count * 1700000) : 'Updating 🌀'}</p>
          <p>Total USD: {!isPending ? formatUSD(state.count * 25000) : 'Updating 🌀'}</p>
          <p>Total VND: {!isPending ? formatVND(state.count * 999999) : 'Updating 🌀'}</p>
        </div>

        {/* useCallBack - Khi chỉ cần tạo 1 lần thôi, thì dùng useCallback + React.memo để render 1 lần duy nhất, tránh trường hợp khi làm gì cũng sẽ render  */}
        <CallbackCount />
      </div>
    </Layout>
  );
}

async function updateTicket(prevCount, actionPayload) {
  // Get Signal from abort => true => error, slow load => if(gia tri true) break;  
  switch(actionPayload.type) {    
    case "add": {
      try {        
        const result = await addToCart(prevCount.count, actionPayload.quanty, {signal: actionPayload.signal});
        console.log(result, 'result');
        
        if(result.error) {  
          return {...prevCount, error: result.error}
        }

        if(!result.error && !actionPayload.isPending) return { count: result.count, error: null }

        return {count: result.count, error: prevCount.error};

      } catch (error) {
        console.log(error, 'error');        
        return {count: prevCount.count, error: error.message || "Error"}
      }

      // Dùng try cache: lỗi sẽ được xử lý nên không hiện báo lỗi, nếu muốn show errorBoundary thì không dùng try cache mà gôm chung đoạn code như bên dưới 
      // const result = await addToCart(prevCount.count, actionPayload.quanty, {signal: actionPayload.signal});      
      // if(result.error) {
      //   console.log('errr', result.error);          
      //   return {...prevCount, error: result.error}
      // }
      // return {count: result.count, error: prevCount.error};
    }
    case "remove": {
      try {
        const result =  await rmCart(prevCount.count, actionPayload.quanty, {signal: actionPayload.signal});
        return {count: result.count, error: null};
      } catch (error) {
        console.log(error, 'error');
        return {count: Math.max(0, prevCount - 1)}
      } 
    }
  }
  return prevCount;
}

const CountAction = React.memo(({onClick})=> {
  console.log("CountButton không bị render lại nữa! 😎");
  return <button className='btn' onClick={onClick}>Tang SL</button>
})

function CallbackCount() {
  const [actionText, setActiontext] = useState("");
  const [actionCount, setActionCount] = useState(0);
  const actionIncrement = useCallback(() => {
    setActionCount(e => e + 1);
  }, [])
  
  return (
    <div className="tasks-list py-3 border-dashed border-b" id="useCallback">
      <p>Use call back</p>
      <input className='btn' type="text" name="" value={actionText} onChange={(e) => {setActiontext(e.target.value)}} placeholder='Enter here' />
      <p>Count: {actionCount}</p>
      <CountAction onClick={actionIncrement} />
    </div>
  )
}

function CheckoutApp() {  
  return (
    <ErrorBoundary fallbackRender={({resetErrorBoundary})=> (
      <div>
        <p>Something went wrong <br/> The action cought not be completed</p>
        <button className="btn" onClick={resetErrorBoundary}>Try aggain</button>
      </div>
      )}>
      <Checkout />

    </ErrorBoundary>
  )
}

export default CheckoutApp;