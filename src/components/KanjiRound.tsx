import { useEffect, useState } from "react";

import type { Kanji } from "../types/Kanji";
import { useI18n } from "../i18n";
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
  return svgText
    .replace(/--d:([0-9.]+)s/g, (_, value: string) => `--d:${(Number(value) * scale).toFixed(3)}s`)
    .replace(/--t:([0-9.]+)s/g, (_, value: string) => `--t:${(Number(value) * scale).toFixed(3)}s`);
}


function splitKanjiGlyph(glyph: string) {
  return Array.from(glyph);
}

function getSvgUrl(part: string, folder: string, publicBase: string) {
  return `${publicBase}/kanjistrokes-dist/${folder}/${part.codePointAt(0)}.svg`;
}

async function fetchKanjiSvg(part: string, level: string, publicBase: string, signal: AbortSignal) {
  let response = await fetch(getSvgUrl(part, level, publicBase), { signal });
  if (!response.ok && level !== "undefined") {
    response = await fetch(getSvgUrl(part, "undefined", publicBase), { signal });
  }
  if (!response.ok) throw new Error("SVG not found");
  return response.text();
}

export default function KanjiRound({ kanji, publicBase, progress, onComplete }: Readonly<KanjiRoundProps>) {
  const { t } = useI18n();
  const kanjiParts = splitKanjiGlyph(kanji.kanji);
  const [countdown, setCountdown] = useState(COUNTDOWN_SECONDS);
  const [revealSvgs, setRevealSvgs] = useState<string[]>([]);
  // Latest glyph allowed to animate; earlier glyphs stay drawn, later ones stay grey.
  const [activeStrokeIndex, setActiveStrokeIndex] = useState(0);
  const isRevealed = countdown === 0;

  useEffect(() => {
    if (isRevealed) return;
    const timeoutId = window.setTimeout(() => setCountdown((value) => value - 1), 1000);
    return () => window.clearTimeout(timeoutId);
  }, [countdown, isRevealed]);

  useEffect(() => {
    if (!isRevealed) {
      return;
    }

    const controller = new AbortController();
    let advanceTimeoutId: number | undefined;
    const glyphTimeoutIds: number[] = [];
    let cancelled = false;

    setRevealSvgs([]);
    setActiveStrokeIndex(0);

    async function loadSvg() {
      try {
        const svgs = await Promise.all(
          splitKanjiGlyph(kanji.kanji).map((part) =>
            fetchKanjiSvg(part, kanji.level, publicBase, controller.signal),
          ),
        );
        if (cancelled) return;

        const preparedSvgs = svgs.map((svg) => scaleKanjiSvgToDuration(svg, REVEAL_SEC_PER_GLYPH));
        setRevealSvgs(preparedSvgs);

        preparedSvgs.slice(1).forEach((_, index) => {
          const timeoutId = window.setTimeout(
            () => setActiveStrokeIndex(index + 1),
            REVEAL_MS_PER_GLYPH * (index + 1),
          );
          glyphTimeoutIds.push(timeoutId);
        });

        advanceTimeoutId = window.setTimeout(
          onComplete,
          preparedSvgs.length * REVEAL_MS_PER_GLYPH + HOLD_AFTER_REVEAL_MS,
        );
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
      glyphTimeoutIds.forEach((timeoutId) => window.clearTimeout(timeoutId));
    };
  }, [isRevealed, kanji, onComplete, publicBase]);

  return (
    <section className={`round-card ${kanjiParts.length > 1 ? "round-card--compound-kanji" : ""}`} aria-live="polite">
      <div className="round-progress" aria-label={`${progress.current} of ${progress.total}`}>
        {progress.current}/{progress.total}
      </div>
      <div className="round-copy">
        <div className="romaji">{kanji.hiragana}</div>
        <div className="script-label">{kanji.meaning} · {kanji.level}</div>
      </div>
      <div className="stroke-stage">
        {isRevealed ? (
          <div className="stroke-art-grid stroke-art-grid--kanji">
            {kanjiParts.map((part, index) => {
              const svgText = revealSvgs[index];
              if (!svgText) {
                return null;
              }

              // Later glyphs stay as a grey outline (placeholder) until their turn,
              // then remount via the key so iOS restarts the stroke animation.
              const isPlaying = index <= activeStrokeIndex;
              return (
                <StrokeSvg
                  key={`${kanji.kanji}-${part}-${index}-${isPlaying ? "play" : "hold"}`}
                  svgText={svgText}
                  className={`stroke-art stroke-art--kanji ${isPlaying ? "" : "stroke-art--placeholder-svg"}`}
                />
              );
            })}
          </div>
        ) : (
          <div className="stage-timer">
            <span className="timer-title">{t("timer.revealIn")}</span>
            <span className="timer-value">{countdown}</span>
          </div>
        )}
      </div>
    </section>
  );
}
