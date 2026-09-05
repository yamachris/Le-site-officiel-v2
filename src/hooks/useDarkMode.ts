import { useEffect, useState } from 'react';

const applyThemeAttributes = (isDark: boolean) => {
  const mode = isDark ? 'dark' : 'light';

  document.body.classList.toggle('dark', isDark);
  document.documentElement.classList.toggle('dark', isDark);
  document.body.dataset.theme = mode;
  document.documentElement.dataset.theme = mode;
  document.documentElement.style.colorScheme = mode;
};

export function useDarkMode() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    applyThemeAttributes(isDark);

    const syncWithBodyClass = () => {
      const hasDarkClass = document.body.classList.contains('dark');

      if (hasDarkClass !== isDark) {
        setIsDark(hasDarkClass);
        localStorage.setItem('darkMode', String(hasDarkClass));
      }
    };

    const interval = setInterval(syncWithBodyClass, 100);
    return () => clearInterval(interval);
  }, [isDark]);

  return { isDark, setIsDark };
}
