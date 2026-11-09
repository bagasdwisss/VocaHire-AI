'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Sparkles,
  ShieldAlert,
  TrendingUp,
  Tag,
  ArrowRight,
  Flame,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Lightbulb,
  AlertOctagon,
} from 'lucide-react';
import { useInterview } from '@/lib/interviewStore';

export const IntelligenceBriefing: React.FC = () => {
  const router = useRouter();
  const { session, startInterview } = useInterview();
  const { briefing } = session;

  const [expandedTrapIdx, setExpandedTrapIdx] = useState<number | null>(0);

  const handleStart = () => {
    startInterview();
    router.push('/studio/live');
  };

  const getScoreColor = (score: number) => {
    if (score >= 82) return 'text-emerald-400 border-emerald-500/40 bg-emerald-500/10';
    if (score >= 70) return 'text-teal-400 border-teal-500/40 bg-teal-500/10';
    return 'text-amber-400 border-amber-500/40 bg-amber-500/10';
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-electric-violet to-electric-teal p-0.5 shadow-md shadow-electric-violet/20">
            <div className="w-full h-full bg-obsidian-950 rounded-[10px] flex items-center justify-center text-electric-teal">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div>
            <h2 className="font-heading font-extrabold text-base text-white">
              Briefing Intelijen CV (AI Pre-Check)
            </h2>
            <p className="text-xs text-obsidian-400">
              Analisis otomatis kecocokan profil & prediksi pertanyaan jebakan HR
            </p>
          </div>
        </div>

        <span className="text-[11px] font-mono text-electric-teal bg-electric-teal/10 border border-electric-teal/20 px-2 py-0.5 rounded-full font-semibold">
          MOD-01 P0
        </span>
      </div>

      {/* Bento Card 1: Match Score & Sub-scores */}
      <div className="glass-panel rounded-2xl p-5 border border-obsidian-700 relative overflow-hidden group shadow-xl">
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-electric-teal/10 via-electric-violet/5 to-transparent rounded-bl-full pointer-events-none"></div>

        <div className="flex items-start justify-between mb-4">
          <div>
            <span className="text-xs text-obsidian-400 uppercase tracking-wider font-bold">
              Skor Kecocokan CV vs JD
            </span>
            <div className="flex items-baseline gap-2.5 mt-1">
              <span className="text-4xl sm:text-5xl font-mono font-black text-white tracking-tight">
                {briefing.matchScore}%
              </span>
              <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold border ${getScoreColor(briefing.matchScore)}`}>
                {briefing.matchScore >= 80 ? 'Sangat Kompetitif' : 'Baik, Layak Wawancara'}
              </span>
            </div>
          </div>

          <div className="w-12 h-12 rounded-2xl bg-obsidian-850 border border-obsidian-700 flex items-center justify-center text-electric-teal shadow-inner">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>

        {/* Dynamic Progress Bar */}
        <div className="w-full h-2.5 bg-obsidian-850 rounded-full overflow-hidden p-0.5 border border-obsidian-700 mb-4">
          <div
            className="h-full rounded-full bg-gradient-to-r from-electric-violet via-electric-teal to-emerald-400 transition-all duration-1000 ease-out"
            style={{ width: `${briefing.matchScore}%` }}
          ></div>
        </div>

        {/* 3 Sub-scores Breakdown */}
        <div className="grid grid-cols-3 gap-2 pt-3 border-t border-obsidian-700/70 text-center">
          <div className="p-2 rounded-xl bg-obsidian-850/80 border border-obsidian-800">
            <span className="text-[10px] text-obsidian-400 uppercase block font-semibold">Hard Skills</span>
            <span className="text-sm font-mono font-bold text-electric-teal">{briefing.hardSkillScore}%</span>
          </div>
          <div className="p-2 rounded-xl bg-obsidian-850/80 border border-obsidian-800">
            <span className="text-[10px] text-obsidian-400 uppercase block font-semibold">Pengalaman</span>
            <span className="text-sm font-mono font-bold text-emerald-400">{briefing.experienceScore}%</span>
          </div>
          <div className="p-2 rounded-xl bg-obsidian-850/80 border border-obsidian-800">
            <span className="text-[10px] text-obsidian-400 uppercase block font-semibold">Culture Fit</span>
            <span className="text-sm font-mono font-bold text-slate-100">{briefing.cultureScore}%</span>
          </div>
        </div>
      </div>

      {/* Bento Card 2: 3 Trap Questions with Expandable Blueprint */}
      <div className="glass-panel rounded-2xl p-5 border border-obsidian-700 shadow-xl space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400">
              3 Prediksi Pertanyaan Jebakan HR (Trap Questions)
            </h3>
          </div>
          <span className="text-[10px] text-obsidian-400 font-mono">Berdasarkan Celah CV</span>
        </div>

        <div className="space-y-2.5">
          {briefing.trapQuestions.map((trap, idx) => {
            const isExpanded = expandedTrapIdx === idx;
            return (
              <div
                key={trap.id || idx}
                className="rounded-xl bg-obsidian-850 border border-obsidian-700 overflow-hidden transition"
              >
                <button
                  type="button"
                  onClick={() => setExpandedTrapIdx(isExpanded ? null : idx)}
                  className="w-full p-3 text-left flex items-start justify-between gap-2 hover:bg-obsidian-800/50 transition"
                >
                  <div className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 text-xs font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="text-xs font-semibold text-slate-100 leading-snug">
                      "{trap.question}"
                    </span>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-obsidian-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-obsidian-400 shrink-0" />
                  )}
                </button>

                {isExpanded && (
                  <div className="p-3 pt-0 border-t border-obsidian-700/60 text-xs space-y-2 bg-obsidian-900/60">
                    <div className="flex items-start gap-1.5 text-obsidian-300">
                      <AlertOctagon className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-rose-400">Celah CV:</strong> {trap.gapReason}
                      </span>
                    </div>

                    <div className="flex items-start gap-1.5 text-obsidian-300">
                      <Lightbulb className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-amber-400">Strategi Penyelamat:</strong> {trap.suggestedStrategy}
                      </span>
                    </div>

                    {trap.sampleFormulaAnswer && (
                      <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-300">
                        <strong className="block font-semibold mb-1">💡 Formula STAR Jawaban Teruji:</strong>
                        <p className="italic leading-relaxed">{trap.sampleFormulaAnswer}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Bento Card 3: Missing Keywords & Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Missing Keywords */}
        <div className="glass-panel rounded-xl p-4 border border-obsidian-700">
          <div className="flex items-center gap-1.5 mb-2.5 text-xs font-semibold text-rose-400">
            <Tag className="w-3.5 h-3.5" />
            <span>Kata Kunci Belum Ada di CV</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {briefing.missingKeywords.length > 0 ? (
              briefing.missingKeywords.map((kw, i) => (
                <span
                  key={i}
                  className="text-[11px] font-mono px-2 py-0.5 rounded bg-rose-500/10 border border-rose-500/20 text-rose-300 flex items-center gap-1"
                >
                  #{kw.word}
                  {kw.importance === 'high' && (
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                  )}
                </span>
              ))
            ) : (
              <span className="text-xs text-obsidian-400">Semua kata kunci utama tercakup.</span>
            )}
          </div>
        </div>

        {/* Strengths */}
        <div className="glass-panel rounded-xl p-4 border border-obsidian-700">
          <div className="flex items-center gap-1.5 mb-2.5 text-xs font-semibold text-emerald-400">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Kekuatan Terkuat dari CV</span>
          </div>
          <ul className="text-[11px] text-obsidian-300 space-y-1">
            {briefing.strengths.slice(0, 2).map((str, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <span className="text-emerald-400 font-bold">•</span>
                <span className="line-clamp-2">{str}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* CTA START BUTTON */}
      <button
        onClick={handleStart}
        className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-electric-violet via-indigo-600 to-electric-teal text-white font-heading font-black text-sm sm:text-base flex items-center justify-center gap-3 shadow-2xl shadow-electric-violet/30 hover:shadow-electric-violet/50 hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 group"
      >
        <Flame className="w-5 h-5 text-amber-300 group-hover:scale-110 transition-transform" />
        <span>MASUK RUANG WAWANCARA SEKARANG</span>
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
      </button>

      <p className="text-center text-[11px] text-obsidian-400">
        Mikrofon dan audio langsung aktif di studio virtual. 100% Gratis di Vercel Hobby Tier.
      </p>
    </div>
  );
};
