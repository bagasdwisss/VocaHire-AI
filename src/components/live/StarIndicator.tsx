'use client';

import React from 'react';
import { CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import { StarFlags } from '@/types/interview';
import { getStarGuidance } from '@/lib/starDetector';

interface StarIndicatorProps {
  flags: StarFlags;
  isSpeaking: boolean;
}

export const StarIndicator: React.FC<StarIndicatorProps> = ({ flags, isSpeaking }) => {
  const guidance = getStarGuidance(flags);

  const starItems = [
    {
      key: 'S',
      label: 'Situation',
      title: 'Latar Belakang',
      active: flags.situation,
      color: 'border-sky-500/40 bg-sky-500/10 text-sky-400',
    },
    {
      key: 'T',
      label: 'Task',
      title: 'Tantangan/Target',
      active: flags.task,
      color: 'border-indigo-500/40 bg-indigo-500/10 text-indigo-400',
    },
    {
      key: 'A',
      label: 'Action',
      title: 'Aksi Nyata Anda',
      active: flags.action,
      color: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400',
    },
    {
      key: 'R',
      label: 'Result',
      title: 'Dampak & Metrik',
      active: flags.result,
      color: 'border-amber-500/40 bg-amber-500/10 text-amber-400',
    },
  ];

  return (
    <div className="glass-panel p-4 rounded-2xl border border-obsidian-700">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-electric-teal" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-white">
            Indikator Struktur Jawaban (Live STAR HUD)
          </h3>
        </div>
        <span className="text-[10px] font-mono text-obsidian-400">MOD-03 Real-Time</span>
      </div>

      {/* 4 STAR Indicator Capsules */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
        {starItems.map((item) => (
          <div
            key={item.key}
            className={`p-2.5 rounded-xl border transition-all duration-300 flex flex-col justify-between ${
              item.active
                ? `${item.color} shadow-sm scale-[1.02]`
                : 'border-obsidian-700 bg-obsidian-850/60 text-obsidian-400 opacity-60'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-mono font-bold text-sm">[{item.key}]</span>
              {item.active ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-current" />
              ) : (
                <div className="w-2 h-2 rounded-full bg-obsidian-600"></div>
              )}
            </div>
            <div className="mt-1">
              <div className="text-xs font-semibold leading-tight">{item.label}</div>
              <div className="text-[10px] opacity-75">{item.title}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Dynamic Guidance / Warning */}
      <div
        className={`px-3 py-2 rounded-xl text-xs flex items-center gap-2 transition ${
          flags.result
            ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300'
            : isSpeaking && !flags.result
            ? 'bg-amber-500/15 border border-amber-500/30 text-amber-300 animate-pulse'
            : 'bg-obsidian-850 border border-obsidian-700 text-obsidian-300'
        }`}
      >
        {!flags.result && <AlertCircle className="w-4 h-4 shrink-0 text-amber-400" />}
        <span className="leading-snug">{guidance}</span>
      </div>
    </div>
  );
};
