import React, { useEffect, useState } from 'react';
import { useAxios } from '../custom-hooks/useAxios';

export const Counter = () => {

  const [currentCount, setCurrentCount] = useState(0);

  const incrementCounter = () => {
    setCurrentCount(currentCount + 1);
  }

  const axios = useAxios();

  useEffect(() => {
    (async () => {
      if (axios) {
        try {
          let result = await axios.get("/weatherforecast/1");
          console.debug("result", result);
        } catch (error) {
          console.error("error", error);
        }
      }
    })()
  }, [axios]);

  return (
    <div>
      <h1>Counter</h1>

      <p>This is a simple example of a React component.</p>

      <p aria-live="polite">Current count: <strong>{currentCount}</strong></p>

      <button className="btn btn-primary" onClick={incrementCounter}>Increment</button>
    </div>
  );
}