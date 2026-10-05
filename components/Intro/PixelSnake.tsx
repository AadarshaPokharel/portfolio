"use client";

import { COLORS } from "./constants";
import { usePixelSnake } from "./hooks/usePixelSnake";

type PixelSnakeProps = {
  enabled: boolean;
  durationMs: number;
  onComplete: () => void;
};

export function PixelSnake({ enabled, durationMs, onComplete }: PixelSnakeProps) {
  const { wrapRef, canvasRef, grid } = usePixelSnake({
    enabled,
    durationMs,
    onComplete,
  });

  const cells = grid.cols * grid.rows;

  return (
    <div
      ref={wrapRef}
      className="relative h-full w-full overflow-hidden"
      style={{
        // Graph-paper fade: strong in the top-right, dissolving at the edges.
        maskImage:
          "linear-gradient(to left, black 42%, transparent 100%), linear-gradient(to bottom, black 55%, transparent 100%)",
        maskComposite: "intersect",
        WebkitMaskImage:
          "linear-gradient(to left, black 42%, transparent 100%), linear-gradient(to bottom, black 55%, transparent 100%)",
        WebkitMaskComposite: "source-in",
      }}
      aria-hidden
    >
      <div
        className="pointer-events-none absolute left-0 top-0 grid"
        style={{
          gridTemplateColumns: `repeat(${Math.max(grid.cols, 1)}, ${grid.cellSize}px)`,
          gridTemplateRows: `repeat(${Math.max(grid.rows, 1)}, ${grid.cellSize}px)`,
        }}
      >
        {Array.from({ length: cells }).map((_, i) => (
          <div
            key={i}
            className="box-border"
            style={{ border: `1px solid ${COLORS.gridLine}` }}
          />
        ))}
      </div>
      <canvas ref={canvasRef} className="absolute left-0 top-0 block" />
    </div>
  );
}
