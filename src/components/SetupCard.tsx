import { useState } from "react";

import { Hard, HIRAGANA, KATAKANA, N1, N2, N3, N4, N5 } from "../constants";
import type { KanaType } from "../types/Kana";
import type { KanjiLevel } from "../types/Kanji";
import { useI18n } from "../i18n";
import LanguageSelector from "./LanguageSelector";

type SetupCardProps = {
  selectedScripts: Record<KanaType, boolean>;
  selectedKanjiLevels: Record<KanjiLevel, boolean>;
  canStart: boolean;
  onToggleScript: (script: KanaType) => void;
  onToggleKanjiLevel: (level: KanjiLevel) => void;
  onStart: () => void;
};

type Section = "kana" | "kanji";

const KANA_OPTIONS: Array<{ script: KanaType; count: number }> = [
  { script: "hiragana", count: HIRAGANA.length },
  { script: "katakana", count: KATAKANA.length },
];

const KANJI_LEVEL_OPTIONS: Array<{ level: KanjiLevel; label: string; descriptionKey: string; count: number }> = [
  { level: "N5", label: "N5", descriptionKey: "level.beginner", count: N5.length },
  { level: "N4", label: "N4", descriptionKey: "level.basic", count: N4.length },
  { level: "N3", label: "N3", descriptionKey: "level.intermediate", count: N3.length },
  { level: "N2", label: "N2", descriptionKey: "level.upperIntermediate", count: N2.length },
  { level: "N1", label: "N1", descriptionKey: "level.advanced", count: N1.length },
  { level: "Hard", label: "🤯", descriptionKey: "level.hard", count: Hard.length },
];

export default function SetupCard({ selectedScripts, selectedKanjiLevels, canStart, onToggleScript, onToggleKanjiLevel, onStart }: Readonly<SetupCardProps>) {
  const { t } = useI18n();
  const [openSection, setOpenSection] = useState<Section | null>(null);

  const toggleSection = (section: Section) => {
    setOpenSection((current) => current === section ? null : section);
  };

  return (
    <section className="setup-card">
      <div className="card-header">
        <p className="eyebrow">{t("eyebrow")}</p>
        <LanguageSelector />
      </div>
      <h1>{t("setup.title")}</h1>
      <p className="setup-copy">{t("setup.copy")}</p>
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
              {KANA_OPTIONS.map(({ script, count }) => (
                <label className="script-toggle" key={script}>
                  <input type="checkbox" checked={selectedScripts[script]} onChange={() => onToggleScript(script)} />
                  <span className="script-toggle-copy">
                    <strong>{t(`script.${script}`)}</strong>
                    <em>{t(`script.${script}Description`)}</em>
                  </span>
                  <span className="script-toggle-count">{count}</span>
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
                  <span className="script-toggle-count">{option.count}</span>
                </label>
              ))}
            </div>
          ) : null}
        </div>
      </div>
      <button className="primary-button" type="button" onClick={onStart} disabled={!canStart}>{t("action.start")}</button>
    </section>
  );
}
