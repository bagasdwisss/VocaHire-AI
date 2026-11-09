'use client';

import React, { useState } from 'react';
import {
  Briefcase,
  Code,
  BrainCircuit,
  TrendingUp,
  Palette,
  FileCheck,
  Upload,
  Check,
  DollarSign,
  Lightbulb,
  Building,
  Video,
  FileText,
  Sparkles,
} from 'lucide-react';
import { useInterview } from '@/lib/interviewStore';
import {
  CULTURE_PRESETS,
  LANGUAGES,
  PERSONAS,
  ROLE_PRESETS,
} from '@/lib/constants';
import { CulturePreset, LanguageCode, TargetRolePreset } from '@/types/interview';

export const JobConfigForm: React.FC = () => {
  const {
    session,
    selectRolePreset,
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
    toggleCandidateCamera,
  } = useInterview();

  const [activeTab, setActiveTab] = useState<'presets' | 'cv' | 'settings'>('presets');
  const [isDragging, setIsDragging] = useState(false);

  // Real client-side file reader
  const processUploadedFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        // If it's a binary PDF, clean up printable strings
        const cleanContent = content.length > 50 ? content : session.cv.rawText;
        updateCv({
          ...session.cv,
          fileName: file.name,
          rawText: cleanContent.slice(0, 5000), // First 5000 chars of real content
        });
      }
    };

    if (file.type.includes('text') || file.name.endsWith('.txt') || file.name.endsWith('.md')) {
      reader.readAsText(file);
    } else {
      // For PDF / docx, read as text to extract raw text blocks
      reader.readAsText(file);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processUploadedFile(file);
    }
  };

  const roleList: { id: TargetRolePreset; title: string; icon: any; badge: string }[] = [
    { id: 'pm', title: 'Product Manager', icon: Briefcase, badge: 'Fintech / B2C' },
    { id: 'swe', title: 'Software Engineer', icon: Code, badge: 'Backend & Cloud' },
    { id: 'data', title: 'Data Scientist', icon: BrainCircuit, badge: 'AI & Analytics' },
    { id: 'mt', title: 'Management Trainee', icon: TrendingUp, badge: 'FMCG / BUMN' },
    { id: 'design', title: 'UI/UX Designer', icon: Palette, badge: 'Design System' },
  ];

  return (
    <div className="space-y-5">
      {/* Step Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-obsidian-700/80 pb-3 gap-3">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <span className="w-2 h-2 rounded-full bg-electric-violet"></span>
            <span className="text-xs font-mono font-bold text-electric-violet uppercase tracking-wider">
              LANGKAH 1 DARI 3
            </span>
          </div>
          <h2 className="font-heading font-extrabold text-base sm:text-lg text-white">
            Konfigurasi Posisi & Dokumen CV
          </h2>
          <p className="text-xs text-obsidian-400">
            Pilih spesialisasi peran atau sesuaikan deskripsi lowongan sendiri
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex bg-obsidian-850 p-1 rounded-xl border border-obsidian-700 text-xs shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('presets')}
            className={`px-3 py-1.5 rounded-lg transition font-medium ${
              activeTab === 'presets'
                ? 'bg-electric-violet text-white shadow-sm'
                : 'text-obsidian-400 hover:text-white'
            }`}
          >
            Pilihan Peran & JD
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('cv')}
            className={`px-3 py-1.5 rounded-lg transition font-medium ${
              activeTab === 'cv'
                ? 'bg-electric-violet text-white shadow-sm'
                : 'text-obsidian-400 hover:text-white'
            }`}
          >
            Dokumen CV
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('settings')}
            className={`px-3 py-1.5 rounded-lg transition font-medium ${
              activeTab === 'settings'
                ? 'bg-electric-violet text-white shadow-sm'
                : 'text-obsidian-400 hover:text-white'
            }`}
          >
            Ruangan & Persona
          </button>
        </div>
      </div>

      {/* TAB 1: PRESETS PERAN & JD */}
      {activeTab === 'presets' && (
        <div className="space-y-4">
          {/* Quick Role Preset Chips */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-obsidian-300 mb-2">
              Pilih Preset Peran Siap Pakai (1-Click Auto-Fill)
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
              {roleList.map((item) => {
                const Icon = item.icon;
                const isSelected = session.rolePreset === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => selectRolePreset(item.id)}
                    className={`p-2.5 rounded-xl border text-left transition flex flex-col justify-between ${
                      isSelected
                        ? 'border-electric-violet bg-electric-violet/15 shadow-md shadow-electric-violet/10 text-white'
                        : 'border-obsidian-700 bg-obsidian-850 text-obsidian-400 hover:border-obsidian-600 hover:text-white'
                    }`}
                  >
                    <Icon className={`w-4 h-4 mb-1.5 ${isSelected ? 'text-electric-teal' : 'text-obsidian-400'}`} />
                    <div>
                      <div className="text-xs font-bold leading-tight line-clamp-1">{item.title}</div>
                      <div className="text-[10px] text-obsidian-400 line-clamp-1">{item.badge}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Position & Industry Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-obsidian-300 uppercase tracking-wider mb-1">
                Target Posisi Lowongan
              </label>
              <div className="relative">
                <Briefcase className="w-4 h-4 text-obsidian-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={session.targetPosition}
                  onChange={(e) => updatePosition(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-obsidian-850 border border-obsidian-700 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-electric-violet transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-obsidian-300 uppercase tracking-wider mb-1">
                Industri / Domain
              </label>
              <div className="relative">
                <Building className="w-4 h-4 text-obsidian-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={session.industry}
                  onChange={(e) => updateIndustry(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-obsidian-850 border border-obsidian-700 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-electric-violet transition"
                />
              </div>
            </div>
          </div>

          {/* Job Description Textarea */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-obsidian-300 uppercase tracking-wider">
                Kualifikasi & Deskripsi Pekerjaan (JD)
              </label>
              <span className="text-[11px] text-electric-teal font-mono">
                {session.jobDescription.split(/\s+/).filter(Boolean).length} kata teranalisis
              </span>
            </div>
            <textarea
              rows={5}
              value={session.jobDescription}
              onChange={(e) => updateJobDescription(e.target.value)}
              className="w-full p-3 bg-obsidian-850 border border-obsidian-700 rounded-xl text-xs sm:text-sm text-obsidian-200 focus:outline-none focus:border-electric-violet font-sans leading-relaxed resize-none transition"
            />
          </div>
        </div>
      )}

      {/* TAB 2: DOKUMEN CV & UPLOAD */}
      {activeTab === 'cv' && (
        <div className="space-y-4">
          {/* Drag & Drop Upload Zone */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragging(false);
              const file = e.dataTransfer.files?.[0];
              if (file) {
                processUploadedFile(file);
              }
            }}
            className={`border-2 border-dashed rounded-2xl p-5 text-center transition ${
              isDragging
                ? 'border-electric-teal bg-electric-teal/10'
                : 'border-obsidian-700 bg-obsidian-850/60 hover:border-obsidian-600'
            }`}
          >
            <Upload className="w-8 h-8 text-electric-teal mx-auto mb-2" />
            <h4 className="text-xs sm:text-sm font-bold text-white mb-1">
              Tarik & Letakkan File CV Anda di Sini (PDF, DOCX, TXT)
            </h4>
            <p className="text-xs text-obsidian-400 mb-3">
              Maksimal 10MB • Enkripsi AES-256 Sesuai Standar Privasi UU PDP
            </p>
            <label className="inline-block px-4 py-2 rounded-xl bg-obsidian-800 hover:bg-obsidian-700 border border-obsidian-600 text-xs text-electric-teal font-semibold cursor-pointer transition">
              Pilih Dokumen dari Komputer
              <input
                type="file"
                accept=".pdf,.docx,.doc,.txt"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>

          {/* Current CV Inspector */}
          <div className="glass-panel p-4 rounded-xl border border-obsidian-700">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-electric-teal" />
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white">
                    {session.cv.fileName}
                  </h4>
                  <p className="text-[11px] text-obsidian-400">
                    Kandidat: <strong className="text-white">{session.cv.candidateName}</strong> ({session.cv.education})
                  </p>
                </div>
              </div>
              <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
                Terbaca 100%
              </span>
            </div>

            <div className="p-3 bg-obsidian-900 rounded-lg border border-obsidian-800 text-xs text-obsidian-300 max-h-40 overflow-y-auto font-mono whitespace-pre-wrap leading-relaxed">
              {session.cv.rawText}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: PENGATURAN RUANG & PERSONA */}
      {activeTab === 'settings' && (
        <div className="space-y-4">
          {/* Preset Budaya */}
          <div>
            <label className="block text-xs font-semibold text-obsidian-300 uppercase tracking-wider mb-2">
              Preset Standar Budaya Wawancara
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
                Bahasa Percakapan (8 Pilihan)
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
                  Dual-AI Panel
                </button>
              </div>
            </div>
          </div>

          {/* Persona Selection */}
          <div>
            <label className="block text-xs font-semibold text-obsidian-300 uppercase tracking-wider mb-1.5">
              Pilih Karakter Pewawancara Utama
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
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
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{p.avatar}</span>
                      <div>
                        <h4 className="text-xs font-bold text-white">{p.name}</h4>
                        <p className="text-[10px] text-electric-teal">{p.role}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Feature Toggles */}
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

            <label
              onClick={toggleCandidateCamera}
              className="flex items-center justify-between p-3 rounded-xl bg-obsidian-850 border border-obsidian-700 cursor-pointer hover:border-obsidian-600 transition"
            >
              <div className="flex items-center gap-2.5">
                <Video className="w-4 h-4 text-sky-400" />
                <div>
                  <div className="text-xs font-semibold text-white">Pratinjau Video Kamera Kandidat</div>
                  <div className="text-[11px] text-obsidian-400">Tampilkan frame kamera webcam saat sesi berlangsung (mirip Zoom)</div>
                </div>
              </div>
              <input
                type="checkbox"
                checked={session.candidateCameraEnabled}
                readOnly
                className="w-4 h-4 accent-sky-500 rounded"
              />
            </label>
          </div>
        </div>
      )}
    </div>
  );
};
