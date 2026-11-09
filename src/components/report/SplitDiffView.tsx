'use client';

import React from 'react';
import { SessionTurn } from '@/types/interview';
import { CheckCircle2, AlertTriangle, ArrowRight, Sparkles, HelpCircle } from 'lucide-react';

interface SplitDiffViewProps {
  turn: SessionTurn;
}

export const SplitDiffView: React.FC<SplitDiffViewProps> = ({ turn }) => {
  return (
    <div className="glass-panel rounded-2xl p-6 border border-obsidian-700 space-y-4">
      {/* Turn Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-obsidian-700/80 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-electric-teal uppercase">
              Bedah Jawaban Giliran #{turn.turnNumber}
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-obsidian-800 text-obsidian-300 font-mono">
              {turn.speakerPersona}
            </span>
          </div>
          <h4 className="text-sm font-semibold text-white mt-1">
            "{turn.questionText}"
          </h4>
        </div>

        {/* Score Shift Badge */}
        <div className="flex items-center gap-2 bg-obsidian-850 px-3 py-1.5 rounded-xl border border-obsidian-700 shrink-0">
          <div className="text-right">
            <span className="text-[10px] text-obsidian-400 block">Skor Awal</span>
            <span className="text-xs font-mono font-bold text-amber-400">
              {turn.originalScore.toFixed(1)}/10
            </span>
          </div>
          <ArrowRight className="w-3.5 h-3.5 text-obsidian-500" />
          <div>
            <span className="text-[10px] text-obsidian-400 block">Potensi STAR</span>
            <span className="text-xs font-mono font-bold text-emerald-400">
              {turn.rewrittenScore.toFixed(1)}/10
            </span>
          </div>
        </div>
      </div>

      {/* Side-by-Side Split Diff View */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Kiri: Transkrip Asli Kandidat */}
        <div className="p-4 rounded-xl bg-obsidian-850/80 border border-obsidian-700/90 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-obsidian-300 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400" /> Transkrip Asli Anda
              </span>
              <span className="text-[11px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">
                Skor: {turn.originalScore.toFixed(1)}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed whitespace-pre-wrap">
              {turn.candidateRawAnswer}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-obsidian-700/60 text-[11px] text-obsidian-400">
            <span className="text-amber-400 font-medium">Catatan:</span> Banyak menggunakan kata normatif dan belum menyebutkan persentase angka peningkatan secara spesifik.
          </div>
        </div>

        {/* Kanan: Rekomendasi Jawaban Lolos HR (STAR Rewritten) */}
        <div className="p-4 rounded-xl bg-obsidian-850/90 border border-emerald-500/30 flex flex-col justify-between shadow-lg shadow-emerald-500/5">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" /> Versi Rekomendasi STAR (Lolos HR)
              </span>
              <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-bold">
                Skor: {turn.rewrittenScore.toFixed(1)} (Top Tier)
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-100 font-sans leading-relaxed whitespace-pre-wrap">
              {turn.rewrittenStarAnswer}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-obsidian-700/60 text-[11px] text-emerald-300">
            <span className="font-semibold">Highlight:</span> Dilengkapi Situation, Task, Action aktif, dan metrik kuantitatif terukur.
          </div>
        </div>
      </div>

      {/* HR Rationale Box */}
      <div className="p-4 rounded-xl bg-electric-violet/10 border border-electric-violet/30 flex items-start gap-3">
        <div className="p-1 rounded-md bg-electric-violet/20 text-electric-violet shrink-0 mt-0.5">
          <HelpCircle className="w-4 h-4" />
        </div>
        <div>
          <h5 className="text-xs font-bold uppercase tracking-wider text-electric-violet mb-1">
            🎯 Kenapa Versi Kanan Lebih Lolos HR?
          </h5>
          <p className="text-xs text-obsidian-200 leading-relaxed">
            {turn.hrRationale}
          </p>
        </div>
      </div>
    </div>
  );
};
