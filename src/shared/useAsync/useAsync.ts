import { use, useCallback, useEffect, useMemo, useRef, useState } from 'react';

/**
 * A custom hook to handle async operations in a Suspense-clean way.
 *
 * @template Type The type of the data returned by the promise.
 * @param fn The async function to execute. Receives `initial` boolean (true on mount).
 * @param deps Dependency array for the effect triggering the async call.
 * @returns A tuple containing the result (or undefined if pending/error) and a refresh handler.
 */
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
  useEffect(() => {
    fnRef.current = fn;
  });

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
