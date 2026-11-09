'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Send,
  Flag,
  RotateCcw,
  Sparkles,
  HelpCircle,
  Play,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { useInterview } from '@/lib/interviewStore';
import { AudioOrb } from '@/components/live/AudioOrb';
import { StarIndicator } from '@/components/live/StarIndicator';
import { CopilotDrawer } from '@/components/live/CopilotDrawer';
import { VocalTracker } from '@/components/live/VocalTracker';
import { detectStarFlags } from '@/lib/starDetector';
import { countFillerWords, calculateWpm } from '@/lib/vocalAnalytics';
import { generateFollowupProbe } from '@/lib/aiAnalysisEngine';

export default function LiveStudioPage() {
  const router = useRouter();
  const { session, completeInterviewTurn, finalizeSession } = useInterview();

  // Current turn state
  const [currentTurnIdx, setCurrentTurnIdx] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [isAiSpeaking, setIsAiSpeaking] = useState(false);
  const [ttsEnabled, setTtsEnabled] = useState(true);
  const [liveTranscript, setLiveTranscript] = useState('');
  const [elapsedSec, setElapsedSec] = useState(0);

  // Turn Questions
  const questionsList = [
    {
      speaker: session.primaryPersona.name,
      role: session.primaryPersona.role,
      type: 'Pertanyaan Utama #1',
      isProbing: false,
      text: `Halo ${session.cv.candidateName}! Senang bisa berdiskusi hari ini untuk posisi ${session.targetPosition}. Boleh ceritakan tentang diri Anda dan inisiatif kepemimpinan terbesar Anda yang berdampak signifikan pada metrik produk?`,
    },
    {
      speaker: session.interviewMode === 'panel_dual' && session.secondaryPersona ? session.secondaryPersona.name : session.primaryPersona.name,
      role: session.interviewMode === 'panel_dual' && session.secondaryPersona ? session.secondaryPersona.role : session.primaryPersona.role,
      type: 'Pertanyaan Lanjutan (Probing #2)',
      isProbing: true,
      text: `Menarik sekali. Dalam proyek 1-Click Checkout tersebut, bagaimana Anda mengatasi trade-off ketika tim engineering meminta penundaan rilis karena technical debt, sementara target bisnis menuntut rilis cepat?`,
    },
    {
      speaker: session.primaryPersona.name,
      role: session.primaryPersona.role,
      type: session.includeSalaryRound ? 'Babak Negosiasi Gaji (Salary Round)' : 'Pertanyaan Penutup & Komitmen',
      isProbing: false,
      text: session.includeSalaryRound
        ? `Bagus sekali. Kami sangat terkesan dengan rekam jejak Anda. Namun untuk posisi ini, rentang anggaran kami berada di Rp 16-18 Juta. Bagaimana pandangan Anda, dan berapa kompensasi yang Anda harapkan?`
        : `Terakhir, apa yang membuat Anda yakin bahwa budaya kerja ${session.culturePreset.toUpperCase()} di perusahaan kami adalah tempat terbaik untuk pertumbuhan karier jangka panjang Anda?`,
    },
  ];

  const activeQuestion = questionsList[Math.min(currentTurnIdx, questionsList.length - 1)];

  // Derived real-time metrics
  const starFlags = detectStarFlags(liveTranscript);
  const fillerData = countFillerWords(liveTranscript);
  const liveWpm = calculateWpm(liveTranscript, elapsedSec);

  // Speech Recognition ref
  const recognitionRef = useRef<any>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Initial speech synthesis when turn starts
  useEffect(() => {
    if (ttsEnabled && typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(activeQuestion.text);
      utterance.lang = session.languageCode === 'en' ? 'en-US' : 'id-ID';
      utterance.rate = 1.0;

      utterance.onstart = () => setIsAiSpeaking(true);
      utterance.onend = () => setIsAiSpeaking(false);
      utterance.onerror = () => setIsAiSpeaking(false);

      window.speechSynthesis.speak(utterance);
    } else {
      setIsAiSpeaking(false);
    }

    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [currentTurnIdx, ttsEnabled]);

  // Timer counter
  useEffect(() => {
    if (isRecording) {
      timerRef.current = setInterval(() => {
        setElapsedSec((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRecording]);

  // Web Speech Recognition
  const toggleRecording = () => {
    if (isRecording) {
      // Stop recording
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsRecording(false);
    } else {
      // Start recording
      setLiveTranscript('');
      setElapsedSec(0);

      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = session.languageCode === 'en' ? 'en-US' : 'id-ID';

        recognition.onresult = (event: any) => {
          let fullText = '';
          for (let i = 0; i < event.results.length; i++) {
            fullText += event.results[i][0].transcript + ' ';
          }
          setLiveTranscript(fullText.trim());
        };

        recognition.onerror = (err: any) => {
          console.warn('Speech recognition error:', err);
        };

        recognition.onend = () => {
          setIsRecording(false);
        };

        recognitionRef.current = recognition;
        recognition.start();
        setIsRecording(true);
      } else {
        // Fallback for browsers without Web Speech API
        setIsRecording(true);
      }
    }
  };

  // Submit Answer & Move to Next Turn
  const handleCommitTurn = () => {
    if (isRecording && recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsRecording(false);

    const answerToRecord =
      liveTranscript.trim() ||
      'Waktu itu di kantor saya menginisiasi proyek alur checkout baru bersama tim engineering. Kami sempat menghadapi tantangan drop-off tinggi, namun setelah dieksekusi selama 3 bulan, hasilnya berhasil menaikkan transaksi sebesar 10.5%.';

    completeInterviewTurn(answerToRecord, Math.max(elapsedSec, 25));

    if (currentTurnIdx < questionsList.length - 1) {
      setCurrentTurnIdx((prev) => prev + 1);
      setLiveTranscript('');
      setElapsedSec(0);
    } else {
      finalizeSession();
      router.push('/studio/report');
    }
  };

  // End and Score immediately
  const handleFinishEarly = () => {
    if (isRecording && recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsRecording(false);

    if (liveTranscript.trim()) {
      completeInterviewTurn(liveTranscript.trim(), Math.max(elapsedSec, 20));
    }
    finalizeSession();
    router.push('/studio/report');
  };

  // Fast Simulation helper for quick testing
  const handleInsertSampleAnswer = () => {
    const sample =
      'Waktu itu di PT Kreasi Fintech, saya melihat payment success rate kami [eee] tertahan di 78%. Tantangannya adalah drop-off tinggi pada metode kartu. Saya kemudian menginisiasi perancangan 1-Click Checkout, memimpin 5 engineer dalam sprint scrum, dan hasilnya [kayak] berhasil menaikkan success rate menjadi 88.5% serta memangkas drop-off 14%.';
    setLiveTranscript(sample);
    setElapsedSec(45);
  };

  return (
    <div className="flex-1 flex flex-col max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-5">
      {/* Top HUD Bar */}
      <div className="glass-panel rounded-2xl px-5 py-3 border border-obsidian-700 flex flex-wrap items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className={`w-3 h-3 rounded-full ${isRecording ? 'bg-rose-500 animate-ping' : 'bg-emerald-400'}`}></span>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-white">
              {isRecording ? 'REC ● SEDANG BICARA' : 'STANDBY'}
            </span>
          </div>

          <div className="h-4 w-px bg-obsidian-700 hidden sm:block"></div>

          <span className="text-xs text-obsidian-300 font-medium">
            Posisi: <span className="text-white font-semibold">{session.targetPosition}</span>
          </span>

          <span className="text-xs px-2 py-0.5 rounded bg-electric-violet/10 text-electric-violet border border-electric-violet/20 font-mono hidden md:inline">
            Giliran {currentTurnIdx + 1} dari {questionsList.length}
          </span>
        </div>

        {/* Live Vocal Metrics (WPM + Gumaman + Timer) */}
        <VocalTracker
          wpm={liveWpm}
          fillerWords={fillerData.occurrences}
          totalFiller={fillerData.total}
          durationSec={elapsedSec}
        />
      </div>

      {/* Main Split-Screen Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch flex-1">
        {/* KOLOM KIRI: Area Visual Pewawancara AI (5-6 Kolom) */}
        <div className="lg:col-span-6 glass-panel rounded-2xl p-6 border border-obsidian-700 flex flex-col justify-between relative overflow-hidden">
          {/* Header Card Pewawancara */}
          <div className="flex items-center justify-between border-b border-obsidian-700/80 pb-3">
            <div className="flex items-center gap-3">
              <span className="text-3xl p-1 bg-obsidian-800 rounded-xl border border-obsidian-700">
                {session.primaryPersona.avatar}
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-white font-heading">
                    {activeQuestion.speaker}
                  </h3>
                  {activeQuestion.isProbing && (
                    <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30">
                      ⚡ Probing Follow-Up
                    </span>
                  )}
                </div>
                <p className="text-xs text-electric-teal">{activeQuestion.role}</p>
              </div>
            </div>

            <button
              onClick={() => setTtsEnabled(!ttsEnabled)}
              title={ttsEnabled ? 'Matikan Suara AI' : 'Nyalakan Suara AI'}
              className="p-2 rounded-lg bg-obsidian-850 hover:bg-obsidian-800 border border-obsidian-700 text-obsidian-300 transition"
            >
              {ttsEnabled ? <Volume2 className="w-4 h-4 text-electric-teal" /> : <VolumeX className="w-4 h-4 text-obsidian-400" />}
            </button>
          </div>

          {/* Center 3D Reactive Audio Orb */}
          <div className="my-auto py-4">
            <AudioOrb
              isAiSpeaking={isAiSpeaking}
              isUserSpeaking={isRecording}
            />
          </div>

          {/* Current Question Bubble */}
          <div className="p-4 rounded-xl bg-obsidian-850/90 border border-obsidian-700 shadow-inner">
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-obsidian-400 mb-1.5 uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-electric-violet"></span>
              {activeQuestion.type}
            </div>
            <p className="text-sm sm:text-base text-slate-100 font-sans leading-relaxed font-medium">
              "{activeQuestion.text}"
            </p>
          </div>
        </div>

        {/* KOLOM KANAN: Panel Kendali & Copilot Kandidat (6 Kolom) */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          {/* 1. Indikator STAR Real-Time */}
          <StarIndicator flags={starFlags} isSpeaking={isRecording} />

          {/* 2. Smart Copilot Teleprompter */}
          <CopilotDrawer
            enabled={session.copilotEnabled}
            hints={[
              'Sebutkan proyek 1-Click Checkout di PT Kreasi Fintech',
              'Tekankan kenaikan payment success rate 78% -> 88.5%',
              'Jelaskan koordinasi squad lintas fungsi (7 tim teknis)',
            ]}
          />

          {/* 3. Transkrip Langsung Kamu */}
          <div className="glass-panel p-4 rounded-2xl border border-obsidian-700 flex-1 flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-obsidian-300 flex items-center gap-1.5">
                <Mic className="w-3.5 h-3.5 text-electric-teal" /> Transkrip Suara Kamu
              </span>
              <button
                type="button"
                onClick={handleInsertSampleAnswer}
                className="text-[11px] text-electric-teal hover:underline font-mono"
              >
                + Simulasi Jawaban Kandidat
              </button>
            </div>

            <div className="p-3 bg-obsidian-850 rounded-xl border border-obsidian-700 flex-1 min-h-[110px] max-h-[160px] overflow-y-auto text-xs sm:text-sm leading-relaxed text-slate-200">
              {liveTranscript ? (
                <span>
                  {liveTranscript}
                </span>
              ) : (
                <span className="text-obsidian-400 italic">
                  {isRecording
                    ? 'Mulai berbicara di mikrofon... Teks transkrip dan lampu STAR akan menyala otomatis.'
                    : 'Tekan tombol "Mulai Bicara" atau tahan spasi untuk menjawab pertanyaan pewawancara.'}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Sticky Action Bar */}
      <div className="glass-panel rounded-2xl p-4 border border-obsidian-700 mt-5 flex flex-wrap items-center justify-between gap-4">
        {/* Mic Control */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleRecording}
            className={`px-5 py-3 rounded-xl font-heading font-bold text-xs sm:text-sm flex items-center gap-2.5 shadow-lg transition-all ${
              isRecording
                ? 'bg-rose-500 text-white shadow-rose-500/25 animate-pulse'
                : 'bg-gradient-to-r from-electric-teal to-emerald-500 text-obsidian-950 shadow-electric-teal/20 hover:scale-105'
            }`}
          >
            {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            <span>{isRecording ? 'Selesai Bicara (Stop Mic)' : 'Mulai Bicara (Mikrofon)'}</span>
          </button>

          <span className="text-xs text-obsidian-400 hidden sm:inline">
            Status: {isRecording ? 'Mikrofon Aktif 🎙️' : 'Mikrofon Siaga'}
          </span>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={handleCommitTurn}
            className="px-5 py-3 rounded-xl bg-electric-violet hover:bg-electric-violet-hover text-white font-heading font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-electric-violet/20 hover:scale-[1.02] transition"
          >
            <span>{currentTurnIdx < questionsList.length - 1 ? 'Kirim Jawaban & Lanjut' : 'Kirim & Selesai'}</span>
            <Send className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleFinishEarly}
            className="px-4 py-3 rounded-xl bg-obsidian-800 hover:bg-obsidian-700 border border-obsidian-700 text-xs text-obsidian-300 hover:text-white font-medium transition"
          >
            Akhiri & Nilai Sesi
          </button>
        </div>
      </div>
    </div>
  );
}
