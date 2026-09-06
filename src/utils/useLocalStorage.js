import { useState, useEffect } from 'react';

// Custom hook that syncs a piece of state with localStorage —
// reads the saved value on mount, and writes back whenever it changes
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(initialValue);

  // Hydrate from localStorage once, on mount
  useEffect(() => {
    const saved = localStorage.getItem(key);
    if (saved) {
      setValue(JSON.parse(saved));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Persist to localStorage whenever the value changes
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

export default useLocalStorage;