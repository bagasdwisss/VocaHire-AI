'use client';

import React from 'react';
import { Award, Zap, CheckCircle2, TrendingUp, Sparkles } from 'lucide-react';
import { getScoreBadge } from '@/lib/scoring';
import { RadarMetrics } from '@/types/interview';

interface ScoreHeroProps {
  overallScore: number;
  radarMetrics: RadarMetrics;
  avgWpm: number;
  totalFillerWords: number;
  targetPosition: string;
}

export const ScoreHero: React.FC<ScoreHeroProps> = ({
  overallScore,
  radarMetrics,
  avgWpm,
  totalFillerWords,
  targetPosition,
}) => {
  const badge = getScoreBadge(overallScore);

  return (
    <div className="glass-panel rounded-2xl p-6 border border-obsidian-700 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-electric-violet/10 via-electric-teal/5 to-transparent rounded-bl-full pointer-events-none"></div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        {/* Main Score Dial */}
        <div className="flex items-center gap-5">
          <div className="relative">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-obsidian-850 to-obsidian-800 border-2 border-electric-violet/40 flex flex-col items-center justify-center shadow-xl shadow-electric-violet/15">
              <span className="text-3xl font-mono font-black text-white">
                {overallScore.toFixed(1)}
              </span>
              <span className="text-[10px] font-mono text-obsidian-400">DARI 10.0</span>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold border ${badge.color}`}>
                {badge.label}
              </span>
              <span className="text-xs font-mono text-obsidian-400">Formula PRD 6.2</span>
            </div>
            <h2 className="text-lg sm:text-xl font-heading font-extrabold text-white">
              Evaluasi Wawancara: {targetPosition}
            </h2>
            <p className="text-xs sm:text-sm text-obsidian-300 max-w-xl mt-1 leading-relaxed">
              {badge.desc}
            </p>
          </div>
        </div>

        {/* Quick Highlights Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 rounded-xl bg-obsidian-850/90 border border-obsidian-700/80">
            <span className="text-[10px] text-obsidian-400 uppercase tracking-wider block">
              Struktur STAR
            </span>
            <span className="text-base font-mono font-bold text-electric-teal">
              {radarMetrics.star.toFixed(1)}/10
            </span>
          </div>

          <div className="p-3 rounded-xl bg-obsidian-850/90 border border-obsidian-700/80">
            <span className="text-[10px] text-obsidian-400 uppercase tracking-wider block">
              Relevansi CV
            </span>
            <span className="text-base font-mono font-bold text-emerald-400">
              {radarMetrics.relevance.toFixed(1)}/10
            </span>
          </div>

          <div className="p-3 rounded-xl bg-obsidian-850/90 border border-obsidian-700/80">
            <span className="text-[10px] text-obsidian-400 uppercase tracking-wider block">
              Kecepatan Vokal
            </span>
            <span className="text-base font-mono font-bold text-slate-100">
              {avgWpm} WPM
            </span>
          </div>

          <div className="p-3 rounded-xl bg-obsidian-850/90 border border-obsidian-700/80">
            <span className="text-[10px] text-obsidian-400 uppercase tracking-wider block">
              Kata Pengisi
            </span>
            <span className={`text-base font-mono font-bold ${totalFillerWords > 3 ? 'text-amber-400' : 'text-emerald-400'}`}>
              {totalFillerWords}x
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
