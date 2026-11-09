'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import {
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  Tag,
  ArrowRight,
  ShieldAlert,
  Flame,
} from 'lucide-react';
import { useInterview } from '@/lib/interviewStore';

export const IntelligenceBriefing: React.FC = () => {
  const router = useRouter();
  const { session, startInterview } = useInterview();
  const { briefing } = session;

  const handleStart = () => {
    startInterview();
    router.push('/studio/live');
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-400 border-emerald-500/40 bg-emerald-500/10';
    if (score >= 65) return 'text-teal-400 border-teal-500/40 bg-teal-500/10';
    return 'text-amber-400 border-amber-500/40 bg-amber-500/10';
  };

  const getScoreStatus = (score: number) => {
    if (score >= 80) return 'Kecocokan Sangat Tinggi';
    if (score >= 65) return 'Kecocokan Kompetitif (Baik)';
    return 'Cukup, Perlu Penyesuaian CV';
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-electric-violet/20 border border-electric-violet/30 flex items-center justify-center text-electric-violet">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h2 className="font-heading font-bold text-base text-white">
              Briefing Intelijen CV (AI Pre-Check)
            </h2>
            <p className="text-xs text-obsidian-400">
              Analisis otomatis celah CV terhadap kualifikasi lowongan
            </p>
          </div>
        </div>

        <span className="text-[11px] font-mono text-electric-teal bg-electric-teal/10 border border-electric-teal/20 px-2 py-0.5 rounded-full">
          MOD-01 Active
        </span>
      </div>

      {/* Card 1: Match Score Bento Card */}
      <div className="glass-panel rounded-2xl p-5 border border-obsidian-700 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl from-electric-teal/10 to-transparent rounded-bl-full pointer-events-none"></div>

        <div className="flex items-start justify-between mb-3">
          <div>
            <span className="text-xs text-obsidian-400 uppercase tracking-wider font-semibold">
              Skor Kecocokan CV vs JD
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-4xl font-mono font-extrabold text-white">
                {briefing.matchScore}%
              </span>
              <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium border ${getScoreColor(briefing.matchScore)}`}>
                {getScoreStatus(briefing.matchScore)}
              </span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-obsidian-800 border border-obsidian-700 flex items-center justify-center text-electric-teal">
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2.5 bg-obsidian-800 rounded-full overflow-hidden p-0.5 border border-obsidian-700">
          <div
            className="h-full rounded-full bg-gradient-to-r from-electric-violet via-electric-teal to-emerald-400 transition-all duration-700 ease-out"
            style={{ width: `${briefing.matchScore}%` }}
          ></div>
        </div>

        <p className="mt-3 text-xs text-obsidian-300 leading-relaxed">
          {briefing.summary}
        </p>
      </div>

      {/* Card 2: Trap Questions Bento Card (FITUR BARU P0) */}
      <div className="glass-panel rounded-2xl p-5 border border-obsidian-700">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 rounded-md bg-amber-500/20 text-amber-400 flex items-center justify-center">
            <ShieldAlert className="w-3.5 h-3.5" />
          </div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400">
            3 Prediksi Pertanyaan Jebakan HR (Trap Questions)
          </h3>
        </div>

        <div className="space-y-3">
          {briefing.trapQuestions.map((trap, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-obsidian-850 border border-obsidian-700/80 hover:border-amber-500/30 transition-colors"
            >
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 text-xs font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <div className="space-y-1.5 flex-1">
                  <p className="text-xs font-semibold text-slate-100 italic leading-snug">
                    "{trap.question}"
                  </p>
                  <div className="text-[11px] text-obsidian-400 flex items-center gap-1">
                    <span className="text-amber-500 font-medium">Celah Terdeteksi:</span> {trap.gapReason}
                  </div>
                  <div className="text-[11px] text-teal-400/90 bg-teal-500/5 px-2 py-1 rounded border border-teal-500/10">
                    💡 <span className="font-medium">Tips Jawaban:</span> {trap.suggestedStrategy}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Card 3: Missing Keywords & Candidate Strengths */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Missing Keywords */}
        <div className="glass-panel rounded-xl p-4 border border-obsidian-700">
          <div className="flex items-center gap-1.5 mb-2.5 text-xs font-semibold text-rose-400">
            <Tag className="w-3.5 h-3.5" />
            <span>Kata Kunci JD Belum Ada di CV</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {briefing.missingKeywords.length > 0 ? (
              briefing.missingKeywords.map((kw, i) => (
                <span
                  key={i}
                  className="text-[11px] font-mono px-2 py-0.5 rounded bg-rose-500/10 border border-rose-500/20 text-rose-300"
                >
                  #{kw}
                </span>
              ))
            ) : (
              <span className="text-xs text-obsidian-400">Semua kata kunci utama telah terakomodasi.</span>
            )}
          </div>
        </div>

        {/* Candidate Strengths */}
        <div className="glass-panel rounded-xl p-4 border border-obsidian-700">
          <div className="flex items-center gap-1.5 mb-2.5 text-xs font-semibold text-emerald-400">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Poin Keunggulan Utama</span>
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

      {/* Call to Action Button */}
      <button
        onClick={handleStart}
        className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-electric-violet via-indigo-600 to-electric-teal text-white font-heading font-bold text-sm sm:text-base flex items-center justify-center gap-3 shadow-xl shadow-electric-violet/25 hover:shadow-electric-violet/40 hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 group"
      >
        <Flame className="w-5 h-5 text-amber-300 group-hover:animate-bounce" />
        <span>MASUK RUANG WAWANCARA SEKARANG</span>
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </button>

      <p className="text-center text-[11px] text-obsidian-400">
        Mikrofon dan audio akan diaktifkan di ruang virtual. Tanpa biaya kuota langganan.
      </p>
    </div>
  );
};
