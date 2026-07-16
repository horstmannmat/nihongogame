import { useCallback, useMemo, useRef, useState } from "react";

import { KanaRound, KanjiRound, LanguageSelector, SetupCard } from "./components";
import { Hard, HIRAGANA, KATAKANA, N1, N2, N3, N4, N5 } from "./constants";
import { useI18n } from "./i18n";
import type { Kana, KanaType } from "./types/Kana";
import type { Kanji, KanjiLevel } from "./types/Kanji";

type Phase = "setup" | "playing" | "finished";
type ScriptSelection = Record<KanaType, boolean>;
type KanjiSelection = Record<KanjiLevel, boolean>;
type Round = Kana | Kanji;

const EMPTY_KANA_SELECTION: ScriptSelection = { hiragana: false, katakana: false };
const EMPTY_KANJI_SELECTION: KanjiSelection = { N5: false, N4: false, N3: false, N2: false, N1: false, Hard: false };
const NIHONGO_PUBLIC_BASE = "";

function isKana(round: Round): round is Kana {
  return "type" in round;
}

function pickRandomIndex(length: number) {
  const buffer = new Uint32Array(1);
  crypto.getRandomValues(buffer);
  return buffer[0] % length;
}

function pickNextRound<T>(pool: T[]) {
  const index = pickRandomIndex(pool.length);
  return { round: pool[index], nextPool: [...pool.slice(0, index), ...pool.slice(index + 1)] };
}

export default function Game() {
  const { t } = useI18n();
  const [selectedScripts, setSelectedScripts] = useState<ScriptSelection>(EMPTY_KANA_SELECTION);
  const [selectedKanjiLevels, setSelectedKanjiLevels] = useState<KanjiSelection>(EMPTY_KANJI_SELECTION);
  const [phase, setPhase] = useState<Phase>("setup");
  const [remainingRounds, setRemainingRounds] = useState<Round[]>([]);
  const [currentRound, setCurrentRound] = useState<Round | null>(null);
  const [totalRounds, setTotalRounds] = useState(0);
  const remainingRoundsRef = useRef(remainingRounds);
  remainingRoundsRef.current = remainingRounds;
  const allKanas = useMemo(() => [...HIRAGANA, ...KATAKANA], []);
  const allKanjis = useMemo(() => [...N5, ...N4, ...N3, ...N2, ...N1, ...Hard], []);
  const availableKanas = useMemo(() => allKanas.filter((kana) => selectedScripts[kana.type]), [allKanas, selectedScripts]);
  const availableKanjis = useMemo(() => allKanjis.filter((kanji) => selectedKanjiLevels[kanji.level]), [allKanjis, selectedKanjiLevels]);
  const availableRounds = useMemo<Round[]>(() => [...availableKanas, ...availableKanjis], [availableKanas, availableKanjis]);
  const canStart = phase === "setup" && availableRounds.length > 0;

  const advanceRound = useCallback(() => {
    const remaining = remainingRoundsRef.current;
    if (remaining.length === 0) {
      setPhase("finished");
      return;
    }
    const next = pickNextRound(remaining);
    setRemainingRounds(next.nextPool);
    setCurrentRound(next.round);
  }, []);

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
    setTotalRounds(availableRounds.length);
    setRemainingRounds(next.nextPool);
    setCurrentRound(next.round);
    setPhase("playing");
  }

  function resetGame() {
    setRemainingRounds([]);
    setCurrentRound(null);
    setTotalRounds(0);
    setPhase("setup");
  }

  if (phase === "finished") {
    return (
      <main className="app-shell">
        <section className="setup-card setup-card--finished">
          <div className="card-header">
            <p className="eyebrow">{t("eyebrow")}</p>
            <LanguageSelector />
          </div>
          <div className="finished-body">
            <h1>{t("finished.title")}</h1>
            <p className="setup-copy">{t("finished.copy")}</p>
            <button className="primary-button" type="button" onClick={resetGame}>{t("finished.backToSetup")}</button>
          </div>
        </section>
      </main>
    );
  }

  let activeRound = null;
  if (currentRound && phase === "playing") {
    const progress = {
      current: totalRounds - remainingRounds.length,
      total: totalRounds,
    };
    activeRound = isKana(currentRound) ? (
      <KanaRound
        key={`${currentRound.romaji}-${currentRound.type}`}
        kana={currentRound}
        publicBase={NIHONGO_PUBLIC_BASE}
        progress={progress}
        onComplete={advanceRound}
      />
    ) : (
      <KanjiRound
        key={`${currentRound.kanji}-${currentRound.level}`}
        kanji={currentRound}
        publicBase={NIHONGO_PUBLIC_BASE}
        progress={progress}
        onComplete={advanceRound}
      />
    );
  }

  return (
    <main className="app-shell">
      {phase === "setup" ? (
        <SetupCard
          selectedScripts={selectedScripts}
          selectedKanjiLevels={selectedKanjiLevels}
          canStart={canStart}
          onToggleScript={toggleScript}
          onToggleKanjiLevel={toggleKanjiLevel}
          onStart={startGame}
        />
      ) : null}
      {activeRound}
    </main>
  );
}
