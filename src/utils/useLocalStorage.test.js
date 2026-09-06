import { renderHook, act } from '@testing-library/react';
import useLocalStorage from './useLocalStorage';

describe('useLocalStorage', () => {
  // Clear localStorage between tests so they don't affect each other
  beforeEach(() => {
    localStorage.clear();
  });

  test('returns the initial value when nothing is saved yet', () => {
    const { result } = renderHook(() => useLocalStorage('testKey', 'initial'));
    expect(result.current[0]).toBe('initial');
  });

  test('updates state and localStorage when the setter is called', () => {
    const { result } = renderHook(() => useLocalStorage('testKey', 'initial'));

    act(() => {
      result.current[1]('updated');
    });

    expect(result.current[0]).toBe('updated');
    expect(localStorage.getItem('testKey')).toBe(JSON.stringify('updated'));
  });

  test('hydrates from an existing localStorage value on mount', () => {
    localStorage.setItem('testKey', JSON.stringify('saved value'));

    const { result } = renderHook(() => useLocalStorage('testKey', 'initial'));

    expect(result.current[0]).toBe('saved value');
  });
});