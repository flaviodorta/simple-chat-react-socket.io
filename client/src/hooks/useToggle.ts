import { useState } from 'react';

export function useToggle(initialValue: boolean | (() => boolean)) {
  const [state, setState] = useState(() => {
    if (!initialValue) {
      return false;
    }

    return initialValue;
  });

  const toggle = () => setState((state) => !state);

  return [state, toggle];
}
