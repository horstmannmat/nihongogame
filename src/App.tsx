import { useEffect, useMemo, useState } from "react";

import KanaRound, { splitKanaGlyph } from "./components/KanaRound";
import KanjiRound from "./components/KanjiRound";
import SetupCard from "./components/SetupCard";
import { Hard, HIRAGANA, KATAKANA, N1, N2, N3, N4, N5 } from "./constants";
import type { Kana, KanaType, Kanji, KanjiLevel } from "./types";

type Phase = "setup" | "countdown" | "reveal" | "finished";
type ScriptSelection = Record<KanaType, boolean>;
type KanjiSelection = Record<KanjiLevel, boolean>;
type Round = Kana | Kanji;

const EMPTY_KANA_SELECTION: ScriptSelection = { hiragana: false, katakana: false };
const EMPTY_KANJI_SELECTION: KanjiSelection = { N5: false, N4: false, N3: false, N2: false, N1: false, Hard: false };

function isKana(round: Round): round is Kana {
  return "type" in round;
}

function getCountdownDuration(round: Round) {
  return isKana(round) ? 3 : 8;
}

function pickNextRound<T>(pool: T[]) {
  const index = Math.floor(Math.random() * pool.length);
  return { round: pool[index], nextPool: [...pool.slice(0, index), ...pool.slice(index + 1)] };
}

function getStrokeCount(svgText: string) {
  const document = new DOMParser().parseFromString(svgText, "image/svg+xml");
  return document.querySelectorAll('g[data-strokesvg="strokes"] > *, path[clip-path]').length;
}

function getKanaRevealDuration(strokeCount: number) {
  return (0.12 + Math.max(strokeCount - 1, 0) * 0.75 + 1.4) * 1000;
}

function getRoundSvgUrls(round: Round) {
  if (isKana(round)) {
    return splitKanaGlyph(round.kana).map((part) => `/kanastrokes-dist/${round.type}/${encodeURIComponent(part)}.svg`);
  }

  return [`/kanjistrokes-dist/${round.level}/${round.kanji.codePointAt(0)}.svg`];
}

export default function Game() {
  const [selectedScripts, setSelectedScripts] = useState<ScriptSelection>({ hiragana: true, katakana: true });
  const [selectedKanjiLevels, setSelectedKanjiLevels] = useState<KanjiSelection>(EMPTY_KANJI_SELECTION);
  const [phase, setPhase] = useState<Phase>("setup");
  const [countdown, setCountdown] = useState(3);
  const [remainingRounds, setRemainingRounds] = useState<Round[]>([]);
  const [currentRound, setCurrentRound] = useState<Round | null>(null);
  const [revealSvgs, setRevealSvgs] = useState<string[]>([]);
  const [secondaryRevealAtMs, setSecondaryRevealAtMs] = useState<number | null>(null);
  const allKanas = useMemo(() => [...HIRAGANA, ...KATAKANA], []);
  const allKanjis = useMemo(() => [...N5, ...N4, ...N3, ...N2, ...N1, ...Hard], []);
  const availableKanas = useMemo(() => allKanas.filter((kana) => selectedScripts[kana.type]), [allKanas, selectedScripts]);
  const availableKanjis = useMemo(() => allKanjis.filter((kanji) => selectedKanjiLevels[kanji.level]), [allKanjis, selectedKanjiLevels]);
  const availableRounds = useMemo<Round[]>(() => [...availableKanas, ...availableKanjis], [availableKanas, availableKanjis]);
  const canStart = phase === "setup" && availableRounds.length > 0;

  useEffect(() => {
    if (phase !== "countdown") return;
    if (countdown === 0) {
      setPhase("reveal");
      return;
    }
    const timeoutId = window.setTimeout(() => setCountdown((value) => value - 1), 1000);
    return () => window.clearTimeout(timeoutId);
  }, [countdown, phase]);

  useEffect(() => {
    if (phase !== "reveal" || !currentRound) return;

    const round = currentRound;
    const controller = new AbortController();
    const urls = getRoundSvgUrls(round);
    setRevealSvgs([]);
    setSecondaryRevealAtMs(null);

    async function loadSvg() {
      try {
        const svgs = await Promise.all(urls.map(async (url) => {
          const response = await fetch(url, { signal: controller.signal });
          if (!response.ok) throw new Error("SVG not found");
          return response.text();
        }));
        setRevealSvgs(svgs);
        if (isKana(round) && svgs.length > 1) {
          setSecondaryRevealAtMs(getKanaRevealDuration(getStrokeCount(svgs[0] ?? "")));
        }
      } catch (error) {
        if (!(error instanceof DOMException && error.name === "AbortError")) setRevealSvgs([]);
      }
    }

    loadSvg();
    const revealDuration = isKana(round) ? (round.kana.length > 1 ? 8000 : 4800) : 8000;
    const timeoutId = window.setTimeout(() => {
      if (remainingRounds.length === 0) {
        setPhase("finished");
        return;
      }
      const next = pickNextRound(remainingRounds);
      setRemainingRounds(next.nextPool);
      setCurrentRound(next.round);
      setCountdown(getCountdownDuration(next.round));
      setRevealSvgs([]);
      setSecondaryRevealAtMs(null);
      setPhase("countdown");
    }, revealDuration);

    return () => {
      controller.abort();
      window.clearTimeout(timeoutId);
    };
  }, [currentRound, phase, remainingRounds]);

  function toggleScript(script: KanaType) {
    setSelectedScripts((current) => ({ ...current, [script]: !current[script] }));
    setSelectedKanjiLevels(EMPTY_KANJI_SELECTION);
  }

  function toggleKanjiLevel(level: KanjiLevel) {
    setSelectedKanjiLevels((current) => ({ ...current, [level]: !current[level] }));
    setSelectedScripts(EMPTY_KANA_SELECTION);
  }

  function startGame() {
    if (!canStart) return;
    const next = pickNextRound(availableRounds);
    setRemainingRounds(next.nextPool);
    setCurrentRound(next.round);
    setCountdown(getCountdownDuration(next.round));
    setRevealSvgs([]);
    setSecondaryRevealAtMs(null);
    setPhase("countdown");
  }

  function resetGame() {
    setRemainingRounds([]);
    setCurrentRound(null);
    setRevealSvgs([]);
    setSecondaryRevealAtMs(null);
    setCountdown(3);
    setPhase("setup");
  }

  if (phase === "finished") {
    return <main className="app-shell"><section className="setup-card"><p className="eyebrow">Japanese strokes</p><h1>Round complete</h1><p className="setup-copy">The current pool is empty. Restart with the same selection or adjust it first.</p><button className="primary-button" type="button" onClick={resetGame}>Back to setup</button></section></main>;
  }

  return (
    <main className="app-shell">
      {phase === "setup" ? <SetupCard selectedScripts={selectedScripts} selectedKanjiLevels={selectedKanjiLevels} canStart={canStart} onToggleScript={toggleScript} onToggleKanjiLevel={toggleKanjiLevel} onStart={startGame} /> : null}
      {currentRound && phase !== "setup" ? isKana(currentRound) ? <KanaRound kana={currentRound} countdown={countdown} revealSvgs={revealSvgs} secondaryRevealAtMs={secondaryRevealAtMs} isRevealed={phase === "reveal"} /> : <KanjiRound kanji={currentRound} countdown={countdown} svgText={revealSvgs[0] ?? ""} isRevealed={phase === "reveal"} /> : null}
    </main>
  );
}
