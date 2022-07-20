import React, { useState, useRef } from "react";

export default function CounterHooks() {
  const [items, setItem] = useState([]);
  const inputRef = useRef();

  function addItemHandler() {
    setItem((prev) => [...prev, inputRef.current.value]);
    console.log(inputRef.current.value);
  }

  return (
    <div>
      <input ref={inputRef} />
      <button onClick={addItemHandler}>Add Item</button>
      <ul>
        {items.map((item) => {
          return <li key={item}>{item}</li>;
        })}
      </ul>
    </div>
  );
}
