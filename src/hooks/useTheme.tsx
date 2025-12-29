import { useEffect, useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { STORAGE_KEYS, THEMES } from '../constants';
import { Theme } from '../types';

export const useTheme = () => {
  const [theme, setTheme] = useLocalStorage<Theme>(
    STORAGE_KEYS.THEME,
    THEMES.LIGHT,
  );

  useEffect(() => {
    document.body.classList.toggle('theme_dark', theme === THEMES.DARK);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme(theme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT);
  }, [theme, setTheme]);

  return { theme, toggleTheme };
};
