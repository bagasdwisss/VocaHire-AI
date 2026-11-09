'use client';

import React from 'react';
import { Lightbulb, CheckSquare, Sparkles } from 'lucide-react';

interface CopilotDrawerProps {
  hints: string[];
  enabled: boolean;
}

export const CopilotDrawer: React.FC<CopilotDrawerProps> = ({ hints, enabled }) => {
  if (!enabled) return null;

  return (
    <div className="glass-panel p-4 rounded-2xl border border-electric-violet/30 bg-obsidian-850/80">
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md bg-amber-500/20 text-amber-400 flex items-center justify-center">
            <Lightbulb className="w-3.5 h-3.5" />
          </div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400">
            Copilot Teleprompter (Poin Kunci dari CV)
          </h3>
        </div>
        <span className="text-[10px] font-mono text-electric-violet bg-electric-violet/10 px-2 py-0.5 rounded-full">
          MOD-04
        </span>
      </div>

      <p className="text-[11px] text-obsidian-400 mb-2">
        Sebutkan kata kunci ini dengan bahasa mengalir (bukan membaca teks kaku):
      </p>

      <ul className="space-y-1.5">
        {hints.map((hint, idx) => (
          <li
            key={idx}
            className="flex items-start gap-2 text-xs text-slate-200 bg-obsidian-900/80 p-2 rounded-xl border border-obsidian-700/80 hover:border-amber-500/30 transition"
          >
            <CheckSquare className="w-3.5 h-3.5 text-electric-teal shrink-0 mt-0.5" />
            <span className="leading-snug">{hint}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
