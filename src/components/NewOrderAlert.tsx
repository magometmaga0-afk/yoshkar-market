"use client";

import { useEffect, useRef } from "react";

function beep() {
  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new AudioCtx();
    [0, 0.22].forEach((delay) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = 880;
      gain.gain.value = 0.25;
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + delay);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + delay + 0.18);
      osc.stop(ctx.currentTime + delay + 0.2);
    });
  } catch {
    // автовоспроизведение может быть заблокировано браузером — мигание вкладки всё равно сработает
  }
}

export default function NewOrderAlert({ latestOrderId }: { latestOrderId: string | null }) {
  const seen = useRef<string | null | undefined>(undefined);
  const originalTitle = useRef("");
  const blinkTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    originalTitle.current = document.title;
  }, []);

  useEffect(() => {
    if (seen.current === undefined) {
      seen.current = latestOrderId;
      return;
    }
    if (!latestOrderId || latestOrderId === seen.current) return;
    seen.current = latestOrderId;
    beep();

    if (document.visibilityState !== "visible" && !blinkTimer.current) {
      let flipped = false;
      blinkTimer.current = setInterval(() => {
        document.title = flipped ? originalTitle.current : "🔔 Новый заказ!";
        flipped = !flipped;
      }, 1000);
    }
  }, [latestOrderId]);

  useEffect(() => {
    const stopBlink = () => {
      if (document.visibilityState === "visible" && blinkTimer.current) {
        clearInterval(blinkTimer.current);
        blinkTimer.current = null;
        document.title = originalTitle.current;
      }
    };
    document.addEventListener("visibilitychange", stopBlink);
    return () => document.removeEventListener("visibilitychange", stopBlink);
  }, []);

  return null;
}
