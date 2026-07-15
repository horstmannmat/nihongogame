import type { KanaType, KanjiLevel } from "../types";

type SetupCardProps = {
  selectedScripts: Record<KanaType, boolean>;
  selectedKanjiLevels: Record<KanjiLevel, boolean>;
  canStart: boolean;
  onToggleScript: (script: KanaType) => void;
  onToggleKanjiLevel: (level: KanjiLevel) => void;
  onStart: () => void;
};

const KANJI_LEVEL_OPTIONS: Array<{ level: KanjiLevel; label: string; description: string }> = [
  { level: "N5", label: "N5", description: "beginner" },
  { level: "N4", label: "N4", description: "basic" },
  { level: "N3", label: "N3", description: "intermediate" },
  { level: "N2", label: "N2", description: "upper intermediate" },
  { level: "N1", label: "N1", description: "advanced" },
  { level: "Hard", label: "🤯", description: "hard" },
];

export default function SetupCard({ selectedScripts, selectedKanjiLevels, canStart, onToggleScript, onToggleKanjiLevel, onStart }: SetupCardProps) {
  return (
    <section className="setup-card">
      <p className="eyebrow">Japanese strokes</p>
      <h1>Reading to stroke order</h1>
      <p className="setup-copy">Pick Kana or Kanji options. Selecting one side clears the other. Each round waits 3 seconds before showing the stroke sequence.</p>
      <div className="selection-grid">
        <div className="selection-group">
          <div className="selection-group-title">Kanas</div>
          <div className="script-grid">
            {(["hiragana", "katakana"] as KanaType[]).map((script) => (
              <label className="script-toggle" key={script}>
                <input type="checkbox" checked={selectedScripts[script]} onChange={() => onToggleScript(script)} />
                <span><strong>{script === "hiragana" ? "Hiragana" : "Katakana"}</strong><em>{script === "hiragana" ? "soft, rounded forms" : "sharp, angular forms"}</em></span>
              </label>
            ))}
          </div>
        </div>
        <div className="selection-group">
          <div className="selection-group-title">Kanji</div>
          <div className="script-grid">
            {KANJI_LEVEL_OPTIONS.map((option) => (
              <label className="script-toggle" key={option.level}>
                <input type="checkbox" checked={selectedKanjiLevels[option.level]} onChange={() => onToggleKanjiLevel(option.level)} />
                <span><strong>{option.label}</strong><em>{option.description}</em></span>
              </label>
            ))}
          </div>
        </div>
      </div>
      <button className="primary-button" type="button" onClick={onStart} disabled={!canStart}>Start</button>
    </section>
  );
}
