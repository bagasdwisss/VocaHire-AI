'use client';

import React, { useState } from 'react';
import {
  Briefcase,
  FileText,
  Sliders,
  Globe2,
  Users,
  Compass,
  FileCheck,
  Upload,
  Check,
  DollarSign,
  Lightbulb,
  Building,
} from 'lucide-react';
import { useInterview } from '@/lib/interviewStore';
import {
  CULTURE_PRESETS,
  LANGUAGES,
  PERSONAS,
  SAMPLE_CANDIDATE_CV,
  SAMPLE_JOB_DESCRIPTION,
} from '@/lib/constants';
import { CulturePreset, LanguageCode, InterviewMode } from '@/types/interview';

export const JobConfigForm: React.FC = () => {
  const {
    session,
    updatePosition,
    updateIndustry,
    updateJobDescription,
    updateCv,
    updateCulture,
    updateLanguage,
    updateMode,
    updatePrimaryPersona,
    toggleCopilot,
    toggleSalaryRound,
  } = useInterview();

  const [activeTab, setActiveTab] = useState<'job' | 'cv' | 'settings'>('job');

  const handleUseSampleCv = () => {
    updateCv(SAMPLE_CANDIDATE_CV);
  };

  const handleUseSampleJd = () => {
    updateJobDescription(SAMPLE_JOB_DESCRIPTION);
    updatePosition('Product Manager');
    updateIndustry('Fintech & Digital Commerce');
  };

  return (
    <div className="space-y-5">
      {/* Step Header */}
      <div className="flex items-center justify-between border-b border-obsidian-700/80 pb-3">
        <div>
          <h2 className="font-heading font-bold text-base text-white">
            Konteks & Konfigurasi Ruang
          </h2>
          <p className="text-xs text-obsidian-400">
            Tentukan kualifikasi posisi dan kustomisasi gaya simulasi
          </p>
        </div>

        {/* Quick Tabs on Mobile/Compact */}
        <div className="flex bg-obsidian-850 p-1 rounded-xl border border-obsidian-700 text-xs">
          <button
            type="button"
            onClick={() => setActiveTab('job')}
            className={`px-3 py-1 rounded-lg transition ${
              activeTab === 'job'
                ? 'bg-electric-violet text-white font-medium shadow-sm'
                : 'text-obsidian-400 hover:text-white'
            }`}
          >
            Posisi & JD
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('cv')}
            className={`px-3 py-1 rounded-lg transition ${
              activeTab === 'cv'
                ? 'bg-electric-violet text-white font-medium shadow-sm'
                : 'text-obsidian-400 hover:text-white'
            }`}
          >
            Dokumen CV
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('settings')}
            className={`px-3 py-1 rounded-lg transition ${
              activeTab === 'settings'
                ? 'bg-electric-violet text-white font-medium shadow-sm'
                : 'text-obsidian-400 hover:text-white'
            }`}
          >
            Pengaturan
          </button>
        </div>
      </div>

      {/* TAB 1: Posisi & JD */}
      {activeTab === 'job' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-obsidian-300 uppercase tracking-wider mb-1.5">
                Target Posisi
              </label>
              <div className="relative">
                <Briefcase className="w-4 h-4 text-obsidian-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={session.targetPosition}
                  onChange={(e) => updatePosition(e.target.value)}
                  placeholder="Contoh: Product Manager, Software Engineer..."
                  className="w-full pl-9 pr-3 py-2.5 bg-obsidian-850 border border-obsidian-700 rounded-xl text-sm text-white focus:outline-none focus:border-electric-violet transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-obsidian-300 uppercase tracking-wider mb-1.5">
                Industri / Sektor
              </label>
              <div className="relative">
                <Building className="w-4 h-4 text-obsidian-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={session.industry}
                  onChange={(e) => updateIndustry(e.target.value)}
                  placeholder="Contoh: Fintech, SaaS, FMCG, BUMN..."
                  className="w-full pl-9 pr-3 py-2.5 bg-obsidian-850 border border-obsidian-700 rounded-xl text-sm text-white focus:outline-none focus:border-electric-violet transition"
                />
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-obsidian-300 uppercase tracking-wider">
                Tempel Kualifikasi Lowongan (Job Description)
              </label>
              <button
                type="button"
                onClick={handleUseSampleJd}
                className="text-xs text-electric-teal hover:underline font-medium"
              >
                + Muat Contoh JD Fintech
              </button>
            </div>
            <textarea
              rows={6}
              value={session.jobDescription}
              onChange={(e) => updateJobDescription(e.target.value)}
              placeholder="Salin dan tempel deskripsi lowongan di sini..."
              className="w-full p-3 bg-obsidian-850 border border-obsidian-700 rounded-xl text-xs sm:text-sm text-obsidian-200 focus:outline-none focus:border-electric-violet font-sans leading-relaxed resize-none transition"
            />
          </div>
        </div>
      )}

      {/* TAB 2: Dokumen CV */}
      {activeTab === 'cv' && (
        <div className="space-y-4">
          <div className="glass-panel p-4 rounded-xl border border-obsidian-700">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-electric-teal" />
                <div>
                  <h3 className="text-sm font-semibold text-white">
                    {session.cv.fileName}
                  </h3>
                  <p className="text-xs text-obsidian-400">
                    Kandidat: <span className="text-slate-200 font-medium">{session.cv.candidateName}</span> ({session.cv.experienceYears} Thn Pengalaman)
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleUseSampleCv}
                className="px-2.5 py-1 text-xs rounded-lg bg-obsidian-800 text-electric-teal hover:bg-obsidian-700 border border-obsidian-600 transition"
              >
                Gunakan CV Default
              </button>
            </div>

            <div className="p-3 bg-obsidian-900/90 rounded-lg border border-obsidian-800 text-xs text-obsidian-300 max-h-48 overflow-y-auto font-mono whitespace-pre-wrap leading-relaxed">
              {session.cv.rawText}
            </div>

            <div className="mt-3 flex items-center justify-between text-xs text-obsidian-400">
              <span className="flex items-center gap-1 text-emerald-400">
                <Check className="w-3.5 h-3.5" /> CV Berhasil Terbaca & Terindeks
              </span>
              <span>2 Halaman Terdeteksi</span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Pengaturan Simulasi */}
      {activeTab === 'settings' && (
        <div className="space-y-4">
          {/* Preset Budaya */}
          <div>
            <label className="block text-xs font-semibold text-obsidian-300 uppercase tracking-wider mb-2">
              Preset Budaya Perusahaan
            </label>
            <div className="grid grid-cols-2 gap-2">
              {(Object.keys(CULTURE_PRESETS) as CulturePreset[]).map((key) => {
                const item = CULTURE_PRESETS[key];
                const isSelected = session.culturePreset === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => updateCulture(key)}
                    className={`p-3 rounded-xl border text-left transition ${
                      isSelected
                        ? 'border-electric-violet bg-electric-violet/10 text-white shadow-sm'
                        : 'border-obsidian-700 bg-obsidian-850 text-obsidian-400 hover:text-white'
                    }`}
                  >
                    <div className="text-xs font-bold text-white mb-0.5">{item.name}</div>
                    <div className="text-[10px] text-obsidian-400 line-clamp-1">{item.badge}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bahasa & Mode */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-obsidian-300 uppercase tracking-wider mb-1.5">
                Bahasa Wawancara (8 Pilihan)
              </label>
              <select
                value={session.languageCode}
                onChange={(e) => updateLanguage(e.target.value as LanguageCode)}
                className="w-full px-3 py-2.5 bg-obsidian-850 border border-obsidian-700 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-electric-violet transition"
              >
                {LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.flag} {lang.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-obsidian-300 uppercase tracking-wider mb-1.5">
                Format Wawancara
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => updateMode('single')}
                  className={`py-2 px-3 rounded-xl border text-xs font-medium transition ${
                    session.interviewMode === 'single'
                      ? 'border-electric-teal bg-electric-teal/10 text-electric-teal font-semibold'
                      : 'border-obsidian-700 bg-obsidian-850 text-obsidian-400 hover:text-white'
                  }`}
                >
                  Single HR
                </button>
                <button
                  type="button"
                  onClick={() => updateMode('panel_dual')}
                  className={`py-2 px-3 rounded-xl border text-xs font-medium transition ${
                    session.interviewMode === 'panel_dual'
                      ? 'border-electric-teal bg-electric-teal/10 text-electric-teal font-semibold'
                      : 'border-obsidian-700 bg-obsidian-850 text-obsidian-400 hover:text-white'
                  }`}
                >
                  Panel 2 AI
                </button>
              </div>
            </div>
          </div>

          {/* Persona Selector */}
          <div>
            <label className="block text-xs font-semibold text-obsidian-300 uppercase tracking-wider mb-1.5">
              Pilih Persona Utama
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {PERSONAS.map((p) => {
                const isSelected = session.primaryPersona.id === p.id;
                return (
                  <div
                    key={p.id}
                    onClick={() => updatePrimaryPersona(p)}
                    className={`p-3 rounded-xl border cursor-pointer transition ${
                      isSelected
                        ? 'border-electric-violet bg-electric-violet/10 shadow-sm'
                        : 'border-obsidian-700 bg-obsidian-850 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-2xl">{p.avatar}</span>
                      <div>
                        <h4 className="text-xs font-bold text-white">{p.name}</h4>
                        <p className="text-[11px] text-electric-teal">{p.role}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Toggle Switches: Copilot & Salary Negotiation */}
          <div className="space-y-2 pt-2 border-t border-obsidian-700/80">
            <label
              onClick={toggleCopilot}
              className="flex items-center justify-between p-3 rounded-xl bg-obsidian-850 border border-obsidian-700 cursor-pointer hover:border-obsidian-600 transition"
            >
              <div className="flex items-center gap-2.5">
                <Lightbulb className="w-4 h-4 text-amber-400" />
                <div>
                  <div className="text-xs font-semibold text-white">Smart Copilot Hint (Teleprompter)</div>
                  <div className="text-[11px] text-obsidian-400">Tampilkan 3 poin kunci dari CV saat giliran bicara</div>
                </div>
              </div>
              <input
                type="checkbox"
                checked={session.copilotEnabled}
                readOnly
                className="w-4 h-4 accent-electric-violet rounded"
              />
            </label>

            <label
              onClick={toggleSalaryRound}
              className="flex items-center justify-between p-3 rounded-xl bg-obsidian-850 border border-obsidian-700 cursor-pointer hover:border-obsidian-600 transition"
            >
              <div className="flex items-center gap-2.5">
                <DollarSign className="w-4 h-4 text-emerald-400" />
                <div>
                  <div className="text-xs font-semibold text-white">Babak Negosiasi Gaji (+3 Menit)</div>
                  <div className="text-[11px] text-obsidian-400">Simulasi adu argumen nilai tawar kompensasi di akhir sesi</div>
                </div>
              </div>
              <input
                type="checkbox"
                checked={session.includeSalaryRound}
                readOnly
                className="w-4 h-4 accent-electric-teal rounded"
              />
            </label>
          </div>
        </div>
      )}
    </div>
  );
};
