import React from 'react';
import { useCounter } from '../context/useCounter.js';  // 👉 include the “.js”

export default function Counter() {
  const { count, increment, reset } = useCounter();

  return (
    <div className="mt-4">
      <h2>Counter: {count}</h2>
      <button className="btn btn-primary me-2" onClick={increment}>
        +1
      </button>
      <button className="btn btn-secondary" onClick={reset}>
        Reset
      </button>
    </div>
  );
}
