'use client';

import React, { useState, useEffect, useRef } from 'react';
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
  Award,
  Layers,
  ArrowRight,
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
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const confettiCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Confetti effect if score is high
  useEffect(() => {
    if ((session.overallScore || 8.5) >= 7.8) {
      const canvas = confettiCanvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const particles: {
        x: number;
        y: number;
        r: number;
        color: string;
        vx: number;
        vy: number;
        alpha: number;
      }[] = [];

      const colors = ['#6366F1', '#14B8A6', '#F59E0B', '#38BDF8', '#10B981'];

      for (let i = 0; i < 90; i++) {
        particles.push({
          x: canvas.width / 2,
          y: canvas.height * 0.35,
          r: Math.random() * 4 + 2,
          color: colors[Math.floor(Math.random() * colors.length)],
          vx: (Math.random() - 0.5) * 12,
          vy: (Math.random() - 0.5) * 10 - 3,
          alpha: 1,
        });
      }

      let animId: number;
      const renderConfetti = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let alive = false;

        particles.forEach((p) => {
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.2; // gravity
          p.alpha -= 0.012;

          if (p.alpha > 0) {
            alive = true;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = Math.max(0, p.alpha);
            ctx.fill();
            ctx.globalAlpha = 1;
          }
        });

        if (alive) {
          animId = requestAnimationFrame(renderConfetti);
        }
      };

      renderConfetti();

      return () => {
        cancelAnimationFrame(animId);
      };
    }
  }, [session.overallScore]);

  const handleRetrain = () => {
    resetSession();
    router.push('/studio/setup');
  };

  const turnsToDisplay = session.turns.length > 0 ? session.turns : [];

  return (
    <div className="flex-1 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-6 relative">
      {/* Confetti Canvas Overlay */}
      <canvas
        ref={confettiCanvasRef}
        className="pointer-events-none fixed inset-0 z-50 w-full h-full"
      />

      {/* Top Bar Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-obsidian-700/60 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              ✓ SESI EVALUASI SELESAI
            </span>
            <span className="text-xs text-obsidian-400 font-mono">
              ID: #{session.id.slice(-8)}
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-heading font-black text-white tracking-tight">
            Laporan Analitik & Bedah Jawaban STAR
          </h1>
          <p className="text-xs sm:text-sm text-obsidian-400">
            Kalkulasi komprehensif 5 dimensi kompetensi, komparasi transkrip, dan buku saku wawancara
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
            className="px-4 py-2.5 rounded-xl bg-obsidian-850 hover:bg-obsidian-800 border border-obsidian-700 text-slate-200 font-medium text-xs sm:text-sm flex items-center gap-2 transition"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Latih Lagi</span>
          </button>
        </div>
      </div>

      {/* 1. Score Hero Summary */}
      <ScoreHero
        overallScore={session.overallScore || 8.5}
        radarMetrics={session.radarMetrics}
        avgWpm={session.avgWpm || 132}
        totalFillerWords={session.totalFillerWords || 2}
        targetPosition={session.targetPosition}
      />

      {/* 2. Middle Row: Radar Chart & Timeline Interaktif */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Radar Chart (5 Kolom) */}
        <div className="lg:col-span-5">
          <RadarChart metrics={session.radarMetrics} />
        </div>

        {/* Audio Timeline & Turn Selector (7 Kolom) */}
        <div className="lg:col-span-7 glass-panel rounded-2xl p-6 border border-obsidian-700 flex flex-col justify-between shadow-xl">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-electric-teal" /> Timeline Percakapan & Giliran Bicara
              </h3>
              <span className="text-xs font-mono text-obsidian-400">
                Durasi: {Math.floor(session.durationSeconds / 60)}m {session.durationSeconds % 60}s
              </span>
            </div>

            <p className="text-xs text-obsidian-300 mb-4">
              Klik salah satu giliran tanya-jawab di bawah untuk membedah perbandingan kalimat asli vs rekomendasi STAR lolos HR:
            </p>

            <div className="space-y-2.5">
              {turnsToDisplay.map((turn, idx) => (
                <div
                  key={turn.id}
                  onClick={() => setSelectedTurnIdx(idx)}
                  className={`p-4 rounded-xl border cursor-pointer transition ${
                    selectedTurnIdx === idx
                      ? 'border-electric-violet bg-electric-violet/15 shadow-md shadow-electric-violet/10'
                      : 'border-obsidian-700 bg-obsidian-850 hover:border-obsidian-600'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-white font-mono flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-electric-violet"></span>
                      Turn #{turn.turnNumber}: {turn.speakerPersona}
                    </span>
                    <span className="text-[11px] font-mono text-electric-teal font-semibold">
                      Skor STAR: {turn.originalScore.toFixed(1)}/10
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 line-clamp-1 italic">
                    "{turn.questionText}"
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-obsidian-700/60 flex items-center justify-between text-xs text-obsidian-400">
            <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <ShieldCheck className="w-4 h-4" /> Kepatuhan Standar UU PDP (Zero-Training Guarantee)
            </span>
          </div>
        </div>
      </div>

      {/* 3. Side-by-Side Split Diff View */}
      {turnsToDisplay.length > 0 && (
        <SplitDiffView turn={turnsToDisplay[selectedTurnIdx] || turnsToDisplay[0]} />
      )}

      {/* 4. Pay-as-you-go Bundle Card */}
      <div className="glass-panel rounded-2xl p-6 border border-electric-violet/30 bg-gradient-to-r from-obsidian-850 via-obsidian-900 to-obsidian-850 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
              TIERED BUNDLE (NO SUBSCRIPTION)
            </span>
            <span className="text-xs text-obsidian-400 font-mono">Kredit Berlaku Selamanya</span>
          </div>
          <h4 className="text-base sm:text-lg font-bold text-white">
            Career Pack: 4 Sesi Wawancara + Mode Dual-AI Panel + Modul Negosiasi Gaji
          </h4>
          <p className="text-xs text-obsidian-300 max-w-xl leading-relaxed">
            Asah kesiapan karier Anda hingga mencapai skor 9.5+ dengan simulasi 2 pewawancara kritis (HR Lead + VP Tech). Pembayaran instan via QRIS, DANA, GoPay, dan Bank VA.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setShowPaymentModal(true)}
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-electric-violet to-indigo-600 hover:from-indigo-500 hover:to-indigo-600 text-white font-heading font-black text-xs sm:text-sm flex items-center gap-2 shadow-xl shadow-electric-violet/30 hover:scale-105 transition"
          >
            <Zap className="w-4 h-4 text-amber-300" />
            <span>Aktifkan Career Pack (Rp 49.000)</span>
          </button>
        </div>
      </div>

      {/* Cheatsheet Modal */}
      <CheatsheetModal
        session={session}
        isOpen={showCheatsheet}
        onClose={() => setShowCheatsheet(false)}
      />

      {/* Payment Simulation Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-obsidian-900 border border-obsidian-700 w-full max-w-md rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-obsidian-700 pb-3">
              <h3 className="font-heading font-bold text-white text-base">
                Simulasi Pembayaran QRIS / e-Wallet
              </h3>
              <button
                onClick={() => setShowPaymentModal(false)}
                className="text-obsidian-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="p-4 bg-obsidian-850 rounded-xl text-center space-y-3 border border-obsidian-700">
              <div className="w-36 h-36 mx-auto bg-white p-2 rounded-xl flex items-center justify-center">
                {/* Simulated QR Code */}
                <div className="w-full h-full border-4 border-obsidian-900 rounded-lg flex flex-col items-center justify-center text-obsidian-900 font-mono text-xs font-bold">
                  [ QRIS RESMI ]
                  <span className="text-[10px] mt-1">Rp 49.000</span>
                </div>
              </div>
              <p className="text-xs text-obsidian-300">
                Pindai kode QRIS di atas dengan BCA, Mandiri, GoPay, OVO, atau DANA.
              </p>
            </div>

            <button
              onClick={() => {
                alert('Simulasi: Pembayaran Berhasil! 4 Kredit Sesi Wawancara telah ditambahkan ke akun Anda.');
                setShowPaymentModal(false);
              }}
              className="w-full py-3 rounded-xl bg-electric-teal text-obsidian-950 font-heading font-bold text-xs sm:text-sm hover:scale-[1.02] transition"
            >
              Simulasikan Bayar Berhasil
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
