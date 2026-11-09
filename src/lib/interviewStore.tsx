'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  InterviewSession,
  CandidateCV,
  CulturePreset,
  LanguageCode,
  InterviewMode,
  Persona,
  SessionTurn,
  RadarMetrics,
  TargetRolePreset,
} from '@/types/interview';
import {
  PERSONAS,
  ROLE_PRESETS,
} from './constants';
import { generatePreInterviewBriefing, evaluateTurn } from './aiAnalysisEngine';
import { calculateDeliveryScore, calculateOverallScore } from './scoring';

interface InterviewContextType {
  session: InterviewSession;
  selectRolePreset: (presetKey: TargetRolePreset) => void;
  updatePosition: (pos: string) => void;
  updateIndustry: (ind: string) => void;
  updateJobDescription: (jd: string) => void;
  updateCv: (cv: CandidateCV) => void;
  updateCulture: (c: CulturePreset) => void;
  updateLanguage: (l: LanguageCode) => void;
  updateMode: (m: InterviewMode) => void;
  updatePrimaryPersona: (p: Persona) => void;
  toggleCopilot: () => void;
  toggleSalaryRound: () => void;
  toggleCandidateCamera: () => void;
  startInterview: () => void;
  completeInterviewTurn: (
    userTranscript: string,
    durationSec: number,
    speakerName?: string,
    speakerRole?: string
  ) => void;
  finalizeSession: () => void;
  resetSession: () => void;
}

const initialPreset = ROLE_PRESETS.pm;

const defaultSession: InterviewSession = {
  id: 'session-default',
  rolePreset: 'pm',
  targetPosition: initialPreset.title,
  industry: initialPreset.industry,
  jobDescription: initialPreset.jobDescription,
  culturePreset: 'startup',
  languageCode: 'id',
  interviewMode: 'single',
  primaryPersona: PERSONAS[0],
  secondaryPersona: PERSONAS[1],
  copilotEnabled: true,
  includeSalaryRound: true,
  candidateCameraEnabled: false,
  cv: initialPreset.cv,
  briefing: generatePreInterviewBriefing(
    initialPreset.cv,
    initialPreset.jobDescription,
    initialPreset.title,
    'pm'
  ),
  status: 'setup',
  turns: [],
  overallScore: 0,
  radarMetrics: {
    star: 0,
    impact: 0,
    relevance: 0,
    delivery: 0,
    conciseness: 0,
  },
  avgWpm: 0,
  totalFillerWords: 0,
  durationSeconds: 0,
  createdAt: new Date().toISOString(),
};

const InterviewContext = createContext<InterviewContextType | null>(null);

export const InterviewProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<InterviewSession>(defaultSession);

  const selectRolePreset = (presetKey: TargetRolePreset) => {
    const preset = ROLE_PRESETS[presetKey] || ROLE_PRESETS.pm;
    const briefing = generatePreInterviewBriefing(
      preset.cv,
      preset.jobDescription,
      preset.title,
      presetKey
    );

    setSession((prev) => ({
      ...prev,
      rolePreset: presetKey,
      targetPosition: preset.title,
      industry: preset.industry,
      jobDescription: preset.jobDescription,
      cv: preset.cv,
      briefing,
    }));
  };

  const updatePosition = (targetPosition: string) => {
    setSession((prev) => ({ ...prev, targetPosition }));
  };

  const updateIndustry = (industry: string) => {
    setSession((prev) => ({ ...prev, industry }));
  };

  const updateJobDescription = (jobDescription: string) => {
    setSession((prev) => {
      const briefing = generatePreInterviewBriefing(
        prev.cv,
        jobDescription,
        prev.targetPosition,
        prev.rolePreset
      );
      return { ...prev, jobDescription, briefing };
    });
  };

  const updateCv = (cv: CandidateCV) => {
    setSession((prev) => {
      const briefing = generatePreInterviewBriefing(
        cv,
        prev.jobDescription,
        prev.targetPosition,
        prev.rolePreset
      );
      return { ...prev, cv, briefing };
    });
  };

  const updateCulture = (culturePreset: CulturePreset) => {
    setSession((prev) => ({ ...prev, culturePreset }));
  };

  const updateLanguage = (languageCode: LanguageCode) => {
    setSession((prev) => ({ ...prev, languageCode }));
  };

  const updateMode = (interviewMode: InterviewMode) => {
    setSession((prev) => ({ ...prev, interviewMode }));
  };

  const updatePrimaryPersona = (primaryPersona: Persona) => {
    setSession((prev) => ({ ...prev, primaryPersona }));
  };

  const toggleCopilot = () => {
    setSession((prev) => ({ ...prev, copilotEnabled: !prev.copilotEnabled }));
  };

  const toggleSalaryRound = () => {
    setSession((prev) => ({ ...prev, includeSalaryRound: !prev.includeSalaryRound }));
  };

  const toggleCandidateCamera = () => {
    setSession((prev) => ({ ...prev, candidateCameraEnabled: !prev.candidateCameraEnabled }));
  };

  const startInterview = () => {
    setSession((prev) => ({
      ...prev,
      id: `vh-${Date.now().toString(36).toUpperCase()}`,
      status: 'live',
      turns: [],
      durationSeconds: 0,
    }));
  };

  const completeInterviewTurn = (
    userTranscript: string,
    durationSec: number,
    speakerName?: string,
    speakerRole?: string
  ) => {
    setSession((prev) => {
      const turnNumber = prev.turns.length + 1;
      const question =
        turnNumber === 1
          ? `Halo ${prev.cv.candidateName}! Senang bisa berdiskusi hari ini. Boleh ceritakan tentang diri Anda dan inisiatif kepemimpinan terbesar Anda yang berdampak signifikan pada metrik produk?`
          : turnNumber === 2
          ? 'Bagaimana cara Anda memprioritaskan fitur saat ada pertentangan keras antara tim engineering (soal technical debt) dan target agresif sales?'
          : 'Berapa ekspektasi kompensasi finansial Anda untuk posisi ini, dan apa dasar nilai yang Anda tawarkan ke perusahaan?';

      const copilotHints = prev.cv.careerHighlights.length >= 3
        ? prev.cv.careerHighlights
        : [
            'Sebutkan proyek kepemimpinan terbesar Anda di CV',
            'Tekankan metrik peningkatan persentase terukur',
            'Jelaskan cara kolaborasi lintas divisi',
          ];

      const newTurn: SessionTurn = evaluateTurn(
        turnNumber,
        question,
        userTranscript,
        durationSec,
        copilotHints,
        speakerName || prev.primaryPersona.name,
        speakerRole || prev.primaryPersona.role
      );

      return {
        ...prev,
        turns: [...prev.turns, newTurn],
      };
    });
  };

  const finalizeSession = () => {
    setSession((prev) => {
      if (prev.turns.length === 0) {
        const mockTurn = evaluateTurn(
          1,
          'Ceritakan tentang pengalaman Anda memimpin proyek kritis di bawah tekanan.',
          'Waktu itu di perusahaan sebelumnya saya memimpin perbaikan alur checkout selama 3 minggu, hasilnya berhasil meningkatkan transaksi.',
          40,
          prev.cv.careerHighlights,
          prev.primaryPersona.name,
          prev.primaryPersona.role
        );
        prev.turns = [mockTurn];
      }

      let totalFiller = 0;
      let totalWpm = 0;
      let totalStarScore = 0;

      prev.turns.forEach((t) => {
        totalFiller += t.fillerWords.reduce((sum, f) => sum + f.count, 0);
        totalWpm += t.wpmRate;
        totalStarScore += t.originalScore;
      });

      const avgWpm = Math.round(totalWpm / Math.max(1, prev.turns.length));
      const avgStar = Number((totalStarScore / Math.max(1, prev.turns.length)).toFixed(1));

      const totalWords = prev.turns.reduce(
        (sum, t) => sum + t.candidateRawAnswer.split(/\s+/).filter(Boolean).length,
        0
      );

      const deliveryScore = calculateDeliveryScore(totalFiller, totalWords, avgWpm);

      const radarMetrics: RadarMetrics = {
        star: avgStar || 8.6,
        impact: 8.4,
        relevance: 9.1,
        delivery: deliveryScore || 7.8,
        conciseness: 8.2,
      };

      const overallScore = calculateOverallScore(radarMetrics);

      return {
        ...prev,
        status: 'completed',
        overallScore,
        radarMetrics,
        avgWpm,
        totalFillerWords: totalFiller,
        durationSeconds: prev.turns.reduce((acc, t) => acc + t.durationSeconds, 0) || 160,
      };
    });
  };

  const resetSession = () => {
    setSession({
      ...defaultSession,
      id: `session-${Date.now()}`,
      status: 'setup',
      turns: [],
    });
  };

  return (
    <InterviewContext.Provider
      value={{
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
        startInterview,
        completeInterviewTurn,
        finalizeSession,
        resetSession,
      }}
    >
      {children}
    </InterviewContext.Provider>
  );
};

export const useInterview = () => {
  const context = useContext(InterviewContext);
  if (!context) {
    throw new Error('useInterview must be used within an InterviewProvider');
  }
  return context;
};
