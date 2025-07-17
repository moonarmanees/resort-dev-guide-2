import React, { useState } from 'react';
import { CounterContext } from './createCounterContext';

export default function CounterProvider({ children }) {
  const [count, setCount] = useState(0);
  const increment = () => setCount(c => c + 1);
  const reset     = () => setCount(0);

  return (
    <CounterContext.Provider value={{ count, increment, reset }}>
      {children}
    </CounterContext.Provider>
  );
}
