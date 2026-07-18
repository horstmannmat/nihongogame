import { useI18n } from "../i18n";

const REPOSITORY_URL = "https://github.com/horstmannmat/nihongogame";
const KANJI_CREDIT_URL = "https://github.com/parsimonhi/animCJK";
const KANA_CREDIT_URL = "https://github.com/zhengkyl/strokesvg";
const OTHER_REFERENCES = [
  { name: "The Kanji Map", url: "https://thekanjimap.com/about" },
  { name: "Jisho.org", url: "https://jisho.org/about" },
  { name: "Kanji alive", url: "https://kanjialive.com/" },
] as const;

export default function AboutPage() {
  const { t } = useI18n();

  return (
    <div className="about-page">
      <p className="eyebrow">{t("about.title")}</p>
      <h1>{t("about.whyTitle")}</h1>
      <p>{t("about.whyCopy")}</p>
      <p>{t("about.whyCopy2")}</p>
      <p>
        {t("about.source")}{" "}
        <a href={REPOSITORY_URL} target="_blank" rel="noreferrer">
          horstmannmat/nihongogame
        </a>
      </p>
      <h2>{t("about.credits")}</h2>
      <p>
        {t("about.kanjiCredit")}{" "}
        <a href={KANJI_CREDIT_URL} target="_blank" rel="noreferrer">
          parsimonhi/animCJK
        </a>
      </p>
      <p>
        {t("about.kanaCredit")}{" "}
        <a href={KANA_CREDIT_URL} target="_blank" rel="noreferrer">
          zhengkyl/strokesvg
        </a>
      </p>
      <h2>{t("about.references")}</h2>
      <p>{t("about.referencesCopy")}</p>
      <ul className="about-reference-list">
        {OTHER_REFERENCES.map((reference) => (
          <li key={reference.url}>
            <a href={reference.url} target="_blank" rel="noreferrer">
              {reference.name}
            </a>
          </li>
        ))}
      </ul>
      <h2>{t("about.copyright")}</h2>
      <p>{t("about.copyrightCopy")}</p>
    </div>
  );
}
