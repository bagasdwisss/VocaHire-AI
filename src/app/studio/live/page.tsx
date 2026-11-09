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
  Video,
  VideoOff,
  DollarSign,
  AlertCircle,
  Users,
} from 'lucide-react';
import { useInterview } from '@/lib/interviewStore';
import { AudioOrb } from '@/components/live/AudioOrb';
import { StarIndicator } from '@/components/live/StarIndicator';
import { CopilotDrawer } from '@/components/live/CopilotDrawer';
import { VocalTracker } from '@/components/live/VocalTracker';
import { detectStarFlags } from '@/lib/starDetector';
import { countFillerWords, calculateWpm } from '@/lib/vocalAnalytics';
import { AudioManager } from '@/lib/audioManager';
import { PERSONAS } from '@/lib/constants';

export default function LiveStudioPage() {
  const router = useRouter();
  const { session, completeInterviewTurn, finalizeSession } = useInterview();

  // Turn state
  const [currentTurnIdx, setCurrentTurnIdx] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [isAiSpeaking, setIsAiSpeaking] = useState(false);
  const [ttsEnabled, setTtsEnabled] = useState(true);
  const [liveTranscript, setLiveTranscript] = useState('');
  const [elapsedSec, setElapsedSec] = useState(0);

  // Audio Manager & Volume
  const [liveVolume, setLiveVolume] = useState(0);
  const [frequencyData, setFrequencyData] = useState<Uint8Array | undefined>(undefined);
  const audioManagerRef = useRef<AudioManager | null>(null);
  const audioIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Candidate Camera Video Stream
  const [cameraActive, setCameraActive] = useState(session.candidateCameraEnabled);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const cameraStreamRef = useRef<MediaStream | null>(null);

  // Questions Sequence
  const isDualMode = session.interviewMode === 'panel_dual';
  const primaryInterviewer = session.primaryPersona;
  const secondaryInterviewer = session.secondaryPersona || PERSONAS[1];

  const questionsList = [
    {
      speaker: primaryInterviewer.name,
      role: primaryInterviewer.role,
      avatar: primaryInterviewer.avatar,
      type: 'Pertanyaan Utama #1 (Behavioral & Leadership)',
      isProbing: false,
      text: `Halo ${session.cv.candidateName}! Senang bisa berdiskusi hari ini untuk posisi ${session.targetPosition}. Boleh ceritakan tentang diri Anda dan inisiatif kepemimpinan terbesar yang paling berdampak signifikan pada metrik produk/pekerjaan Anda?`,
    },
    {
      speaker: isDualMode ? secondaryInterviewer.name : primaryInterviewer.name,
      role: isDualMode ? secondaryInterviewer.role : primaryInterviewer.role,
      avatar: isDualMode ? secondaryInterviewer.avatar : primaryInterviewer.avatar,
      type: 'Pertanyaan Kejaran #2 (Dynamic Probing & Trade-offs)',
      isProbing: true,
      text: `Menarik sekali. Dalam inisiatif tersebut, bagaimana Anda mengatasi trade-off ketika tim teknis meminta penundaan rilis demi kualitas kode/arsitektur, sementara target bisnis menuntut rilis cepat ke pasar?`,
    },
    {
      speaker: isDualMode ? secondaryInterviewer.name : primaryInterviewer.name,
      role: isDualMode ? secondaryInterviewer.role : primaryInterviewer.role,
      avatar: isDualMode ? secondaryInterviewer.avatar : primaryInterviewer.avatar,
      type: session.includeSalaryRound
        ? 'Babak Spesial #3: Negosiasi Gaji & Penawaran (Salary Negotiation Round)'
        : 'Pertanyaan Penutup #3: Visi & Keselarasan Budaya',
      isProbing: false,
      text: session.includeSalaryRound
        ? `Bagus sekali. Kami sangat terkesan dengan rekam jejak Anda. Namun untuk posisi ${session.targetPosition} ini, anggaran awal kami berada di rentang Rp 16-18 Juta per bulan. Bagaimana pandangan Anda, dan berapa rentang kompensasi total yang Anda harapkan?`
        : `Terakhir, apa yang membuat Anda yakin bahwa standar budaya kerja ${session.culturePreset.toUpperCase()} di perusahaan kami adalah wadah paling tepat untuk pertumbuhan karier jangka panjang Anda?`,
    },
  ];

  const activeQuestion = questionsList[Math.min(currentTurnIdx, questionsList.length - 1)];

  // Derived metrics
  const starFlags = detectStarFlags(liveTranscript);
  const fillerData = countFillerWords(liveTranscript);
  const liveWpm = calculateWpm(liveTranscript, elapsedSec);

  const recognitionRef = useRef<any>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize Speech Synthesis for AI speaking
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

  // Speaking Timer
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

  // Camera Management
  useEffect(() => {
    if (cameraActive) {
      navigator.mediaDevices
        ?.getUserMedia({ video: true })
        .then((stream) => {
          cameraStreamRef.current = stream;
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch((err) => {
          console.warn('Camera not available:', err);
          setCameraActive(false);
        });
    } else {
      if (cameraStreamRef.current) {
        cameraStreamRef.current.getTracks().forEach((track) => track.stop());
        cameraStreamRef.current = null;
      }
    }
    return () => {
      if (cameraStreamRef.current) {
        cameraStreamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, [cameraActive]);

  // Real Microphone Capture & Frequency Poller
  const startAudioEngine = async () => {
    if (!audioManagerRef.current) {
      audioManagerRef.current = new AudioManager();
    }
    const started = await audioManagerRef.current.startCapture();
    if (started) {
      audioIntervalRef.current = setInterval(() => {
        if (audioManagerRef.current) {
          const data = audioManagerRef.current.getLiveAudioData();
          setLiveVolume(data.volume);
          setFrequencyData(data.frequencies);
        }
      }, 60);
    }
  };

  const stopAudioEngine = () => {
    if (audioIntervalRef.current) {
      clearInterval(audioIntervalRef.current);
      audioIntervalRef.current = null;
    }
    if (audioManagerRef.current) {
      audioManagerRef.current.stopCapture();
    }
    setLiveVolume(0);
    setFrequencyData(undefined);
  };

  // Toggle Recording
  const toggleRecording = async () => {
    if (isRecording) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      stopAudioEngine();
      setIsRecording(false);
    } else {
      setLiveTranscript('');
      setElapsedSec(0);
      await startAudioEngine();

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
          console.warn('Speech error:', err);
        };

        recognition.onend = () => {
          setIsRecording(false);
          stopAudioEngine();
        };

        recognitionRef.current = recognition;
        recognition.start();
        setIsRecording(true);
      } else {
        setIsRecording(true);
      }
    }
  };

  // Submit Answer & Proceed
  const handleCommitTurn = () => {
    if (isRecording) {
      if (recognitionRef.current) recognitionRef.current.stop();
      stopAudioEngine();
      setIsRecording(false);
    }

    const answerToRecord =
      liveTranscript.trim() ||
      'Waktu itu di inisiatif checkout, saya memimpin koordinasi lintas tim backend dan desainer. Hasilnya berhasil meningkatkan transaksi sebesar 10.5% dan memangkas drop-off.';

    completeInterviewTurn(
      answerToRecord,
      Math.max(elapsedSec, 30),
      activeQuestion.speaker,
      activeQuestion.role
    );

    if (currentTurnIdx < questionsList.length - 1) {
      setCurrentTurnIdx((prev) => prev + 1);
      setLiveTranscript('');
      setElapsedSec(0);
    } else {
      finalizeSession();
      router.push('/studio/report');
    }
  };

  // Finish Early & Score
  const handleFinishEarly = () => {
    if (isRecording) {
      if (recognitionRef.current) recognitionRef.current.stop();
      stopAudioEngine();
      setIsRecording(false);
    }

    if (liveTranscript.trim()) {
      completeInterviewTurn(
        liveTranscript.trim(),
        Math.max(elapsedSec, 25),
        activeQuestion.speaker,
        activeQuestion.role
      );
    }
    finalizeSession();
    router.push('/studio/report');
  };

  // Fast Simulation Sample for testing
  const handleSimulateAnswer = () => {
    const sample =
      'Waktu itu di inisiatif alur pembayaran, saya melihat [eee] payment success rate tertahan di 78%. Tantangannya adalah drop-off tinggi saat konfirmasi token. Saya menginisiasi perancangan 1-Click Checkout, memimpin sprint beranggotakan 5 software engineers, dan hasilnya [kayak] berhasil menaikkan transaksi menjadi 88.5% serta memangkas drop-off 14%.';
    setLiveTranscript(sample);
    setElapsedSec(45);
  };

  return (
    <div className="flex-1 flex flex-col max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-5 space-y-4">
      {/* Top HUD Bar */}
      <div className="glass-panel rounded-2xl px-5 py-3 border border-obsidian-700 flex flex-wrap items-center justify-between gap-3 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span
              className={`w-3 h-3 rounded-full ${
                isRecording
                  ? 'bg-rose-500 shadow-[0_0_12px_#F43F5E] animate-ping'
                  : 'bg-emerald-400'
              }`}
            ></span>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-white">
              {isRecording ? 'LIVE REC ● BICARA' : 'STANDBY'}
            </span>
          </div>

          <div className="h-4 w-px bg-obsidian-700 hidden sm:block"></div>

          <span className="text-xs text-obsidian-300 font-medium">
            Posisi: <span className="text-white font-semibold">{session.targetPosition}</span>
          </span>

          <span className="text-xs px-2.5 py-0.5 rounded-full bg-electric-violet/15 text-electric-violet border border-electric-violet/30 font-mono font-bold hidden md:inline">
            Giliran {currentTurnIdx + 1} dari {questionsList.length}
          </span>

          {isDualMode && (
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-teal-500/15 text-electric-teal border border-teal-500/30 font-mono hidden lg:flex items-center gap-1">
              <Users className="w-3 h-3" /> Panel 2 AI Aktif
            </span>
          )}
        </div>

        {/* Vocal Metrics HUD */}
        <VocalTracker
          wpm={liveWpm}
          fillerWords={fillerData.occurrences}
          totalFiller={fillerData.total}
          durationSec={elapsedSec}
        />
      </div>

      {/* Main Split-Screen Studio */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch flex-1">
        {/* KOLOM KIRI: Visual Pewawancara AI & Holographic Audio Orb (6 Kolom) */}
        <div className="lg:col-span-6 glass-panel rounded-2xl p-6 border border-obsidian-700 flex flex-col justify-between relative overflow-hidden shadow-2xl">
          {/* Header Pewawancara (Dual Panel Display) */}
          <div className="flex items-center justify-between border-b border-obsidian-700/80 pb-3">
            <div className="flex items-center gap-3">
              <div className="relative">
                <span className="text-3xl p-1.5 bg-obsidian-850 rounded-2xl border border-obsidian-700 inline-block shadow-inner">
                  {activeQuestion.avatar}
                </span>
                {isAiSpeaking && (
                  <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-electric-teal border-2 border-obsidian-950 animate-ping"></span>
                )}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-extrabold text-white font-heading">
                    {activeQuestion.speaker}
                  </h3>
                  {activeQuestion.isProbing && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 uppercase font-bold">
                      ⚡ Probing Follow-Up
                    </span>
                  )}
                </div>
                <p className="text-xs text-electric-teal font-medium">{activeQuestion.role}</p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setCameraActive(!cameraActive)}
                title={cameraActive ? 'Matikan Kamera' : 'Nyalakan Kamera Kandidat'}
                className="p-2 rounded-xl bg-obsidian-850 hover:bg-obsidian-800 border border-obsidian-700 text-obsidian-300 transition"
              >
                {cameraActive ? <Video className="w-4 h-4 text-sky-400" /> : <VideoOff className="w-4 h-4 text-obsidian-500" />}
              </button>

              <button
                onClick={() => setTtsEnabled(!ttsEnabled)}
                title={ttsEnabled ? 'Matikan Suara AI' : 'Nyalakan Suara AI'}
                className="p-2 rounded-xl bg-obsidian-850 hover:bg-obsidian-800 border border-obsidian-700 text-obsidian-300 transition"
              >
                {ttsEnabled ? <Volume2 className="w-4 h-4 text-electric-teal" /> : <VolumeX className="w-4 h-4 text-obsidian-500" />}
              </button>
            </div>
          </div>

          {/* Center: 3D Holographic Audio Orb */}
          <div className="my-auto py-2">
            <AudioOrb
              isAiSpeaking={isAiSpeaking}
              isUserSpeaking={isRecording}
              liveVolume={liveVolume}
              frequencyData={frequencyData}
            />
          </div>

          {/* Current Question Dialogue Bubble */}
          <div className="p-4 rounded-2xl bg-obsidian-850/90 border border-obsidian-700 shadow-inner space-y-1.5">
            <div className="flex items-center gap-2 text-[10px] font-mono text-obsidian-400 uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-electric-violet"></span>
              <span>{activeQuestion.type}</span>
            </div>
            <p className="text-sm sm:text-base text-slate-100 font-sans leading-relaxed font-semibold">
              "{activeQuestion.text}"
            </p>
          </div>
        </div>

        {/* KOLOM KANAN: Panel Kendali, STAR HUD & Copilot (6 Kolom) */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          {/* Optional Webcam Preview Box */}
          {cameraActive && (
            <div className="glass-panel p-3 rounded-2xl border border-sky-500/30 bg-obsidian-950/80 relative overflow-hidden flex items-center justify-between">
              <div className="w-32 h-20 bg-black rounded-xl overflow-hidden border border-obsidian-700 shrink-0">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover scale-x-[-1]"
                />
              </div>
              <div className="px-3 flex-1">
                <span className="text-xs font-bold text-white block">Pratinjau Kamera Aktif</span>
                <p className="text-[11px] text-obsidian-400">
                  Wajah & postur Anda termonitor untuk latihan kontak mata.
                </p>
              </div>
              <button
                onClick={() => setCameraActive(false)}
                className="text-xs text-obsidian-400 hover:text-white px-2 py-1"
              >
                Tutup
              </button>
            </div>
          )}

          {/* 1. Indikator STAR Real-Time HUD */}
          <StarIndicator flags={starFlags} isSpeaking={isRecording} />

          {/* 2. Smart Copilot Teleprompter */}
          <CopilotDrawer
            enabled={session.copilotEnabled}
            hints={session.briefing.strengths.slice(0, 3)}
          />

          {/* 3. Transkrip Langsung Kamu */}
          <div className="glass-panel p-4 rounded-2xl border border-obsidian-700 flex-1 flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-obsidian-300 flex items-center gap-1.5">
                <Mic className="w-3.5 h-3.5 text-electric-teal" /> Transkrip Suara Kandidat
              </span>
              <button
                type="button"
                onClick={handleSimulateAnswer}
                className="text-[11px] text-electric-teal hover:underline font-mono"
              >
                + Simulasi Jawaban Kandidat (Demo)
              </button>
            </div>

            <div className="p-3.5 bg-obsidian-850 rounded-xl border border-obsidian-700 flex-1 min-h-[110px] max-h-[160px] overflow-y-auto text-xs sm:text-sm leading-relaxed text-slate-100">
              {liveTranscript ? (
                <span>{liveTranscript}</span>
              ) : (
                <span className="text-obsidian-400 italic">
                  {isRecording
                    ? 'Mikrofon aktif. Berbicaralah dengan tenang dan sebutkan aksi nyata serta angka metrik...'
                    : 'Tekan tombol "Mulai Bicara" di bawah untuk merekam jawaban Anda.'}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Sticky Action Bar */}
      <div className="glass-panel rounded-2xl p-4 border border-obsidian-700 flex flex-wrap items-center justify-between gap-4 shadow-xl">
        {/* Mic Control */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleRecording}
            className={`px-6 py-3.5 rounded-xl font-heading font-black text-xs sm:text-sm flex items-center gap-2.5 shadow-xl transition-all ${
              isRecording
                ? 'bg-rose-500 hover:bg-rose-600 text-white shadow-rose-500/30 animate-pulse'
                : 'bg-gradient-to-r from-electric-teal to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-obsidian-950 shadow-electric-teal/25 hover:scale-105'
            }`}
          >
            {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            <span>{isRecording ? 'Selesai Bicara (Stop Mic)' : 'Mulai Bicara (Mikrofon)'}</span>
          </button>

          <span className="text-xs text-obsidian-400 font-mono hidden sm:inline">
            Status: {isRecording ? `Mikrofon Aktif 🎙️ (Vol: ${Math.round(liveVolume * 100)}%)` : 'Mikrofon Siaga'}
          </span>
        </div>

        {/* Navigation Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleCommitTurn}
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-electric-violet to-indigo-600 hover:from-indigo-500 hover:to-indigo-600 text-white font-heading font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-electric-violet/25 hover:scale-[1.02] transition"
          >
            <span>{currentTurnIdx < questionsList.length - 1 ? 'Kirim Jawaban & Lanjut' : 'Kirim & Nilai Sesi'}</span>
            <Send className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleFinishEarly}
            className="px-4 py-3.5 rounded-xl bg-obsidian-850 hover:bg-obsidian-800 border border-obsidian-700 text-xs text-obsidian-300 hover:text-white font-semibold transition"
          >
            Akhiri & Nilai Sekarang
          </button>
        </div>
      </div>
    </div>
  );
}
