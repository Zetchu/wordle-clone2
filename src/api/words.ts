import { get } from './api';
import useAsync from '../shared/useAsync/useAsync';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const fetchRandomWord = async (_: boolean): Promise<string> => {
  const data = await get<string[]>(
    'https://random-word-api.herokuapp.com/word?length=5',
  );
  return data[0].toUpperCase();
};

const EMPTY_DEPS: unknown[] = [];

export const useRandomWord = () => {
  return useAsync(fetchRandomWord, EMPTY_DEPS);
};
