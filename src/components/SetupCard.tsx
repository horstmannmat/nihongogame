import { useState } from "react";

import type { KanaType } from "../types/Kana";
import type { KanjiLevel } from "../types/Kanji";
import { useI18n } from "../i18n";
import AboutPage from "./AboutPage";
import LanguageSelector from "./LanguageSelector";

type SetupCardProps = {
  selectedScripts: Record<KanaType, boolean>;
  selectedKanjiLevels: Record<KanjiLevel, boolean>;
  kanaCounts: Record<KanaType, number>;
  kanjiCounts: Record<KanjiLevel, number>;
  canStart: boolean;
  onToggleScript: (script: KanaType) => void;
  onToggleKanjiLevel: (level: KanjiLevel) => void;
  onStart: () => void;
};

type Section = "kana" | "kanji";

/** Renders `**bold**` segments from i18n strings as <strong>. */
function renderInlineBold(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).filter(Boolean).map((part) => {
    const match = /^\*\*([^*]+)\*\*$/.exec(part);
    if (match) {
      return <strong key={`bold:${match[1]}`}>{match[1]}</strong>;
    }
    return <span key={`text:${part}`}>{part}</span>;
  });
}

const KANA_OPTIONS: KanaType[] = ["hiragana", "katakana"];

const KANJI_LEVEL_OPTIONS: Array<{ level: KanjiLevel; label: string; descriptionKey: string }> = [
  { level: "N5", label: "N5", descriptionKey: "level.beginner" },
  { level: "N4", label: "N4", descriptionKey: "level.basic" },
  { level: "N3", label: "N3", descriptionKey: "level.intermediate" },
  { level: "N2", label: "N2", descriptionKey: "level.upperIntermediate" },
  { level: "N1", label: "N1", descriptionKey: "level.advanced" },
  { level: "Hard", label: "🤯", descriptionKey: "level.hard" },
];

export default function SetupCard({ selectedScripts, selectedKanjiLevels, kanaCounts, kanjiCounts, canStart, onToggleScript, onToggleKanjiLevel, onStart }: Readonly<SetupCardProps>) {
  const { t } = useI18n();
  const [openSection, setOpenSection] = useState<Section | null>(null);
  const [showAbout, setShowAbout] = useState(false);

  const toggleSection = (section: Section) => {
    setOpenSection((current) => current === section ? null : section);
  };

  if (showAbout) {
    return (
      <div className="setup-card-frame">
        <button className="about-tab" type="button" onClick={() => setShowAbout(false)}>
          {t("about.home")}
        </button>
        <section className="setup-card setup-card--about">
          <AboutPage />
        </section>
      </div>
    );
  }

  return (
    <div className="setup-card-frame">
      <button className="about-tab" type="button" onClick={() => setShowAbout(true)}>
        {t("about.title")}
      </button>
      <section className="setup-card">
        <div className="setup-body">
          <div className="card-header">
            <p className="eyebrow">{t("eyebrow")}</p>
            <div className="card-header-actions">
              <LanguageSelector />
            </div>
          </div>
          <h1>{t("setup.title")}</h1>
          <div className="setup-copy">
            <p>{renderInlineBold(t("setup.copy"))}</p>
            <p>{renderInlineBold(t("setup.copy2"))}</p>
          </div>
          <div className="selection-grid">
            <div className={`selection-group ${openSection === "kana" ? "is-open" : ""}`}>
              <button
                type="button"
                className="selection-group-title"
                aria-expanded={openSection === "kana"}
                onClick={() => toggleSection("kana")}
              >
                <span>{t("setup.kanas")}</span>
                <span className="chevron" aria-hidden="true" />
              </button>
              {openSection === "kana" ? (
                <div className="script-grid">
                  {KANA_OPTIONS.map((script) => (
                    <label className="script-toggle" key={script}>
                      <input type="checkbox" checked={selectedScripts[script]} onChange={() => onToggleScript(script)} />
                      <span className="script-toggle-copy">
                        <strong>{t(`script.${script}`)}</strong>
                        <em>{t(`script.${script}Description`)}</em>
                      </span>
                      <span className="script-toggle-count">{kanaCounts[script]}</span>
                    </label>
                  ))}
                </div>
              ) : null}
            </div>
            <div className={`selection-group ${openSection === "kanji" ? "is-open" : ""}`}>
              <button
                type="button"
                className="selection-group-title"
                aria-expanded={openSection === "kanji"}
                onClick={() => toggleSection("kanji")}
              >
                <span>{t("setup.kanji")}</span>
                <span className="chevron" aria-hidden="true" />
              </button>
              {openSection === "kanji" ? (
                <div className="script-grid">
                  {KANJI_LEVEL_OPTIONS.map((option) => (
                    <label className="script-toggle" key={option.level}>
                      <input type="checkbox" checked={selectedKanjiLevels[option.level]} onChange={() => onToggleKanjiLevel(option.level)} />
                      <span className="script-toggle-copy">
                        <strong>{option.label}</strong>
                        <em>{t(option.descriptionKey)}</em>
                      </span>
                      <span className="script-toggle-count">{kanjiCounts[option.level]}</span>
                    </label>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
          <div className="setup-actions">
            <button className="primary-button" type="button" onClick={onStart} disabled={!canStart}>{t("action.start")}</button>
          </div>
        </div>
      </section>
    </div>
  );
}
