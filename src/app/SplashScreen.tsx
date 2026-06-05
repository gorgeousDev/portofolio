"use client";

import { useEffect, useState } from "react";

export default function SplashScreen({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        const next = Math.min(p + Math.random() * 15, 100);
        return next;
      });
    }, 200);

    const timer = setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      setTimeout(() => setFadeOut(true), 400);
      setTimeout(() => onDone(), 1100);
    }, 2500);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [onDone]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-black transition-opacity duration-700 ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <p className="text-matrix text-3xl font-mono mb-8 tracking-widest uppercase">
        loading<span className="animate-pulse">...</span>
      </p>

      <div className="w-72 h-2 bg-matrix-dark/30 rounded overflow-hidden mb-4">
        <div
          className="h-full bg-matrix transition-all duration-300 ease-out rounded"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="text-matrix-dark text-sm font-mono">
        <span className="animate-pulse">_</span>
      </p>
    </div>
  );
}
