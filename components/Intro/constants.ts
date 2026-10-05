/**
 * All intro tunables live here so timing, copy, and colors
 * can be adjusted without hunting through components.
 */

export const GITHUB_URL = "https://github.com/AadarshaPokharel";

/** sessionStorage flag — intro plays once per tab session */
export const INTRO_SESSION_KEY = "portfolio-intro-played";

export const COLORS = {
  bg: "#111111",
  heroBg: "#0a0f0f",
  accent: "#7a00ff",
  green: "#2dff9a",
  magenta: "#ff4fd8",
  pixelLavender: "#e8d7ff",
  pixelWhite: "#f7f4ff",
  textDim: "#5c5c5c",
  textMid: "#9a9a9a",
  textBright: "#f3f3f3",
  gridLine: "#2a2a2a",
  cta: "#5b7cfa",
} as const;

export const TIMING = {
  /** Delay between boot-log lines (ms) */
  lineIntervalMs: 340,
  /** Faster log when the visitor prefers reduced motion */
  reducedLineIntervalMs: 180,
  /** Snake growth + overall loading window (ms) */
  totalDurationMs: 9200,
  /** Skip the snake; keep a short log */
  reducedMotionDurationMs: 2400,
  /** Pause after log + snake both finish */
  holdMs: 400,
  /** Overlay fade-out */
  fadeMs: 300,
  /** How often filled cells re-roll their glitch texture */
  flickerIntervalMs: 150,
  /** Horizontal-slice frames before a new cell locks in */
  stutterFrames: 5,
} as const;

export const SNAKE = {
  cellSize: 66,
  cellSizeMobile: 40,
  maxLength: 24,
  minLength: 20,
  /** Sub-pixels inside each filled cell (texture matrix) */
  textureDivisions: 8,
} as const;

export const COPY = {
  wordmark: "Aadarsha Pokharel",
  githubLink: "SEE MY GITHUB →",
  loadingLabel: "PORTFOLIO LOADING",
  skipHint: "SKIP — CLICK OR PRESS ANY KEY",
  lastLine:
    "STILL LEARNING, ALWAYS BUILDING. YOUR NEXT REACT NATIVE INTERN IS ALMOST LIVE ...",
} as const;

export const WELCOME_BOX = [
  "┌─────────────────────────────┐",
  "│  WELCOME TO MY PORTFOLIO    │",
  "└─────────────────────────────┘",
] as const;

export type BootEntry =
  | { kind: "text"; text: string; highlight?: boolean }
  | { kind: "box"; lines: readonly string[] };

export const BOOT_ENTRIES: readonly BootEntry[] = [
  { kind: "text", text: "INCOMING VISITOR DETECTED ..." },
  { kind: "text", text: "PORTFOLIO WAKING UP ..." },
  { kind: "box", lines: WELCOME_BOX },
  { kind: "text", text: "ALLOCATING CREATIVE RESOURCES ..." },
  { kind: "text", text: "LOADING PROJECTS ..." },
  { kind: "text", text: "COMPILING SKILLS ..." },
  { kind: "text", text: "INJECTING COFFEE ..." },
  { kind: "text", text: "FINALIZING ..." },
  { kind: "text", text: COPY.lastLine, highlight: true },
];

/** Visitor-local HH:MM:SS — call only after mount. */
export function formatLocalTime(date: Date): string {
  const hh = String(date.getHours()).padStart(2, "0");
  const mm = String(date.getMinutes()).padStart(2, "0");
  const ss = String(date.getSeconds()).padStart(2, "0");
  return `${hh}:${mm}:${ss}`;
}
