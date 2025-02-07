import { useRef } from "react";

const useFuncDebounce = func => {
  const timer = useRef(null);
  const debouncedFunc = (...args) => {
    clearTimeout(timer);
    timer.current = setTimeout(() => func(...args), 1000);
  };

  return debouncedFunc;
};
export default useFuncDebounce;
