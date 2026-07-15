import { useI18n, type Language } from '../i18n';

const LANGUAGES: Language[] = ['ja', 'vi', 'ne', 'haw', 'eu', 'nl', 'de', 'pt-BR', 'en'];

export default function LanguageSelector() {
  const { language, setLanguage, t } = useI18n();

  return (
    <label className="language-selector">
      <span>{t('language')}</span>
      <select
        aria-label={t('language')}
        value={language}
        onChange={(event) => setLanguage(event.target.value as Language)}
      >
        {LANGUAGES.map((option) => (
          <option key={option} value={option}>
            {t(`language.${option}`)}
          </option>
        ))}
      </select>
    </label>
  );
}
