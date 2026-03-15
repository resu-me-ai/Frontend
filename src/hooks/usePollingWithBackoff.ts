/**
 * usePollingWithBackoff Hook
 *
 * Polls a given async fetch function with exponential backoff:
 * - Initial interval: 1000ms
 * - After each poll: interval = Math.min(interval * 2, 10000)  (always doubles)
 * - Exception: if statusSelector detects a status change, reset to initialInterval
 * - Max interval capped at 10 000ms (10s)
 *
 * Story 9 (#458): Exponential backoff for frontend pipeline polling
 * TDD: RED → GREEN
 */

import { useState, useEffect, useRef, useCallback } from 'react';

export interface UsePollingWithBackoffOptions<T> {
  /**
   * Extract the "status" string from a poll result for change detection.
   * When the extracted value changes between successive polls, the interval
   * resets to initialInterval instead of doubling.
   */
  statusSelector?: (data: T) => string;
  /** Initial polling interval in ms. Default: 1000 */
  initialInterval?: number;
  /** Maximum polling interval in ms. Default: 10000 */
  maxInterval?: number;
  /** Whether polling is active. Default: true */
  enabled?: boolean;
}

export interface UsePollingWithBackoffReturn<T> {
  data: T | null;
  error: Error | null;
  /** Current backoff interval in ms (useful for debugging/testing) */
  currentInterval: number;
  /** Stop polling manually */
  stop: () => void;
  /** Restart polling (resets interval) */
  restart: () => void;
}

/**
 * Generic hook that polls fetchFn with exponential backoff.
 *
 * Exponential backoff is used instead of fixed polling to reduce server load
 * during long-running pipeline stages (e.g. LLM extraction, V0.1-V0.3) where
 * the status is unlikely to change within the first few seconds. The status-
 * change reset keeps the UI snappy for fast transitions (e.g. jd_submitted →
 * v01_processing) without reverting to constant high-frequency polling.
 *
 * @example
 * ```tsx
 * const { data } = usePollingWithBackoff(
 *   () => fetch('/api/status').then(r => r.json()),
 *   { statusSelector: (d) => d.stage }
 * );
 * ```
 */
export function usePollingWithBackoff<T>(
  fetchFn: () => Promise<T>,
  options: UsePollingWithBackoffOptions<T> = {},
): UsePollingWithBackoffReturn<T> {
  const {
    statusSelector,
    initialInterval = 1000,
    maxInterval = 10000,
    enabled = true,
  } = options;

  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [currentInterval, setCurrentInterval] = useState<number>(initialInterval);

  // Mutable refs — never trigger re-renders
  const intervalRef = useRef<number>(initialInterval);
  const prevStatusRef = useRef<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const enabledRef = useRef<boolean>(enabled);
  const fetchFnRef = useRef(fetchFn);
  const statusSelectorRef = useRef(statusSelector);

  // Keep refs current on every render
  fetchFnRef.current = fetchFn;
  statusSelectorRef.current = statusSelector;
  enabledRef.current = enabled;

  const stopTimer = useCallback(() => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // scheduleNextRef is a mutable ref holding the latest version of the schedule
  // function. This avoids stale-closure issues: each render overwrites .current,
  // so the setTimeout callback always calls the up-to-date implementation even
  // though it was captured at schedule time.
  const scheduleNextRef = useRef<() => void>(() => { /* placeholder, replaced below */ });

  scheduleNextRef.current = () => {
    if (!enabledRef.current) return;

    timerRef.current = setTimeout(async () => {
      if (!enabledRef.current) return;

      try {
        const result = await fetchFnRef.current();

        const selector = statusSelectorRef.current;
        const newStatus: string | null = selector ? selector(result) : null;

        if (
          newStatus !== null &&
          prevStatusRef.current !== null &&  // only "change" once we have a prior value
          newStatus !== prevStatusRef.current
        ) {
          // Status changed → reset to initialInterval so the next stage feels
          // responsive, then backoff will re-accumulate if the stage is long.
          intervalRef.current = initialInterval;
        } else {
          // First poll (no prior status yet) or same status → double the wait,
          // capped at maxInterval to bound worst-case lag to the user.
          intervalRef.current = Math.min(intervalRef.current * 2, maxInterval);
        }

        // Always record the latest status
        if (newStatus !== null) {
          prevStatusRef.current = newStatus;
        }

        setCurrentInterval(intervalRef.current);
        setData(result);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
      }

      // Schedule the next poll with the updated interval
      scheduleNextRef.current();
    }, intervalRef.current);
  };

  const stop = useCallback(() => {
    enabledRef.current = false;
    stopTimer();
  }, [stopTimer]);

  const restart = useCallback(() => {
    stopTimer();
    intervalRef.current = initialInterval;
    prevStatusRef.current = null;
    setCurrentInterval(initialInterval);
    enabledRef.current = true;
    scheduleNextRef.current();
  }, [initialInterval, stopTimer]);

  // Effect: start/stop based on `enabled`
  useEffect(() => {
    if (!enabled) {
      stopTimer();
      return;
    }

    // Reset on (re)enable
    intervalRef.current = initialInterval;
    prevStatusRef.current = null;
    setCurrentInterval(initialInterval);
    enabledRef.current = true;
    scheduleNextRef.current();

    return () => {
      stopTimer();
    };
  }, [enabled]); // eslint-disable-line react-hooks/exhaustive-deps

  return { data, error, currentInterval, stop, restart };
}
