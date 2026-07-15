import { useEffect, useState } from "react";

import { useI18n } from "../i18n";
import type { Kana } from "../types";
import StrokeSvg from "./StrokeSvg";

type KanaRoundProps = {
  kana: Kana;
  countdown: number;
  revealSvgs: string[];
  secondaryRevealAtMs: number | null;
  isRevealed: boolean;
};

function splitKanaGlyph(glyph: string) {
  if (glyph.length !== 2) {
    return [glyph];
  }

  return new Set(["ゃ", "ゅ", "ょ", "ャ", "ュ", "ョ"]).has(glyph[1]) ? [glyph[0], glyph[1]] : [glyph];
}

export { splitKanaGlyph };

export default function KanaRound({ kana, countdown, revealSvgs, secondaryRevealAtMs, isRevealed }: KanaRoundProps) {
  const { t } = useI18n();
  const kanaParts = splitKanaGlyph(kana.kana);
  const [showSecondaryStroke, setShowSecondaryStroke] = useState(kanaParts.length < 2);

  useEffect(() => {
    setShowSecondaryStroke(kanaParts.length < 2);

    if (kanaParts.length < 2 || secondaryRevealAtMs == null) {
      return;
    }

    const timeoutId = window.setTimeout(() => setShowSecondaryStroke(true), secondaryRevealAtMs);
    return () => window.clearTimeout(timeoutId);
  }, [kanaParts.length, secondaryRevealAtMs, kana.romaji, kana.type, isRevealed]);

  return (
    <section className="round-card" aria-live="polite">
      <div className="round-copy">
        <div className="romaji">{kana.romaji}</div>
        <div className="script-label">({t(`script.${kana.type}`)})</div>
      </div>
      <div className="stroke-stage">
        {isRevealed ? (
          <div className={`stroke-art-grid stroke-art-grid-${kanaParts.length}`}>
            {revealSvgs[0] ? <StrokeSvg key={`${kana.romaji}-${kana.type}-0`} svgText={revealSvgs[0]} className="stroke-art stroke-art--primary" /> : null}
            {kanaParts.length < 2 || !revealSvgs[1] ? null : (
              <StrokeSvg key={`${kana.romaji}-${kana.type}-1`} svgText={revealSvgs[1]} className={`stroke-art stroke-art--secondary ${showSecondaryStroke ? "" : "stroke-art--placeholder-svg"}`} />
            )}
          </div>
        ) : (
          <div className="stage-timer"><span className="timer-title">{t("timer.revealIn")}</span><span className="timer-value">{countdown}</span></div>
        )}
      </div>
    </section>
  );
}
