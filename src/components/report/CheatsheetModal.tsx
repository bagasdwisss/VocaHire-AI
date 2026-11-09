'use client';

import React from 'react';
import { X, Printer, Download, Sparkles, CheckSquare, Award } from 'lucide-react';
import { InterviewSession } from '@/types/interview';

interface CheatsheetModalProps {
  session: InterviewSession;
  isOpen: boolean;
  onClose: () => void;
}

export const CheatsheetModal: React.FC<CheatsheetModalProps> = ({
  session,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-obsidian-900 border border-obsidian-700 w-full max-w-3xl rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Modal Top Actions */}
        <div className="flex items-center justify-between border-b border-obsidian-700 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-electric-teal bg-electric-teal/10 px-2 py-0.5 rounded-full border border-electric-teal/20">
                FITUR P1: CHEAT-SHEET
              </span>
              <span className="text-xs text-obsidian-400 font-mono">1-Page Pocket Guide</span>
            </div>
            <h3 className="text-lg font-heading font-extrabold text-white mt-1">
              Buku Saku Wawancara (Interview Cheat-Sheet)
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-2 rounded-xl bg-electric-teal hover:bg-electric-teal-hover text-obsidian-950 font-bold text-xs flex items-center gap-1.5 transition shadow-sm"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak / Simpan PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-obsidian-800 hover:bg-obsidian-700 text-obsidian-400 hover:text-white transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Cheat-Sheet Printable Body */}
        <div className="p-6 rounded-xl bg-obsidian-850 border border-obsidian-700/80 space-y-6 text-slate-100 font-sans">
          {/* Header Title */}
          <div className="border-b border-obsidian-700/60 pb-3 flex justify-between items-start">
            <div>
              <h2 className="text-base font-bold text-white">
                VocaHire AI — Ringkasan Persona & Jawaban Terbaik
              </h2>
              <p className="text-xs text-obsidian-400">
                Kandidat: <strong className="text-white">{session.cv.candidateName}</strong> | Posisi: <strong className="text-electric-teal">{session.targetPosition}</strong>
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs font-mono text-emerald-400 font-bold">
                Skor Latihan: {session.overallScore.toFixed(1)}/10
              </span>
            </div>
          </div>

          {/* Section 1: Poin Pencapaian CV Wajib Ingat */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2 flex items-center gap-1.5">
              <CheckSquare className="w-3.5 h-3.5" /> 3 Poin Pencapaian CV yang Wajib Disebutkan
            </h4>
            <ul className="space-y-1.5 text-xs text-obsidian-200">
              {session.cv.careerHighlights.map((hl, i) => (
                <li key={i} className="flex items-start gap-2 bg-obsidian-900/60 p-2 rounded-lg border border-obsidian-800">
                  <span className="text-emerald-400 font-bold font-mono">0{i+1}.</span>
                  <span>{hl}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 2: Jawaban STAR Versi Terbaik (Skor 9.5/10) */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-electric-teal mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Jawaban Teruji STAR untuk Pertanyaan Utama
            </h4>
            <div className="space-y-3">
              {session.turns.map((turn, i) => (
                <div key={i} className="p-3 bg-obsidian-900/80 rounded-xl border border-obsidian-800 text-xs">
                  <p className="font-semibold text-white mb-1.5">
                    Tanya: "{turn.questionText}"
                  </p>
                  <p className="text-slate-200 leading-relaxed italic bg-obsidian-850/80 p-2.5 rounded-lg border border-obsidian-700/60">
                    "{turn.rewrittenStarAnswer}"
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Strategi Pertanyaan Jebakan */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-rose-400 mb-2">
              🚨 Antisipasi 3 Pertanyaan Jebakan HR
            </h4>
            <div className="space-y-2 text-xs text-obsidian-300">
              {session.briefing.trapQuestions.map((t, idx) => (
                <div key={idx} className="p-2.5 bg-obsidian-900/60 rounded-lg border border-obsidian-800">
                  <span className="font-semibold text-white block">"{t.question}"</span>
                  <span className="text-[11px] text-teal-300">Strategi: {t.suggestedStrategy}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
