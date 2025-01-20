import React, { useState } from "react";
import "./Component.css";

export function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div className="count-btn" onClick={() => setCount((prev) => prev + 1)}>
      counter {count}
    </div>
  );
}
