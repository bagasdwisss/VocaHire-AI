'use client';

import React, { useEffect, useRef } from 'react';

interface AudioOrbProps {
  isAiSpeaking: boolean;
  isUserSpeaking: boolean;
  audioLevel?: number; // 0 to 1
}

export const AudioOrb: React.FC<AudioOrbProps> = ({
  isAiSpeaking,
  isUserSpeaking,
  audioLevel = 0.5,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let step = 0;

    const resize = () => {
      canvas.width = canvas.parentElement?.clientWidth || 320;
      canvas.height = 240;
    };
    resize();

    const render = () => {
      step += 0.04;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Base radius and pulse intensity based on state
      let baseRadius = 55;
      let waveColor = 'rgba(99, 102, 241, '; // Electric Violet default
      let innerGlow = '#6366F1';

      if (isAiSpeaking) {
        baseRadius = 65 + Math.sin(step * 3) * 8;
        waveColor = 'rgba(20, 184, 166, '; // Electric Teal
        innerGlow = '#14B8A6';
      } else if (isUserSpeaking) {
        baseRadius = 60 + Math.sin(step * 5) * 12;
        waveColor = 'rgba(245, 158, 11, '; // Amber
        innerGlow = '#F59E0B';
      }

      // 1. Draw outer ripples
      for (let i = 3; i >= 1; i--) {
        const radius = baseRadius + i * 16 + Math.sin(step + i) * 6;
        const alpha = Math.max(0.05, 0.25 / i);
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.strokeStyle = `${waveColor}${alpha})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      // 2. Draw core gradient orb
      const grad = ctx.createRadialGradient(
        centerX,
        centerY,
        5,
        centerX,
        centerY,
        baseRadius
      );
      grad.addColorStop(0, '#FFFFFF');
      grad.addColorStop(0.3, innerGlow);
      grad.addColorStop(0.8, isAiSpeaking ? '#0D9488' : '#4338CA');
      grad.addColorStop(1, 'transparent');

      ctx.beginPath();
      ctx.arc(centerX, centerY, baseRadius, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      // 3. Draw dynamic oscillating particles around the perimeter
      const particleCount = 28;
      for (let i = 0; i < particleCount; i++) {
        const angle = (i / particleCount) * Math.PI * 2 + step * 0.5;
        const amp = (isAiSpeaking || isUserSpeaking) ? 14 : 4;
        const dist = baseRadius + Math.sin(step * 3 + i * 2) * amp;
        const px = centerX + Math.cos(angle) * dist;
        const py = centerY + Math.sin(angle) * dist;

        ctx.beginPath();
        ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = isAiSpeaking ? '#5EEAD4' : isUserSpeaking ? '#FDE68A' : '#C7D2FE';
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isAiSpeaking, isUserSpeaking, audioLevel]);

  return (
    <div className="relative w-full flex flex-col items-center justify-center py-2">
      <canvas ref={canvasRef} className="w-full h-48 block" />

      {/* Status Orb Pill */}
      <div className="absolute bottom-2 flex items-center gap-2 px-3 py-1 rounded-full bg-obsidian-950/80 border border-obsidian-700 backdrop-blur-sm text-xs font-mono">
        <span
          className={`w-2 h-2 rounded-full ${
            isAiSpeaking
              ? 'bg-electric-teal animate-ping'
              : isUserSpeaking
              ? 'bg-amber-400 animate-pulse'
              : 'bg-electric-violet'
          }`}
        ></span>
        <span className="text-obsidian-300">
          {isAiSpeaking
            ? 'Pewawancara AI Sedang Berbicara...'
            : isUserSpeaking
            ? 'Merekam Suara Anda...'
            : 'Menunggu Giliran Bicara'}
        </span>
      </div>
    </div>
  );
};
