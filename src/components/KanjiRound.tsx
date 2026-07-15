import type { Kanji } from "../types";
import StrokeSvg from "./StrokeSvg";

type KanjiRoundProps = {
  kanji: Kanji;
  countdown: number;
  svgText: string;
  isRevealed: boolean;
};

export default function KanjiRound({ kanji, countdown, svgText, isRevealed }: KanjiRoundProps) {
  return (
    <section className="round-card" aria-live="polite">
      <div className="round-copy">
        <div className="romaji">{kanji.hiragana}</div>
        <div className="script-label">{kanji.meaning} · {kanji.level}</div>
      </div>
      <div className="stroke-stage">
        {isRevealed ? (
          svgText ? <div className="stroke-art-grid stroke-art-grid-1"><StrokeSvg key={kanji.kanji} svgText={svgText} className="stroke-art stroke-art--kanji" /></div> : null
        ) : (
          <div className="stage-timer"><span className="timer-title">Reveal in</span><span className="timer-value">{countdown}</span></div>
        )}
      </div>
    </section>
  );
}
