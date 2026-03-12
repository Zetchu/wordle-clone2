import { use, useCallback, useEffect, useMemo, useRef, useState } from 'react';

export default function useAsync<Type>(
  fn: (initial: boolean) => Promise<Type>,
  deps: unknown[] = [],
): [
  Type | undefined,
  {
    refresh: () => void;
  },
] {
  const fnRef = useRef(fn);
  fnRef.current = fn;

  const [promise, setPromise] = useState<Promise<Type>>();

  useEffect(() => {
    setPromise(fnRef.current(true));
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps

  const refresh = useCallback(() => {
    setPromise(fnRef.current(false));
  }, []);

  const value = promise ? use(promise) : undefined;

  const result = useMemo(
    () => [value, { refresh }] as [Type | undefined, { refresh: () => void }],
    [value, refresh],
  );

  return result;
}
