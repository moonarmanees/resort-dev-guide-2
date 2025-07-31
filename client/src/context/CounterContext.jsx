// client/src/context/CounterContext.jsx

import React, { createContext, useContext, useState } from "react";

// 1. Create the context object
const CounterContext = createContext(null);

// 2. Create the Provider component
export function CounterProvider({ children }) {
  const [count, setCount] = useState(0);
  const increment = () => setCount((c) => c + 1);
  const reset = () => setCount(0);

  return (
    <CounterContext.Provider value={{ count, increment, reset }}>
      {children}
    </CounterContext.Provider>
  );
}

// 3. Create the custom hook that consumes the context
export function useCounter() {
  const context = useContext(CounterContext);
  if (context === null) {
    throw new Error("useCounter must be used within a CounterProvider");
  }
  return context;
}
