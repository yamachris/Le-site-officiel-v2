export const supportedLanguages = [
  { code: 'fr', label: 'Français', shortLabel: 'FR', flag: '🇫🇷', direction: 'ltr' },
  { code: 'en', label: 'English', shortLabel: 'EN', flag: '🇬🇧', direction: 'ltr' },
  { code: 'es', label: 'Español', shortLabel: 'ES', flag: '🇪🇸', direction: 'ltr' },
  { code: 'de', label: 'Deutsch', shortLabel: 'DE', flag: '🇩🇪', direction: 'ltr' },
  { code: 'it', label: 'Italiano', shortLabel: 'IT', flag: '🇮🇹', direction: 'ltr' },
  { code: 'pt', label: 'Português', shortLabel: 'PT', flag: '🇵🇹', direction: 'ltr' },
  { code: 'ja', label: '日本語', shortLabel: 'JA', flag: '🇯🇵', direction: 'ltr' },
  { code: 'hi', label: 'हिन्दी', shortLabel: 'HI', flag: '🇮🇳', direction: 'ltr' },
  { code: 'ko', label: '한국어', shortLabel: 'KO', flag: '🇰🇷', direction: 'ltr' },
  { code: 'ru', label: 'Русский', shortLabel: 'RU', flag: '🇷🇺', direction: 'ltr' },
  { code: 'zh', label: '简体中文', shortLabel: 'ZH', flag: '🇨🇳', direction: 'ltr' },
  { code: 'zh-TW', label: '繁體中文', shortLabel: 'ZH-TW', flag: '🇹🇼', direction: 'ltr' },
  { code: 'ar', label: 'العربية', shortLabel: 'AR', flag: '🇸🇦', direction: 'rtl' },
] as const;

export type LanguageCode = (typeof supportedLanguages)[number]['code'];

export const fallbackLanguage: LanguageCode = 'fr';

export const supportedLanguageCodes = supportedLanguages.map(
  (language) => language.code,
) as LanguageCode[];

export const isLanguageCode = (
  value: string | null | undefined,
): value is LanguageCode =>
  Boolean(value && supportedLanguages.some((language) => language.code === value));

export const normalizeLanguage = (
  value: string | null | undefined,
): LanguageCode => (isLanguageCode(value) ? value : fallbackLanguage);

export const getLanguageDirection = (code: LanguageCode) =>
  supportedLanguages.find((language) => language.code === code)?.direction ?? 'ltr';
