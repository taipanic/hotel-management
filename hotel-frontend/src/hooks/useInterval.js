import {useEffect, useRef} from 'react';

export function useInterval(func, delay) {
  const savedFunc = useRef();

  useEffect(() => {
    savedFunc.current = func;
  }, [func]);

  useEffect(() => {
    function latestFunc() {
      savedFunc.current();
    }
    if (delay != null) {
      const intervalId = setInterval(latestFunc, delay);
      return () => {
        clearInterval(intervalId);
      }
    }
  }, [func, delay]);
}