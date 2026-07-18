import { useEffect, useState } from "react";

import { useI18n } from "../i18n";
import type { Kana } from "../types/Kana";
import CountdownTimer from "./CountdownTimer";
import StrokeSvg from "./StrokeSvg";

type KanaRoundProps = {
  kana: Kana;
  publicBase: string;
  progress: { current: number; total: number };
  onComplete: () => void;
};

const COUNTDOWN_SECONDS = 3;
const HOLD_AFTER_REVEAL_MS = 1000;


function splitKanaGlyph(glyph: string) {
  if (glyph.length !== 2) {
    return [glyph];
  }

  return new Set(['ゃ', 'ゅ', 'ょ', 'ャ', 'ュ', 'ョ']).has(glyph[1]) ? [glyph[0], glyph[1]] : [glyph];
}

function getStrokeCount(svgText: string) {
  const document = new DOMParser().parseFromString(svgText, "image/svg+xml");
  return document.querySelectorAll('g[data-strokesvg="strokes"] > *, path[clip-path]').length;
}

function getKanaRevealDuration(strokeCount: number) {
  return (0.12 + Math.max(strokeCount - 1, 0) * 0.75 + 1.4) * 1000;
}

function getRevealDurationMs(kana: Kana) {
  const strokeMs = kana.kana.length > 1 ? 8000 : 4800;
  return strokeMs + HOLD_AFTER_REVEAL_MS;
}

function getSvgUrls(kana: Kana, publicBase: string) {
  return splitKanaGlyph(kana.kana).map(
    (part) => `${publicBase}/kana/kanastrokes-dist/${kana.type}/${encodeURIComponent(part)}.svg`,
  );
}

export default function KanaRound({ kana, publicBase, progress, onComplete }: Readonly<KanaRoundProps>) {
  const { t } = useI18n();
  const kanaParts = splitKanaGlyph(kana.kana);
  const [isRevealed, setIsRevealed] = useState(false);
  const [revealSvgs, setRevealSvgs] = useState<string[]>([]);
  const [showSecondaryStroke, setShowSecondaryStroke] = useState(kanaParts.length < 2);

  useEffect(() => {
    if (!isRevealed) {
      return;
    }

    const controller = new AbortController();
    let advanceTimeoutId: number | undefined;
    let secondaryTimeoutId: number | undefined;
    let cancelled = false;

    setRevealSvgs([]);
    setShowSecondaryStroke(kanaParts.length < 2);

    async function loadSvg() {
      try {
        const svgs = await Promise.all(
          getSvgUrls(kana, publicBase).map(async (url) => {
            const response = await fetch(url, { signal: controller.signal });
            if (!response.ok) throw new Error("SVG not found");
            return response.text();
          }),
        );
        if (cancelled) return;

        setRevealSvgs(svgs);

        if (svgs.length > 1) {
          const secondaryRevealAtMs = getKanaRevealDuration(getStrokeCount(svgs[0] ?? ""));
          secondaryTimeoutId = window.setTimeout(() => setShowSecondaryStroke(true), secondaryRevealAtMs);
        }

        advanceTimeoutId = window.setTimeout(onComplete, getRevealDurationMs(kana));
      } catch (error) {
        if (!(error instanceof DOMException && error.name === "AbortError")) {
          setRevealSvgs([]);
          advanceTimeoutId = window.setTimeout(onComplete, 1500);
        }
      }
    }

    loadSvg();

    return () => {
      cancelled = true;
      controller.abort();
      if (advanceTimeoutId !== undefined) window.clearTimeout(advanceTimeoutId);
      if (secondaryTimeoutId !== undefined) window.clearTimeout(secondaryTimeoutId);
    };
  }, [isRevealed, kana, kanaParts.length, onComplete, publicBase]);

  return (
    <section className="round-card" aria-live="polite">
      <div className="round-progress" aria-label={`${progress.current} of ${progress.total}`}>
        {progress.current}/{progress.total}
      </div>
      <div className="round-copy">
        <div className="romaji">{kana.romaji}</div>
        <div className="script-label">({t(`script.${kana.type}`)})</div>
      </div>
      <div className="stroke-stage">
        {isRevealed ? (
          <div className={`stroke-art-grid stroke-art-grid-${kanaParts.length}`}>
            {revealSvgs[0] ? <StrokeSvg key={`${kana.romaji}-${kana.type}-0`} svgText={revealSvgs[0]} className="stroke-art stroke-art--primary" /> : null}
            {kanaParts.length < 2 || !revealSvgs[1] ? null : (
              <StrokeSvg
                key={`${kana.romaji}-${kana.type}-1-${showSecondaryStroke ? "play" : "hold"}`}
                svgText={revealSvgs[1]}
                className={`stroke-art stroke-art--secondary ${showSecondaryStroke ? "" : "stroke-art--placeholder-svg"}`}
              />
            )}
          </div>
        ) : (
          <CountdownTimer seconds={COUNTDOWN_SECONDS} onComplete={() => setIsRevealed(true)} />
        )}
      </div>
    </section>
  );
}
