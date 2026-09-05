import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { supportedLanguageCodes } from './languages';

import translationEN from './locales/en/translation.json';
import translationFR from './locales/fr/translation.json';
import translationES from './locales/es/translation.json';
import translationDE from './locales/de/translation.json';
import translationIT from './locales/it/translation.json';
import translationPT from './locales/pt/translation.json';
import translationJA from './locales/ja/translation.json';
import translationHI from './locales/hi/translation.json';
import translationKO from './locales/ko/translation.json';
import translationRU from './locales/ru/translation.json';
import translationZH from './locales/zh/translation.json';
import translationZHTW from './locales/zh-TW/translation.json';
import translationAR from './locales/ar/translation.json';

const resources = {
  fr: {
    translation: translationFR,
  },
  en: {
    translation: translationEN,
  },
  es: {
    translation: translationES,
  },
  de: {
    translation: translationDE,
  },
  it: {
    translation: translationIT,
  },
  pt: {
    translation: translationPT,
  },
  ja: {
    translation: translationJA,
  },
  hi: {
    translation: translationHI,
  },
  ko: {
    translation: translationKO,
  },
  ru: {
    translation: translationRU,
  },
  zh: {
    translation: translationZH,
  },
  'zh-TW': {
    translation: translationZHTW,
  },
  ar: {
    translation: translationAR,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'fr',
    supportedLngs: supportedLanguageCodes,
    nonExplicitSupportedLngs: true,
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'i18nextLng',
      caches: ['localStorage'],
    },
  });

export default i18n;
