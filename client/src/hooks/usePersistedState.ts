import { Dispatch, SetStateAction, useEffect, useState } from 'react';

type Return<T> = [T, Dispatch<SetStateAction<T>>];

export function usePersistedState<T>(key: string, initialState: T): Return<T> {
  const [state, setState] = useState<T>(() => {
    const storageValue = localStorage.getItem(key);

    return storageValue ? JSON.parse(storageValue) : initialState;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}
