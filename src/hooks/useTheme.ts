import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { toggleTheme, setTheme } from '@/store/slices/themeSlice';

export function useTheme() {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme.theme);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return {
    theme,
    toggleTheme: () => dispatch(toggleTheme()),
    setTheme: (t: 'light' | 'dark') => dispatch(setTheme(t)),
  };
}
