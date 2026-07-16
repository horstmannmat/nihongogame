import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

export type Language = 'en' | 'ja' | 'vi' | 'ne' | 'haw' | 'eu' | 'kk' | 'nl' | 'de' | 'pt-BR';

const DEFAULT_LANGUAGE: Language = 'en';
const LANGUAGE_BY_BASE_CODE: Record<string, Language> = {
  en: 'en',
  ja: 'ja',
  vi: 'vi',
  ne: 'ne',
  haw: 'haw',
  eu: 'eu',
  kk: 'kk',
  nl: 'nl',
  de: 'de',
  pt: 'pt-BR',
};

function detectBrowserLanguage(): Language {
  if (typeof navigator === 'undefined') {
    return DEFAULT_LANGUAGE;
  }

  const preferredLanguages = navigator.languages.length > 0
    ? navigator.languages
    : [navigator.language];

  for (const preferredLanguage of preferredLanguages) {
    const baseCode = preferredLanguage.toLowerCase().split('-')[0];
    const supportedLanguage = LANGUAGE_BY_BASE_CODE[baseCode];
    if (supportedLanguage) {
      return supportedLanguage;
    }
  }

  return DEFAULT_LANGUAGE;
}

type I18nContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
};

const I18nContext = createContext<I18nContextValue | null>(null);

type I18nProviderProps = {
  basePath: string;
  children: ReactNode;
};

export function I18nProvider({ basePath, children }: Readonly<I18nProviderProps>) {
  const [language, setLanguage] = useState<Language>(detectBrowserLanguage);
  const [translations, setTranslations] = useState<Record<string, string> | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    fetch(`${basePath}/${language}.json`, { signal: controller.signal })
      .then((response) => response.json())
      .then((messages: Record<string, string>) => setTranslations(messages))
      .catch((error: unknown) => {
        if (!(error instanceof DOMException && error.name === 'AbortError')) {
          setTranslations({});
        }
      });

    return () => controller.abort();
  }, [basePath, language]);

  const value = useMemo<I18nContextValue>(
    () => ({
      language,
      setLanguage,
      t: (key) => translations?.[key] ?? key,
    }),
    [language, translations],
  );

  if (translations === null) {
    return null;
  }

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);

  if (!context) {
    throw new Error('useI18n must be used inside I18nProvider');
  }

  return context;
}
