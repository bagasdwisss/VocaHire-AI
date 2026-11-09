'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  FileText,
  RotateCcw,
  Printer,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Play,
  Volume2,
  DollarSign,
  Zap,
} from 'lucide-react';
import { useInterview } from '@/lib/interviewStore';
import { ScoreHero } from '@/components/report/ScoreHero';
import { RadarChart } from '@/components/report/RadarChart';
import { SplitDiffView } from '@/components/report/SplitDiffView';
import { CheatsheetModal } from '@/components/report/CheatsheetModal';

export default function ReportPage() {
  const router = useRouter();
  const { session, resetSession } = useInterview();
  const [showCheatsheet, setShowCheatsheet] = useState(false);
  const [selectedTurnIdx, setSelectedTurnIdx] = useState(0);

  const handleRetrain = () => {
    resetSession();
    router.push('/studio/setup');
  };

  const turnsToDisplay = session.turns.length > 0 ? session.turns : [];

  return (
    <div className="flex-1 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-6">
      {/* Top Bar Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-obsidian-700/60 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              SESI SELESAI & TERNILAI
            </span>
            <span className="text-xs text-obsidian-400 font-mono">
              ID: #{session.id.slice(-8)}
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-heading font-extrabold text-white">
            Laporan Evaluasi & Bedah Jawaban Komprehensif
          </h1>
          <p className="text-xs sm:text-sm text-obsidian-400">
            Analisis multi-dimensi STAR, kelancaran vokal, dan rekomendasi jawaban lolos HR
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowCheatsheet(true)}
            className="px-4 py-2.5 rounded-xl bg-electric-teal hover:bg-electric-teal-hover text-obsidian-950 font-heading font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-electric-teal/20 transition"
          >
            <Printer className="w-4 h-4" />
            <span>Buku Saku Wawancara (PDF)</span>
          </button>

          <button
            onClick={handleRetrain}
            className="px-4 py-2.5 rounded-xl bg-obsidian-800 hover:bg-obsidian-700 border border-obsidian-700 text-slate-200 font-medium text-xs sm:text-sm flex items-center gap-2 transition"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Latih Lagi</span>
          </button>
        </div>
      </div>

      {/* 1. Score Hero Summary */}
      <ScoreHero
        overallScore={session.overallScore || 8.4}
        radarMetrics={session.radarMetrics}
        avgWpm={session.avgWpm || 132}
        totalFillerWords={session.totalFillerWords || 2}
        targetPosition={session.targetPosition}
      />

      {/* 2. Middle Row: Radar Chart & Timeline Interaktif */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Radar Chart (5 Kolom) */}
        <div className="lg:col-span-5">
          <RadarChart metrics={session.radarMetrics} />
        </div>

        {/* Audio Timeline & Turn Selector (7 Kolom) */}
        <div className="lg:col-span-7 glass-panel rounded-2xl p-6 border border-obsidian-700 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-electric-teal" /> Timeline Percakapan & Rekaman
              </h3>
              <span className="text-xs font-mono text-obsidian-400">
                Total Durasi: {Math.floor(session.durationSeconds / 60)}m {session.durationSeconds % 60}s
              </span>
            </div>

            <p className="text-xs text-obsidian-300 mb-4">
              Pilih giliran tanya-jawab di bawah untuk membedah perbandingan transkrip vs jawaban lolos HR:
            </p>

            <div className="space-y-2.5">
              {turnsToDisplay.map((turn, idx) => (
                <div
                  key={turn.id}
                  onClick={() => setSelectedTurnIdx(idx)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition ${
                    selectedTurnIdx === idx
                      ? 'border-electric-violet bg-electric-violet/10 shadow-sm'
                      : 'border-obsidian-700 bg-obsidian-850 hover:border-obsidian-600'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-white font-mono">
                      Turn #{turn.turnNumber}: {turn.speakerPersona}
                    </span>
                    <span className="text-[11px] font-mono text-electric-teal">
                      Skor STAR: {turn.originalScore.toFixed(1)}/10
                    </span>
                  </div>
                  <p className="text-xs text-obsidian-300 line-clamp-1 italic">
                    "{turn.questionText}"
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-obsidian-700/60 flex items-center justify-between text-xs text-obsidian-400">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <ShieldCheck className="w-4 h-4" /> Sesuai Standar Privasi UU PDP (Zero-Training Guarantee)
            </span>
          </div>
        </div>
      </div>

      {/* 3. Side-by-Side Split Diff View */}
      {turnsToDisplay.length > 0 && (
        <SplitDiffView turn={turnsToDisplay[selectedTurnIdx] || turnsToDisplay[0]} />
      )}

      {/* 4. Monetization & Pay-As-You-Go Bundle Banner */}
      <div className="glass-panel rounded-2xl p-6 border border-electric-violet/30 bg-gradient-to-r from-obsidian-850 via-obsidian-900 to-obsidian-850 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
              BEST VALUE BUNDLE
            </span>
            <span className="text-xs text-obsidian-400">Tanpa Berlangganan Bulanan</span>
          </div>
          <h4 className="text-base font-bold text-white">
            Career Pack: 4 Sesi Wawancara + Mode Panel 2 AI + Simulasi Gaji
          </h4>
          <p className="text-xs text-obsidian-300 max-w-xl">
            Latihan intensif dengan simulasi 2 persona pewawancara sekaligus (HR Lead + VP Tech) dan modul tawar-menawar benefit. Kredit berlaku selamanya.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button className="px-5 py-3 rounded-xl bg-electric-violet hover:bg-electric-violet-hover text-white font-heading font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-electric-violet/25 transition">
            <Zap className="w-4 h-4 text-amber-300" />
            <span>Aktifkan via QRIS / e-Wallet</span>
          </button>
        </div>
      </div>

      {/* Cheatsheet Modal */}
      <CheatsheetModal
        session={session}
        isOpen={showCheatsheet}
        onClose={() => setShowCheatsheet(false)}
      />
    </div>
  );
}
