'use client';

import React from 'react';
import { JobConfigForm } from '@/components/setup/JobConfigForm';
import { IntelligenceBriefing } from '@/components/setup/IntelligenceBriefing';
import { Sparkles, CheckCircle2 } from 'lucide-react';

export default function SetupPage() {
  return (
    <div className="flex-1 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      {/* Top Banner */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-obsidian-700/60 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-electric-violet/10 text-electric-violet border border-electric-violet/20 flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> COMMAND CENTER
            </span>
            <span className="text-xs text-obsidian-400 font-mono">/studio/setup</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-heading font-extrabold text-white tracking-tight">
            Studio Persiapan & Intelijen CV
          </h1>
          <p className="text-xs sm:text-sm text-obsidian-400 mt-0.5">
            Konfigurasi kualifikasi lowongan dan bedah titik lemah CV sebelum memasuki ruang wawancara virtual
          </p>
        </div>

        {/* Feature Highlights Pills */}
        <div className="hidden lg:flex items-center gap-2">
          <div className="px-3 py-1.5 rounded-xl bg-obsidian-850 border border-obsidian-700 text-xs text-obsidian-300 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Prediksi Trap Question</span>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-obsidian-850 border border-obsidian-700 text-xs text-obsidian-300 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-electric-teal" />
            <span>STAR Live Tracker</span>
          </div>
        </div>
      </div>

      {/* Bento Grid 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Kolom Kiri: Konteks & Konfigurasi (7 Kolom) */}
        <div className="lg:col-span-7 glass-panel rounded-2xl p-5 sm:p-6 border border-obsidian-700 shadow-xl">
          <JobConfigForm />
        </div>

        {/* Kolom Kanan: Briefing Intelijen CV (5 Kolom) */}
        <div className="lg:col-span-5 sticky top-20">
          <IntelligenceBriefing />
        </div>
      </div>
    </div>
  );
}
