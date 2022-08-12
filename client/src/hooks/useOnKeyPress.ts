import { useCallback, useEffect } from 'react';

export const useOnKeyPress = (key: string, cb: () => void) => {
  const keyPressHandler = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === key) {
        cb();
      }
    },
    [cb, key]
  );

  useEffect(() => {
    document.addEventListener('keypress', keyPressHandler);
    return document.removeEventListener('keypress', keyPressHandler);
  });
};
