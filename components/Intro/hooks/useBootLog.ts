"use client";

import { useEffect, useState } from "react";
import {
  BOOT_ENTRIES,
  TIMING,
  formatLocalTime,
} from "../constants";

export function useBootLog(active: boolean, reducedMotion: boolean) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [timestamps, setTimestamps] = useState<string[]>([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!active) return;

    const interval = reducedMotion
      ? TIMING.reducedLineIntervalMs
      : TIMING.lineIntervalMs;

    let index = 0;
    let intervalId = 0;

    const startId = window.setTimeout(() => {
      setVisibleCount(1);
      setTimestamps([formatLocalTime(new Date())]);

      if (BOOT_ENTRIES.length <= 1) {
        setDone(true);
        return;
      }

      intervalId = window.setInterval(() => {
        index += 1;
        setTimestamps((prev) => [...prev, formatLocalTime(new Date())]);
        setVisibleCount((prev) => prev + 1);

        if (index >= BOOT_ENTRIES.length - 1) {
          window.clearInterval(intervalId);
          setDone(true);
        }
      }, interval);
    }, 0);

    return () => {
      window.clearTimeout(startId);
      window.clearInterval(intervalId);
    };
  }, [active, reducedMotion]);

  return { visibleCount, timestamps, done, entries: BOOT_ENTRIES };
}
