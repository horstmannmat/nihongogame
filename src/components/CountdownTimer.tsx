import { useEffect, useState } from "react";

import { useI18n } from "../i18n";

type CountdownTimerProps = {
  seconds: number;
  onComplete: () => void;
};

export default function CountdownTimer({ seconds, onComplete }: Readonly<CountdownTimerProps>) {
  const { t } = useI18n();
  const [remainingSeconds, setRemainingSeconds] = useState(seconds);

  useEffect(() => {
    if (remainingSeconds === 0) {
      onComplete();
      return;
    }

    const timeoutId = window.setTimeout(
      () => setRemainingSeconds((currentSeconds) => currentSeconds - 1),
      1000,
    );
    return () => window.clearTimeout(timeoutId);
  }, [onComplete, remainingSeconds]);

  return (
    <button
      type="button"
      className="stage-timer"
      aria-label={`${t("timer.revealIn")}: ${remainingSeconds}`}
      onClick={onComplete}
    >
      <span className="timer-title">{t("timer.revealIn")}</span>
      <span className="timer-value">{remainingSeconds}</span>
    </button>
  );
}
