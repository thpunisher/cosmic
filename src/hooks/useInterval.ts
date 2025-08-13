import { useEffect, useRef } from 'react';
export function useInterval(cb: () => void, delay: number | null) {
  const ref = useRef(cb);
  useEffect(() => { ref.current = cb; });
  useEffect(() => {
    if (delay === null) return;
    const id = setInterval(() => ref.current(), delay);
    return () => clearInterval(id);
  }, [delay]);
}
