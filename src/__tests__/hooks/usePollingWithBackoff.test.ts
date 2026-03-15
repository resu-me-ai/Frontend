/**
 * TDD Tests for usePollingWithBackoff Hook
 *
 * Story 9 (#458): Exponential backoff for frontend pipeline polling
 *
 * Backoff spec:
 * - Initial interval: 1000ms
 * - On no status change: interval = Math.min(interval * 2, 10000)
 * - On status change: reset to 1000ms
 * - Max: 10 000ms
 *
 * RED → GREEN → REFACTOR
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { usePollingWithBackoff } from '@/hooks/usePollingWithBackoff';

describe('usePollingWithBackoff', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  // ---------------------------------------------------------------------------
  // test_backoff_doubles_each_interval
  // After 3 polls with no status change: intervals should be 1000, 2000, 4000
  // ---------------------------------------------------------------------------
  it('test_backoff_doubles_each_interval — doubles interval on each poll with no status change', async () => {
    // fetchFn always returns the same status (no change)
    const fetchFn = vi.fn().mockResolvedValue({ stage: 'processing', message: 'working' });

    const { result } = renderHook(() =>
      usePollingWithBackoff(fetchFn, {
        statusSelector: (d: { stage: string }) => d.stage,
        initialInterval: 1000,
        maxInterval: 10000,
      }),
    );

    // Initially currentInterval is 1000 before any poll
    expect(result.current.currentInterval).toBe(1000);

    // First poll fires after 1000ms
    await act(async () => {
      await vi.advanceTimersByTimeAsync(1000);
    });
    expect(fetchFn).toHaveBeenCalledTimes(1);
    // After first poll with same status → interval becomes 2000
    expect(result.current.currentInterval).toBe(2000);

    // Second poll fires after additional 2000ms
    await act(async () => {
      await vi.advanceTimersByTimeAsync(2000);
    });
    expect(fetchFn).toHaveBeenCalledTimes(2);
    // After second poll → interval becomes 4000
    expect(result.current.currentInterval).toBe(4000);

    // Third poll fires after additional 4000ms
    await act(async () => {
      await vi.advanceTimersByTimeAsync(4000);
    });
    expect(fetchFn).toHaveBeenCalledTimes(3);
    // After third poll → interval becomes 8000
    expect(result.current.currentInterval).toBe(8000);
  });

  // ---------------------------------------------------------------------------
  // test_backoff_caps_at_max_interval
  // After enough polls, interval should cap at 10 000ms and not exceed it
  // ---------------------------------------------------------------------------
  it('test_backoff_caps_at_max_interval — interval is capped at 10 000ms', async () => {
    const fetchFn = vi.fn().mockResolvedValue({ stage: 'processing' });

    const { result } = renderHook(() =>
      usePollingWithBackoff(fetchFn, {
        statusSelector: (d: { stage: string }) => d.stage,
        initialInterval: 1000,
        maxInterval: 10000,
      }),
    );

    // Advance through multiple polls: 1s + 2s + 4s + 8s + 10s (capped) = total 25s+
    // At each step we advance by the current expected interval
    const expectedIntervals = [1000, 2000, 4000, 8000, 10000, 10000];
    for (const ms of expectedIntervals) {
      await act(async () => {
        await vi.advanceTimersByTimeAsync(ms);
      });
    }

    // After 5th poll (interval would be 16s without cap), should be 10 000
    expect(result.current.currentInterval).toBe(10000);

    // Should NOT be 16000
    expect(result.current.currentInterval).not.toBe(16000);
  });

  // ---------------------------------------------------------------------------
  // test_backoff_resets_on_status_change
  // When the status field changes, the interval resets back to 1000ms
  // ---------------------------------------------------------------------------
  it('test_backoff_resets_on_status_change — resets to initialInterval when status changes', async () => {
    // First two calls return same status, third call returns different status
    const fetchFn = vi
      .fn()
      .mockResolvedValueOnce({ stage: 'processing' })
      .mockResolvedValueOnce({ stage: 'processing' })
      .mockResolvedValueOnce({ stage: 'v02_complete' }); // <-- status change here

    const { result } = renderHook(() =>
      usePollingWithBackoff(fetchFn, {
        statusSelector: (d: { stage: string }) => d.stage,
        initialInterval: 1000,
        maxInterval: 10000,
      }),
    );

    // Poll 1 at 1000ms — same status, interval → 2000
    await act(async () => {
      await vi.advanceTimersByTimeAsync(1000);
    });
    expect(result.current.currentInterval).toBe(2000);

    // Poll 2 at 2000ms — same status again, interval → 4000
    await act(async () => {
      await vi.advanceTimersByTimeAsync(2000);
    });
    expect(result.current.currentInterval).toBe(4000);

    // Poll 3 at 4000ms — status CHANGES to 'v02_complete' → reset to 1000
    await act(async () => {
      await vi.advanceTimersByTimeAsync(4000);
    });
    expect(result.current.currentInterval).toBe(1000);
    expect(result.current.data).toEqual({ stage: 'v02_complete' });
  });

  // ---------------------------------------------------------------------------
  // Additional: starts polling when enabled
  // ---------------------------------------------------------------------------
  it('starts polling immediately when enabled=true', async () => {
    const fetchFn = vi.fn().mockResolvedValue({ stage: 'idle' });

    renderHook(() =>
      usePollingWithBackoff(fetchFn, {
        statusSelector: (d: { stage: string }) => d.stage,
      }),
    );

    // Should not have fired yet (before 1000ms)
    expect(fetchFn).toHaveBeenCalledTimes(0);

    await act(async () => {
      await vi.advanceTimersByTimeAsync(1000);
    });

    expect(fetchFn).toHaveBeenCalledTimes(1);
  });

  // ---------------------------------------------------------------------------
  // Additional: does not poll when enabled=false
  // ---------------------------------------------------------------------------
  it('does not poll when enabled=false', async () => {
    const fetchFn = vi.fn().mockResolvedValue({ stage: 'idle' });

    renderHook(() =>
      usePollingWithBackoff(fetchFn, {
        statusSelector: (d: { stage: string }) => d.stage,
        enabled: false,
      }),
    );

    await act(async () => {
      await vi.advanceTimersByTimeAsync(5000);
    });

    expect(fetchFn).not.toHaveBeenCalled();
  });

  // ---------------------------------------------------------------------------
  // Additional: stop() halts polling
  // ---------------------------------------------------------------------------
  it('stop() halts polling', async () => {
    const fetchFn = vi.fn().mockResolvedValue({ stage: 'processing' });

    const { result } = renderHook(() =>
      usePollingWithBackoff(fetchFn, {
        statusSelector: (d: { stage: string }) => d.stage,
      }),
    );

    // First poll fires
    await act(async () => {
      await vi.advanceTimersByTimeAsync(1000);
    });
    expect(fetchFn).toHaveBeenCalledTimes(1);

    // Stop polling
    act(() => {
      result.current.stop();
    });

    // Advance time — no more polls
    await act(async () => {
      await vi.advanceTimersByTimeAsync(10000);
    });
    expect(fetchFn).toHaveBeenCalledTimes(1);
  });

  // ---------------------------------------------------------------------------
  // Additional: cleanup on unmount stops polling
  // ---------------------------------------------------------------------------
  it('stops polling on unmount', async () => {
    const fetchFn = vi.fn().mockResolvedValue({ stage: 'processing' });

    const { unmount } = renderHook(() =>
      usePollingWithBackoff(fetchFn, {
        statusSelector: (d: { stage: string }) => d.stage,
      }),
    );

    await act(async () => {
      await vi.advanceTimersByTimeAsync(1000);
    });
    const callCount = fetchFn.mock.calls.length;

    unmount();

    await act(async () => {
      await vi.advanceTimersByTimeAsync(5000);
    });

    // No additional calls after unmount
    expect(fetchFn.mock.calls.length).toBe(callCount);
  });

  // ---------------------------------------------------------------------------
  // Additional: sets error on fetch rejection
  // ---------------------------------------------------------------------------
  it('sets error when fetchFn throws', async () => {
    const fetchFn = vi.fn().mockRejectedValue(new Error('Network failure'));

    const { result } = renderHook(() =>
      usePollingWithBackoff(fetchFn, {
        statusSelector: (d: { stage: string }) => d.stage,
      }),
    );

    await act(async () => {
      await vi.advanceTimersByTimeAsync(1000);
    });

    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.error?.message).toBe('Network failure');
  });

  // ---------------------------------------------------------------------------
  // Additional: works without a statusSelector (no status change detection)
  // ---------------------------------------------------------------------------
  it('works without statusSelector — just doubles interval each poll', async () => {
    const fetchFn = vi.fn().mockResolvedValue({ anything: true });

    const { result } = renderHook(() =>
      usePollingWithBackoff(fetchFn, { initialInterval: 1000, maxInterval: 10000 }),
    );

    await act(async () => {
      await vi.advanceTimersByTimeAsync(1000);
    });
    expect(fetchFn).toHaveBeenCalledTimes(1);
    // Without statusSelector, status comparison is null === null (no change) → doubles
    expect(result.current.currentInterval).toBe(2000);
  });
});
