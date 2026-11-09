'use client';

import React, { useEffect, useRef } from 'react';

interface AudioOrbProps {
  isAiSpeaking: boolean;
  isUserSpeaking: boolean;
  liveVolume?: number; // 0.0 to 1.0 from real microphone
  frequencyData?: Uint8Array;
}

export const AudioOrb: React.FC<AudioOrbProps> = ({
  isAiSpeaking,
  isUserSpeaking,
  liveVolume = 0,
  frequencyData,
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
      if (canvas.parentElement) {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = 260;
      }
    };
    resize();
    window.addEventListener('resize', resize);

    const render = () => {
      step += 0.04;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2 - 15;

      // React to real microphone volume
      const activeVol = isUserSpeaking ? Math.max(liveVolume, 0.15) : isAiSpeaking ? 0.35 : 0.05;

      // Base radius calculation
      const baseRadius = 52 + activeVol * 28 + Math.sin(step * 2) * 4;

      // Color scheme
      let primaryColor = '#6366F1'; // Electric Violet default
      let glowRgba = 'rgba(99, 102, 241, ';
      let coreColor = '#A5B4FC';

      if (isAiSpeaking) {
        primaryColor = '#14B8A6'; // Electric Teal
        glowRgba = 'rgba(20, 184, 166, ';
        coreColor = '#5EEAD4';
      } else if (isUserSpeaking) {
        primaryColor = '#F59E0B'; // Amber Gold
        glowRgba = 'rgba(245, 158, 11, ';
        coreColor = '#FDE68A';
      }

      // 1. Ambient Background Bloom
      const ambientGrad = ctx.createRadialGradient(
        centerX,
        centerY,
        10,
        centerX,
        centerY,
        baseRadius * 2.2
      );
      ambientGrad.addColorStop(0, `${glowRgba}${0.35 * (activeVol + 0.3)})`);
      ambientGrad.addColorStop(0.5, `${glowRgba}0.1)`);
      ambientGrad.addColorStop(1, 'transparent');

      ctx.beginPath();
      ctx.arc(centerX, centerY, baseRadius * 2.2, 0, Math.PI * 2);
      ctx.fillStyle = ambientGrad;
      ctx.fill();

      // 2. Multi-layered Concentric Ripple Waves
      for (let w = 3; w >= 1; w--) {
        const waveRadius = baseRadius + w * 20 + Math.sin(step * 3 + w) * (8 * (activeVol + 0.5));
        const alpha = Math.max(0.04, 0.22 / w);
        ctx.beginPath();
        ctx.arc(centerX, centerY, waveRadius, 0, Math.PI * 2);
        ctx.strokeStyle = `${glowRgba}${alpha})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      // 3. Central Plasma Sphere with Chromatic Depth
      const sphereGrad = ctx.createRadialGradient(
        centerX - baseRadius * 0.25,
        centerY - baseRadius * 0.25,
        4,
        centerX,
        centerY,
        baseRadius
      );
      sphereGrad.addColorStop(0, '#FFFFFF');
      sphereGrad.addColorStop(0.35, coreColor);
      sphereGrad.addColorStop(0.7, primaryColor);
      sphereGrad.addColorStop(0.95, isAiSpeaking ? '#0F766E' : '#312E81');
      sphereGrad.addColorStop(1, 'rgba(11, 15, 25, 0.8)');

      ctx.beginPath();
      ctx.arc(centerX, centerY, baseRadius, 0, Math.PI * 2);
      ctx.fillStyle = sphereGrad;
      ctx.shadowColor = primaryColor;
      ctx.shadowBlur = 24 * (activeVol + 0.5);
      ctx.fill();
      ctx.shadowBlur = 0; // reset shadow

      // 4. Rotating 3D Orbital Particle Rings
      const particleRings = [
        { count: 18, radiusMul: 1.25, speed: 1.0, tilt: 0.35 },
        { count: 14, radiusMul: 1.45, speed: -0.7, tilt: -0.4 },
      ];

      particleRings.forEach((ring) => {
        for (let i = 0; i < ring.count; i++) {
          const angle = (i / ring.count) * Math.PI * 2 + step * ring.speed;
          const r = baseRadius * ring.radiusMul + Math.sin(step * 4 + i) * 6;
          const x = centerX + Math.cos(angle) * r;
          const y = centerY + Math.sin(angle) * r * ring.tilt;

          const size = 1.8 + Math.sin(angle) * 1.2;
          ctx.beginPath();
          ctx.arc(x, y, Math.max(1, size), 0, Math.PI * 2);
          ctx.fillStyle = coreColor;
          ctx.fill();
        }
      });

      // 5. Soundwave EQ Equalizer Bars at bottom
      const barCount = 32;
      const barWidth = 4;
      const barSpacing = 4;
      const totalWidth = barCount * (barWidth + barSpacing);
      const startX = centerX - totalWidth / 2;
      const baseY = canvas.height - 25;

      for (let b = 0; b < barCount; b++) {
        let barHeight = 4;
        if (frequencyData && frequencyData.length > b) {
          barHeight = Math.max(4, (frequencyData[b] / 255) * 35);
        } else if (isAiSpeaking || isUserSpeaking) {
          barHeight = Math.max(
            4,
            Math.sin(step * 6 + b * 0.4) * (18 * (activeVol + 0.4)) + 12
          );
        }

        const bx = startX + b * (barWidth + barSpacing);
        const by = baseY - barHeight / 2;

        const barGrad = ctx.createLinearGradient(bx, by, bx, by + barHeight);
        barGrad.addColorStop(0, coreColor);
        barGrad.addColorStop(1, primaryColor);

        ctx.fillStyle = barGrad;
        ctx.beginPath();
        ctx.roundRect(bx, by, barWidth, barHeight, 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
    };
  }, [isAiSpeaking, isUserSpeaking, liveVolume, frequencyData]);

  return (
    <div className="relative w-full flex flex-col items-center justify-center">
      <canvas ref={canvasRef} className="w-full h-[260px] block" />

      {/* Futuristic Floating State Pill */}
      <div className="absolute bottom-2 flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-obsidian-950/85 border border-obsidian-700/80 backdrop-blur-md shadow-lg shadow-black/40 text-xs font-mono">
        <span
          className={`w-2.5 h-2.5 rounded-full ${
            isAiSpeaking
              ? 'bg-electric-teal shadow-[0_0_12px_#14B8A6] animate-pulse'
              : isUserSpeaking
              ? 'bg-amber-400 shadow-[0_0_12px_#F59E0B] animate-ping'
              : 'bg-electric-violet/60'
          }`}
        ></span>
        <span className="text-slate-200 font-medium">
          {isAiSpeaking
            ? 'Pewawancara AI Sedang Berbicara...'
            : isUserSpeaking
            ? `Mikrofon Aktif (Level: ${Math.round(liveVolume * 100)}%)`
            : 'Menunggu Giliran Bicara Kandidat'}
        </span>
      </div>
    </div>
  );
};
