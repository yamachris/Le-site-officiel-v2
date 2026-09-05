import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { lightTheme, darkTheme } from '../styles/darkTheme';
import { useDarkMode } from '../hooks/useDarkMode';
import i18n from 'i18next';
import {
  fallbackLanguage,
  getLanguageDirection,
  isLanguageCode,
  normalizeLanguage,
} from '../i18n/languages';
import type { LanguageCode } from '../i18n/languages';

type ThemeMode = 'light' | 'dark';

interface SettingsContextType {
  mode: ThemeMode;
  toggleMode: () => void;
  language: LanguageCode;
  setLanguage: (lang: string) => void;
}

const SettingsContext = createContext<SettingsContextType>({
  mode: 'light',
  toggleMode: () => {},
  language: 'fr',
  setLanguage: () => {},
});

export const useSettings = () => useContext(SettingsContext);

interface SettingsProviderProps {
  children: React.ReactNode;
}

const getInitialLanguage = (): LanguageCode => {
  const prototypeLanguage = localStorage.getItem('i18nextLng');
  if (isLanguageCode(prototypeLanguage)) return prototypeLanguage;

  const legacyLanguage = localStorage.getItem('language');
  if (isLanguageCode(legacyLanguage)) return legacyLanguage;

  return normalizeLanguage(i18n.language || fallbackLanguage);
};

export const SettingsProvider: React.FC<SettingsProviderProps> = ({ children }) => {
  const { isDark, setIsDark } = useDarkMode();
  const mode: ThemeMode = isDark ? 'dark' : 'light';
  const [language, setLanguageState] = useState<LanguageCode>(getInitialLanguage);

  const setLanguage = (lang: string) => {
    const nextLanguage = normalizeLanguage(lang);
    i18n.changeLanguage(nextLanguage);
    setLanguageState(nextLanguage);
  };

  useEffect(() => {
    localStorage.setItem('i18nextLng', language);
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
    document.documentElement.dir = getLanguageDirection(language);
    i18n.changeLanguage(language);
  }, [language]);

  const toggleMode = () => {
    document.body.classList.toggle('dark');
    const nextIsDark = document.body.classList.contains('dark');
    localStorage.setItem('darkMode', String(nextIsDark));
    setIsDark(nextIsDark);
  };

  const theme = mode === 'light' ? lightTheme : darkTheme;

  return (
    <SettingsContext.Provider value={{ mode, toggleMode, language, setLanguage }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </SettingsContext.Provider>
  );
};
