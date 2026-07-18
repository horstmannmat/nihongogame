import { useEffect, useState } from "react";

import type { Kanji } from "../types/Kanji";
import { useI18n } from "../i18n";
import CountdownTimer from "./CountdownTimer";
import StrokeSvg from "./StrokeSvg";

type KanjiRoundProps = {
  kanji: Kanji;
  publicBase: string;
  progress: { current: number; total: number };
  onComplete: () => void;
};

const COUNTDOWN_SECONDS = 8;
const REVEAL_MS_PER_GLYPH = 8000;
const REVEAL_SEC_PER_GLYPH = REVEAL_MS_PER_GLYPH / 1000;
const HOLD_AFTER_REVEAL_MS = 1000;

/** Scale AnimCJK --d/--t so the full stroke animation fits within targetSec. */
function scaleKanjiSvgToDuration(svgText: string, targetSec: number) {
  const delays: number[] = [];
  const delayPattern = /--d:([0-9.]+)s/g;
  let delayMatch = delayPattern.exec(svgText);
  while (delayMatch) {
    delays.push(Number(delayMatch[1]));
    delayMatch = delayPattern.exec(svgText);
  }

  const durationMatch = /--t:([0-9.]+)s/.exec(svgText);
  const strokeDurationSec = durationMatch ? Number(durationMatch[1]) : 0.8;
  const lastDelaySec = delays.length > 0 ? Math.max(...delays) : 0;
  const totalSec = lastDelaySec + strokeDurationSec;

  if (totalSec <= 0 || totalSec <= targetSec) {
    return svgText;
  }

  const scale = targetSec / totalSec;
  const scaleDelay = (_: string, value: string) => `--d:${(Number(value) * scale).toFixed(3)}s`;
  const scaleDuration = (_: string, value: string) => `--t:${(Number(value) * scale).toFixed(3)}s`;
  return svgText.replace(/--d:([0-9.]+)s/g, scaleDelay).replace(/--t:([0-9.]+)s/g, scaleDuration);
}

function splitKanjiGlyph(glyph: string) {
  return Array.from(glyph);
}

function renderReadings(readings: readonly string[]) {
  return readings.map((reading, index) => (
    <span key={`${reading}-${index}`} className="kanji-reading-item">
      {reading}{index < readings.length - 1 ? "," : ""}
    </span>
  ));
}

function getSvgUrl(part: string, publicBase: string) {
  return `${publicBase}/kanji/kanjistrokes-dist/${part.codePointAt(0)}.svg`;
}

async function fetchKanjiSvg(part: string, publicBase: string, signal: AbortSignal) {
  const response = await fetch(getSvgUrl(part, publicBase), { signal });
  if (!response.ok) throw new Error("SVG not found");
  return response.text();
}

async function loadPreparedSvgs(kanji: Kanji, publicBase: string, signal: AbortSignal) {
  const parts = splitKanjiGlyph(kanji.kanji);
  const svgs = await Promise.all(parts.map((part) => fetchKanjiSvg(part, publicBase, signal)));
  return svgs.map((svg) => scaleKanjiSvgToDuration(svg, REVEAL_SEC_PER_GLYPH));
}

function scheduleGlyphAdvances(glyphCount: number, onAdvance: (index: number) => void) {
  const timeoutIds: number[] = [];
  for (let index = 1; index < glyphCount; index += 1) {
    timeoutIds.push(window.setTimeout(() => onAdvance(index), REVEAL_MS_PER_GLYPH * index));
  }
  return timeoutIds;
}

function isAbortError(error: unknown) {
  return error instanceof DOMException && error.name === "AbortError";
}

type KanjiGlyphProps = {
  svgText: string;
  isPlaying: boolean;
};

function KanjiGlyph({ svgText, isPlaying }: Readonly<KanjiGlyphProps>) {
  return (
    <StrokeSvg
      svgText={svgText}
      className={`stroke-art stroke-art--kanji ${isPlaying ? "" : "stroke-art--placeholder-svg"}`}
    />
  );
}

export default function KanjiRound({ kanji, publicBase, progress, onComplete }: Readonly<KanjiRoundProps>) {
  const { t } = useI18n();
  const kanjiParts = splitKanjiGlyph(kanji.kanji);
  const [isRevealed, setIsRevealed] = useState(false);
  const [revealSvgs, setRevealSvgs] = useState<string[]>([]);
  // Latest glyph allowed to animate; earlier glyphs stay drawn, later ones stay grey.
  const [activeStrokeIndex, setActiveStrokeIndex] = useState(0);

  useEffect(() => {
    if (!isRevealed) {
      return;
    }

    const controller = new AbortController();
    let advanceTimeoutId: number | undefined;
    let glyphTimeoutIds: number[] = [];
    let cancelled = false;

    setRevealSvgs([]);
    setActiveStrokeIndex(0);

    loadPreparedSvgs(kanji, publicBase, controller.signal)
      .then((preparedSvgs) => {
        if (cancelled) return;

        setRevealSvgs(preparedSvgs);
        glyphTimeoutIds = scheduleGlyphAdvances(preparedSvgs.length, setActiveStrokeIndex);
        advanceTimeoutId = window.setTimeout(
          onComplete,
          preparedSvgs.length * REVEAL_MS_PER_GLYPH + HOLD_AFTER_REVEAL_MS,
        );
      })
      .catch((error: unknown) => {
        if (isAbortError(error)) return;
        setRevealSvgs([]);
        advanceTimeoutId = window.setTimeout(onComplete, 1500);
      });

    return () => {
      cancelled = true;
      controller.abort();
      if (advanceTimeoutId !== undefined) window.clearTimeout(advanceTimeoutId);
      glyphTimeoutIds.forEach((timeoutId) => window.clearTimeout(timeoutId));
    };
  }, [isRevealed, kanji, onComplete, publicBase]);

  return (
    <section className={`round-card ${kanjiParts.length > 1 ? "round-card--compound-kanji" : ""}`} aria-live="polite">
      <div className="round-progress" aria-label={`${progress.current} of ${progress.total}`}>
        {progress.current}/{progress.total}
      </div>
      <div className="round-copy">
        {(kanji.kunyomi.length > 0 || kanji.onyomi.length > 0) && (
          <div className="kanji-readings">
            {kanji.kunyomi.length > 0 && (
              <div>
                <div className="kanji-reading-label">{t("reading.kunyomi")}:</div>
                <div className="kanji-reading-value">{renderReadings(kanji.kunyomi)}</div>
              </div>
            )}
            {kanji.onyomi.length > 0 && (
              <div>
                <div className="kanji-reading-label">{t("reading.onyomi")}:</div>
                <div className="kanji-reading-value">{renderReadings(kanji.onyomi)}</div>
              </div>
            )}
          </div>
        )}
        <div className="script-label">{kanji.meaning.join(", ")}</div>
        <div className="script-label">{kanji.level}</div>
      </div>
      <div className="stroke-stage">
        {isRevealed ? (
          <div className="stroke-art-grid stroke-art-grid--kanji">
            {kanjiParts.map((part, index) => {
              const svgText = revealSvgs[index];
              if (!svgText) return null;
              // Later glyphs stay grey until their turn; remount via key so iOS restarts animation.
              const isPlaying = index <= activeStrokeIndex;
              return (
                <KanjiGlyph
                  key={`${kanji.kanji}-${part}-${index}-${isPlaying ? "play" : "hold"}`}
                  svgText={svgText}
                  isPlaying={isPlaying}
                />
              );
            })}
          </div>
        ) : (
          <CountdownTimer seconds={COUNTDOWN_SECONDS} onComplete={() => setIsRevealed(true)} />
        )}
      </div>
    </section>
  );
}
