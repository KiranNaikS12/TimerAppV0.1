import { useRef } from "react"

// Throttle for limit the excessive function calls
const useThorttle = (callback: () => void, delay: number) => {
  const lastCall = useRef<number>(0);

  return () => {
    const now = Date.now();
    if (now - lastCall.current >= delay) {
      callback();
      lastCall.current = now;
    }
  }
}

export default useThorttle
