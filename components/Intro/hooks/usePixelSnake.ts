"use client";

import { useEffect, useRef, useState } from "react";
import { COLORS, SNAKE, TIMING } from "../constants";

export type Point = { x: number; y: number };

type Dot = { gx: number; gy: number; color: string };
type Pattern = { dots: Dot[]; streaks: { gy: number; alpha: number }[] };

function key(p: Point) {
  return `${p.x},${p.y}`;
}

function pickWeighted<T extends { w: number }>(items: T[]): T {
  const total = items.reduce((sum, item) => sum + item.w, 0);
  let roll = Math.random() * total;
  for (const item of items) {
    roll -= item.w;
    if (roll <= 0) return item;
  }
  return items[items.length - 1];
}

/** Biased staircase walk: start bottom-right, prefer left + up, never overlap. */
function generatePath(cols: number, rows: number, target: number): Point[] {
  let best: Point[] = [];

  for (let attempt = 0; attempt < 16; attempt++) {
    const start: Point = { x: cols - 1, y: rows - 1 };
    const visited = new Set([key(start)]);
    const path: Point[] = [start];
    let lastAxis: "h" | "v" | null = null;

    while (path.length < target) {
      const cur = path[path.length - 1];
      const options: (Point & { w: number; axis: "h" | "v" })[] = [];
      const dirs: { dx: number; dy: number; axis: "h" | "v"; base: number }[] = [
        { dx: -1, dy: 0, axis: "h", base: 5 },
        { dx: 0, dy: -1, axis: "v", base: 5 },
        { dx: 1, dy: 0, axis: "h", base: 1 },
        { dx: 0, dy: 1, axis: "v", base: 1 },
      ];

      for (const dir of dirs) {
        const next = { x: cur.x + dir.dx, y: cur.y + dir.dy };
        if (next.x < 0 || next.y < 0 || next.x >= cols || next.y >= rows) continue;
        if (visited.has(key(next))) continue;
        const staircaseBoost = lastAxis && lastAxis !== dir.axis ? 3 : 0;
        options.push({ ...next, axis: dir.axis, w: dir.base + staircaseBoost });
      }

      if (options.length === 0) break;
      const chosen = pickWeighted(options);
      lastAxis = chosen.axis;
      const point = { x: chosen.x, y: chosen.y };
      visited.add(key(point));
      path.push(point);
    }

    if (path.length > best.length) best = path;
    if (best.length >= target) return best;
  }

  return best;
}

function makePattern(): Pattern {
  const n = SNAKE.textureDivisions;
  const dots: Dot[] = [];
  const count = 7 + Math.floor(Math.random() * 14);

  for (let i = 0; i < count; i++) {
    const roll = Math.random();
    let color: string = COLORS.pixelWhite;
    if (roll < 0.08) color = COLORS.green;
    else if (roll < 0.16) color = COLORS.magenta;
    else if (roll < 0.55) color = COLORS.pixelLavender;

    dots.push({
      gx: Math.floor(Math.random() * n),
      gy: Math.floor(Math.random() * n),
      color,
    });
  }

  const streaks: { gy: number; alpha: number }[] = [];
  if (Math.random() < 0.5) {
    streaks.push({
      gy: Math.floor(Math.random() * n),
      alpha: 0.28 + Math.random() * 0.45,
    });
  }

  return { dots, streaks };
}

function drawCell(
  ctx: CanvasRenderingContext2D,
  originX: number,
  originY: number,
  size: number,
  pattern: Pattern,
  reveal: number,
) {
  const pad = 1;
  const x = originX + pad;
  const y = originY + pad;
  const s = size - pad * 2;

  ctx.save();
  ctx.beginPath();
  // Horizontal slice reveal ("stutter") before the cell locks in.
  ctx.rect(x, y, s * Math.max(0.12, reveal), s);
  ctx.clip();

  ctx.fillStyle = COLORS.accent;
  ctx.fillRect(x, y, s, s);

  const n = SNAKE.textureDivisions;
  const unit = s / n;

  for (const streak of pattern.streaks) {
    ctx.fillStyle = `rgba(247, 244, 255, ${streak.alpha})`;
    ctx.fillRect(x, y + streak.gy * unit, s, Math.max(1, unit * 0.45));
  }

  for (const dot of pattern.dots) {
    ctx.fillStyle = dot.color;
    ctx.fillRect(
      x + dot.gx * unit,
      y + dot.gy * unit,
      Math.max(1, unit * 0.85),
      Math.max(1, unit * 0.85),
    );
  }

  ctx.restore();
}

export function usePixelSnake(options: {
  enabled: boolean;
  durationMs: number;
  onComplete: () => void;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const onCompleteRef = useRef(options.onComplete);
  const [grid, setGrid] = useState({
    cols: 0,
    rows: 0,
    cellSize: SNAKE.cellSize as number,
  });

  useEffect(() => {
    onCompleteRef.current = options.onComplete;
  }, [options.onComplete]);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let stopped = false;
    let completed = false;
    let cols = 0;
    let rows = 0;
    let cellSize: number = SNAKE.cellSize;
    let path: Point[] = [];
    let patterns: Pattern[] = [];
    let stutterStart = 0;
    let lastCount = 0;
    let lastFlicker = 0;
    const startedAt = performance.now();

    const layout = () => {
      const dpr = window.devicePixelRatio || 1;
      const width = wrap.clientWidth;
      const height = wrap.clientHeight;
      const nextSize =
        window.innerWidth < 768 ? SNAKE.cellSizeMobile : SNAKE.cellSize;
      const nextCols = Math.max(4, Math.floor(width / nextSize));
      const nextRows = Math.max(4, Math.floor(height / nextSize));

      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const gridChanged =
        nextCols !== cols || nextRows !== rows || nextSize !== cellSize;
      cols = nextCols;
      rows = nextRows;
      cellSize = nextSize;

      if (gridChanged) {
        const target = Math.min(
          SNAKE.maxLength,
          Math.max(SNAKE.minLength, cols * rows),
        );
        path = generatePath(cols, rows, target);
        patterns = path.map(() => makePattern());
        setGrid({ cols, rows, cellSize });
      }
    };

    const ro = new ResizeObserver(() => layout());
    ro.observe(wrap);
    layout();

    if (!options.enabled) {
      onCompleteRef.current();
      return () => {
        stopped = true;
        ro.disconnect();
      };
    }

    const tick = (now: number) => {
      if (stopped) return;

      const elapsed = now - startedAt;
      const t = Math.min(1, elapsed / options.durationMs);
      const targetCount = Math.min(
        path.length,
        Math.max(1, Math.ceil(t * path.length)),
      );

      if (targetCount > lastCount) {
        stutterStart = now;
        lastCount = targetCount;
      }

      if (now - lastFlicker >= TIMING.flickerIntervalMs && lastCount > 0) {
        lastFlicker = now;
        const flickers = Math.min(3, lastCount);
        for (let i = 0; i < flickers; i++) {
          const idx = Math.floor(Math.random() * lastCount);
          patterns[idx] = makePattern();
        }
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const stutterMs = TIMING.stutterFrames * 16;
      for (let i = 0; i < lastCount; i++) {
        const cell = path[i];
        if (!cell) continue;
        const isNewest = i === lastCount - 1;
        const reveal =
          isNewest && now - stutterStart < stutterMs
            ? Math.min(1, (now - stutterStart) / stutterMs)
            : 1;
        drawCell(
          ctx,
          cell.x * cellSize,
          cell.y * cellSize,
          cellSize,
          patterns[i],
          reveal,
        );
      }

      if (!completed && t >= 1 && lastCount >= path.length) {
        completed = true;
        onCompleteRef.current();
        return;
      }

      raf = window.requestAnimationFrame(tick);
    };

    raf = window.requestAnimationFrame(tick);

    return () => {
      stopped = true;
      window.cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [options.durationMs, options.enabled]);

  return { wrapRef, canvasRef, grid };
}
