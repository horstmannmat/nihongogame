import { useLayoutEffect, useRef } from "react";

type StrokeSvgProps = {
  svgText: string;
  className: string;
};

function restartStrokeAnimations(container: HTMLDivElement) {
  const strokes = container.querySelectorAll('g[data-strokesvg="strokes"] > *, path[clip-path]');
  strokes.forEach((node) => {
    const element = node as HTMLElement;
    element.style.animation = "none";
    void element.getBoundingClientRect();
    element.style.removeProperty("animation");
  });
}

export default function StrokeSvg({ svgText, className }: StrokeSvgProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.innerHTML = svgText;

    // iOS Safari often skips CSS animations after display:none or remount unless restarted.
    if (!className.includes("stroke-art--placeholder-svg")) {
      requestAnimationFrame(() => {
        if (containerRef.current === container) {
          restartStrokeAnimations(container);
        }
      });
    }
  }, [svgText, className]);

  return <div ref={containerRef} className={className} />;
}
