import { useLayoutEffect, useRef } from "react";

type StrokeSvgProps = {
  svgText: string;
  className: string;
};

export default function StrokeSvg({ svgText, className }: StrokeSvgProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (containerRef.current) {
      containerRef.current.innerHTML = svgText;
    }
  }, [svgText]);

  return <div ref={containerRef} className={className} />;
}
