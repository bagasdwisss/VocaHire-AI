'use client';

import React from 'react';
import { RadarMetrics } from '@/types/interview';

interface RadarChartProps {
  metrics: RadarMetrics;
}

export const RadarChart: React.FC<RadarChartProps> = ({ metrics }) => {
  const size = 300;
  const center = size / 2;
  const radius = 100;

  const axes = [
    { label: 'Struktur STAR', key: 'star', val: metrics.star },
    { label: 'Ketajaman Metrik', key: 'impact', val: metrics.impact },
    { label: 'Relevansi JD', key: 'relevance', val: metrics.relevance },
    { label: 'Kelancaran Vokal', key: 'delivery', val: metrics.delivery },
    { label: 'Efisiensi Durasi', key: 'conciseness', val: metrics.conciseness },
  ];

  const totalAxes = axes.length;

  // Helper to compute polygon points for radius
  const getCoordinates = (value: number, index: number) => {
    const angle = (Math.PI * 2 / totalAxes) * index - Math.PI / 2;
    const r = (value / 10) * radius;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y };
  };

  // Polygon points for metrics
  const polygonPoints = axes
    .map((axis, i) => {
      const { x, y } = getCoordinates(axis.val, i);
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <div className="glass-panel rounded-2xl p-5 border border-obsidian-700 flex flex-col items-center">
      <div className="w-full flex items-center justify-between mb-2">
        <h3 className="text-xs font-bold uppercase tracking-wider text-white">
          Radar Analitik 5 Dimensi Kompetensi
        </h3>
        <span className="text-[10px] font-mono text-electric-teal bg-electric-teal/10 px-2 py-0.5 rounded-full border border-electric-teal/20">
          5-Axis Assessment
        </span>
      </div>

      <div className="relative w-[300px] h-[300px]">
        <svg width={size} height={size} className="overflow-visible">
          {/* Background Concentric Webs (2, 4, 6, 8, 10) */}
          {[2, 4, 6, 8, 10].map((level) => {
            const webPoints = axes
              .map((_, i) => {
                const { x, y } = getCoordinates(level, i);
                return `${x},${y}`;
              })
              .join(' ');

            return (
              <polygon
                key={level}
                points={webPoints}
                fill="none"
                stroke="rgba(31, 41, 55, 0.8)"
                strokeWidth="1"
              />
            );
          })}

          {/* Spokes / Axis lines */}
          {axes.map((_, i) => {
            const { x, y } = getCoordinates(10, i);
            return (
              <line
                key={i}
                x1={center}
                y1={center}
                x2={x}
                y2={y}
                stroke="rgba(31, 41, 55, 0.9)"
                strokeWidth="1"
              />
            );
          })}

          {/* Filled Candidate Polygon */}
          <polygon
            points={polygonPoints}
            fill="rgba(99, 102, 241, 0.25)"
            stroke="#6366F1"
            strokeWidth="2.5"
          />

          {/* Data Points */}
          {axes.map((axis, i) => {
            const { x, y } = getCoordinates(axis.val, i);
            return (
              <g key={i}>
                <circle cx={x} cy={y} r="4" fill="#14B8A6" stroke="#0B0F19" strokeWidth="2" />
              </g>
            );
          })}

          {/* Labels */}
          {axes.map((axis, i) => {
            const { x, y } = getCoordinates(12.2, i);
            return (
              <text
                key={i}
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="central"
                className="text-[10px] fill-obsidian-300 font-sans font-medium"
              >
                {axis.label} ({axis.val.toFixed(1)})
              </text>
            );
          })}
        </svg>
      </div>

      <p className="text-[11px] text-obsidian-400 text-center mt-2">
        Titik hijau menunjukkan capaian Anda pada skala 1.0 - 10.0
      </p>
    </div>
  );
};
