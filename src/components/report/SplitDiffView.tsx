'use client';

import React, { useState } from 'react';
import { SessionTurn } from '@/types/interview';
import {
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  HelpCircle,
  Volume2,
  VolumeX,
  Target,
  Award,
} from 'lucide-react';

interface SplitDiffViewProps {
  turn: SessionTurn;
}

export const SplitDiffView: React.FC<SplitDiffViewProps> = ({ turn }) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const handlePlayRewrittenAudio = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
    } else {
      window.speechSynthesis.cancel();
      const cleanText = turn.rewrittenStarAnswer
        .replace(/\[Situation\]/g, '')
        .replace(/\[Task\]/g, '')
        .replace(/\[Action\]/g, '')
        .replace(/\[Result\]/g, '');

      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = 'id-ID';
      utterance.rate = 1.0;

      utterance.onstart = () => setIsPlayingAudio(true);
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);

      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="glass-panel rounded-2xl p-6 border border-obsidian-700 space-y-5 shadow-2xl">
      {/* Turn Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-obsidian-700/80 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold text-electric-teal bg-electric-teal/10 px-2.5 py-0.5 rounded-full border border-electric-teal/20 uppercase">
              Bedah Jawaban Giliran #{turn.turnNumber}
            </span>
            <span className="text-xs text-obsidian-400 font-mono">
              Pewawancara: <strong className="text-white">{turn.speakerPersona}</strong>
            </span>
          </div>
          <h4 className="text-sm sm:text-base font-semibold text-white">
            "{turn.questionText}"
          </h4>
        </div>

        {/* Score Shift Card */}
        <div className="flex items-center gap-3 bg-obsidian-850 px-4 py-2 rounded-2xl border border-obsidian-700 shrink-0 shadow-inner">
          <div className="text-right">
            <span className="text-[10px] text-obsidian-400 block font-semibold">Skor Awal Anda</span>
            <span className="text-sm font-mono font-bold text-amber-400">
              {turn.originalScore.toFixed(1)}/10
            </span>
          </div>
          <ArrowRight className="w-4 h-4 text-emerald-400" />
          <div>
            <span className="text-[10px] text-obsidian-400 block font-semibold">Potensi STAR</span>
            <span className="text-sm font-mono font-bold text-emerald-400">
              {turn.rewrittenScore.toFixed(1)}/10
            </span>
          </div>
        </div>
      </div>

      {/* Side-by-Side Split Diff View */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Kiri: Transkrip Asli Kandidat */}
        <div className="p-5 rounded-2xl bg-obsidian-850/80 border border-obsidian-700/90 flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-obsidian-300 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-400" /> Transkrip Asli Anda
              </span>
              <span className="text-[11px] font-mono text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full font-bold">
                WPM: {turn.wpmRate}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed whitespace-pre-wrap">
              {turn.candidateRawAnswer}
            </p>
          </div>

          {turn.fillerWords.length > 0 && (
            <div className="pt-3 border-t border-obsidian-700/60 text-xs text-obsidian-400 flex items-center gap-2">
              <span className="text-amber-400 font-medium">Kata Pengisi:</span>
              <div className="flex flex-wrap gap-1">
                {turn.fillerWords.map((f, i) => (
                  <span
                    key={i}
                    className="text-[10px] font-mono bg-amber-500/15 text-amber-300 px-2 py-0.5 rounded border border-amber-500/25"
                  >
                    "{f.word}" ({f.count}x)
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Kanan: Rekomendasi Jawaban Lolos HR (STAR Rewritten) */}
        <div className="p-5 rounded-2xl bg-obsidian-850/90 border border-emerald-500/30 flex flex-col justify-between space-y-3 shadow-xl shadow-emerald-500/5 relative">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-400" /> Rekomendasi STAR (Versi Lolos HR)
              </span>
              <button
                onClick={handlePlayRewrittenAudio}
                className="text-[11px] font-mono text-electric-teal bg-electric-teal/10 hover:bg-electric-teal/20 px-2.5 py-1 rounded-lg border border-electric-teal/30 flex items-center gap-1.5 transition font-semibold"
              >
                {isPlayingAudio ? (
                  <>
                    <VolumeX className="w-3.5 h-3.5 text-rose-400" />
                    <span>Hentikan Suara</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Dengarkan Audio</span>
                  </>
                )}
              </button>
            </div>

            <p className="text-xs sm:text-sm text-slate-100 font-sans leading-relaxed whitespace-pre-wrap">
              {turn.rewrittenStarAnswer}
            </p>
          </div>

          <div className="pt-3 border-t border-obsidian-700/60 text-xs flex flex-wrap gap-2 text-emerald-300">
            <span className="font-semibold text-white">Elemen Kunci:</span>
            <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 font-mono text-[11px]">
              ✓ Kata Kerja Aktif
            </span>
            <span className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-300 font-mono text-[11px]">
              ✓ Metrik Bisnis Terukur (+10.5%)
            </span>
          </div>
        </div>
      </div>

      {/* HR Rationale Box */}
      <div className="p-4 rounded-xl bg-electric-violet/10 border border-electric-violet/30 flex items-start gap-3">
        <div className="p-1.5 rounded-lg bg-electric-violet/20 text-electric-violet shrink-0 mt-0.5">
          <Target className="w-4 h-4" />
        </div>
        <div>
          <h5 className="text-xs font-bold uppercase tracking-wider text-electric-violet mb-1">
            🎯 Rahasia Rubrik HR: Mengapa Versi Kanan Menghasilkan Skor 9.6/10?
          </h5>
          <p className="text-xs text-obsidian-200 leading-relaxed">
            {turn.hrRationale}
          </p>
        </div>
      </div>
    </div>
  );
};
