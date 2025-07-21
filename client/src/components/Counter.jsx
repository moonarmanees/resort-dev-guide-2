import React from "react";
import { useCounter } from "../context/useCounter";
import Button from "./Button";

export default function Counter() {
  const { count, increment, reset } = useCounter();

  return (
    <div className="mt-4">
      <h2>Counter: {count}</h2>
      <Button label="+1" variant="primary" onClick={increment} />
      <Button label="Reset" variant="secondary" onClick={reset} />
    </div>
  );
}
