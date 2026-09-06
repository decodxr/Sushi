'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

const STORAGE_KEY = 'sushi-admin-new-order-sound';

export function useOrderNotificationSound() {
  const [enabled, setEnabled] = useState(false);
  const contextRef = useRef<AudioContext | null>(null);

  const ensureContext = useCallback(async () => {
    const context = contextRef.current ?? new window.AudioContext();
    contextRef.current = context;
    if (context.state === 'suspended') await context.resume();
    return context;
  }, []);

  useEffect(() => {
    setEnabled(localStorage.getItem(STORAGE_KEY) === 'on');
    return () => {
      void contextRef.current?.close();
      contextRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!enabled || contextRef.current?.state === 'running') return;
    const unlock = () => void ensureContext();
    window.addEventListener('pointerdown', unlock, { once: true });
    window.addEventListener('keydown', unlock, { once: true });
    return () => {
      window.removeEventListener('pointerdown', unlock);
      window.removeEventListener('keydown', unlock);
    };
  }, [enabled, ensureContext]);

  const play = useCallback(async () => {
    if (!enabled) return;
    const context = await ensureContext();
    const start = context.currentTime + 0.015;
    const tone = (frequency: number, at: number, duration: number) => {
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(frequency, at);
      gain.gain.setValueAtTime(0.0001, at);
      gain.gain.exponentialRampToValueAtTime(0.12, at + 0.018);
      gain.gain.exponentialRampToValueAtTime(0.0001, at + duration);
      oscillator.connect(gain);
      gain.connect(context.destination);
      oscillator.start(at);
      oscillator.stop(at + duration + 0.02);
    };
    tone(659.25, start, 0.16);
    tone(880, start + 0.17, 0.24);
  }, [enabled, ensureContext]);

  const toggle = useCallback(async () => {
    const next = !enabled;
    setEnabled(next);
    localStorage.setItem(STORAGE_KEY, next ? 'on' : 'off');
    if (next) await ensureContext();
  }, [enabled, ensureContext]);

  return { enabled, play, toggle };
}
