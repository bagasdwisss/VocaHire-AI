'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sparkles, Mic2, ShieldCheck, Zap, RotateCcw } from 'lucide-react';
import { useInterview } from '@/lib/interviewStore';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { session, resetSession } = useInterview();

  const isLive = pathname.includes('/studio/live');
  const isReport = pathname.includes('/studio/report');
  const isSetup = pathname.includes('/studio/setup') || pathname === '/';

  return (
    <header className="sticky top-0 z-50 w-full border-b border-obsidian-700 bg-obsidian-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/studio/setup" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-electric-violet to-electric-teal flex items-center justify-center shadow-lg shadow-electric-violet/20 group-hover:scale-105 transition-transform duration-300">
            <Mic2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-heading font-bold text-lg text-white tracking-tight">
                VocaHire <span className="text-electric-teal font-extrabold">AI</span>
              </span>
              <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-electric-violet/20 text-electric-violet border border-electric-violet/30 font-mono font-medium">
                v3.0 PWA
              </span>
            </div>
            <p className="text-[11px] text-obsidian-400 hidden sm:block">
              Simulasi HR & User Real-Time dengan Analitik STAR
            </p>
          </div>
        </Link>

        {/* Studio Pipeline Stepper */}
        <div className="hidden md:flex items-center gap-1.5 text-xs font-medium bg-obsidian-900/90 border border-obsidian-700 rounded-full p-1 shadow-inner">
          <Link
            href="/studio/setup"
            className={`px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
              isSetup
                ? 'bg-electric-violet text-white shadow-sm'
                : 'text-obsidian-400 hover:text-white'
            }`}
          >
            <span className="w-4 h-4 rounded-full bg-white/20 text-[10px] flex items-center justify-center">1</span>
            Setup & CV Gap
          </Link>

          <Link
            href="/studio/live"
            className={`px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
              isLive
                ? 'bg-electric-teal text-obsidian-950 font-semibold shadow-sm'
                : 'text-obsidian-400 hover:text-white'
            }`}
          >
            <span className="w-4 h-4 rounded-full bg-obsidian-950/20 text-[10px] flex items-center justify-center">2</span>
            Live Studio
          </Link>

          <Link
            href="/studio/report"
            className={`px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
              isReport
                ? 'bg-electric-violet text-white shadow-sm'
                : 'text-obsidian-400 hover:text-white'
            }`}
          >
            <span className="w-4 h-4 rounded-full bg-white/20 text-[10px] flex items-center justify-center">3</span>
            Analitik & Laporan
          </Link>
        </div>

        {/* Right Badges & Quota */}
        <div className="flex items-center gap-3">
          {/* Quota Badge */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-obsidian-800/80 border border-obsidian-700 text-xs text-obsidian-300">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Kuota:</span>
            <span className="font-mono font-semibold text-white">2 Sesi Gratis</span>
          </div>

          {/* Reset button if inside studio */}
          {(isLive || isReport) && (
            <button
              onClick={resetSession}
              title="Reset Sesi Wawancara"
              className="p-2 rounded-lg bg-obsidian-800 hover:bg-obsidian-700 text-obsidian-400 hover:text-white border border-obsidian-700 transition"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}

          {/* Vercel Ready Badge */}
          <div className="hidden lg:flex items-center gap-1.5 text-[11px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-md">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            Vercel Ready
          </div>
        </div>
      </div>
    </header>
  );
};
