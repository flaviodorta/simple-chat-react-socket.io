import { useCallback, useState } from 'react';

type Return = [boolean, () => void];

export function useToggle(initialValue?: boolean | (() => boolean)): Return {
  const [state, setState] = useState(() => {
    if (!initialValue) {
      return false;
    }
    if (typeof initialValue === 'function') {
      return initialValue();
    }
    return initialValue;
  });

  const toggle = useCallback(() => setState((state) => !state), []);

  return [state, toggle];
}
