"use client";

import { useEffect, useRef, useState } from "react";

const DURATION_MS = 4200;

export function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    function onTrigger() {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      setActive(true);
    }
    window.addEventListener("trigger-matrix-rain", onTrigger);
    return () => window.removeEventListener("trigger-matrix-rain", onTrigger);
  }, []);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = new Array(columns).fill(1);
    const chars = "01アイウエオカキクケコサシスセソタチツテト".split("");

    const start = Date.now();
    let frame = 0;

    function draw() {
      if (!ctx || !canvas) return;
      ctx.fillStyle = "rgba(8, 9, 11, 0.09)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#ffb454";
      ctx.font = `${fontSize}px monospace`;

      drops.forEach((y, i) => {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, y * fontSize);
        if (y * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i] += 1;
      });

      if (Date.now() - start < DURATION_MS) {
        frame = requestAnimationFrame(draw);
      } else {
        setActive(false);
      }
    }
    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, [active]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[90]"
      aria-hidden="true"
    />
  );
}
