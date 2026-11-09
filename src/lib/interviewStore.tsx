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
} from '@/types/interview';
import {
  PERSONAS,
  SAMPLE_CANDIDATE_CV,
  SAMPLE_JOB_DESCRIPTION,
} from './constants';
import { generatePreInterviewBriefing, evaluateTurn } from './aiAnalysisEngine';
import { calculateDeliveryScore, calculateOverallScore } from './scoring';

interface InterviewContextType {
  session: InterviewSession;
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
  startInterview: () => void;
  completeInterviewTurn: (userTranscript: string, durationSec: number) => void;
  finalizeSession: () => void;
  resetSession: () => void;
}

const defaultSession: InterviewSession = {
  id: 'session-default',
  targetPosition: 'Product Manager',
  industry: 'Fintech & Digital Commerce',
  jobDescription: SAMPLE_JOB_DESCRIPTION,
  culturePreset: 'startup',
  languageCode: 'id',
  interviewMode: 'single',
  primaryPersona: PERSONAS[0],
  secondaryPersona: PERSONAS[1],
  copilotEnabled: true,
  includeSalaryRound: false,
  cv: SAMPLE_CANDIDATE_CV,
  briefing: generatePreInterviewBriefing(
    SAMPLE_CANDIDATE_CV,
    SAMPLE_JOB_DESCRIPTION,
    'Product Manager'
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

  // Recalculate briefing when CV or JD changes
  useEffect(() => {
    const updatedBriefing = generatePreInterviewBriefing(
      session.cv,
      session.jobDescription,
      session.targetPosition
    );
    setSession((prev) => ({ ...prev, briefing: updatedBriefing }));
  }, [session.cv, session.jobDescription, session.targetPosition]);

  const updatePosition = (targetPosition: string) => {
    setSession((prev) => ({ ...prev, targetPosition }));
  };

  const updateIndustry = (industry: string) => {
    setSession((prev) => ({ ...prev, industry }));
  };

  const updateJobDescription = (jobDescription: string) => {
    setSession((prev) => ({ ...prev, jobDescription }));
  };

  const updateCv = (cv: CandidateCV) => {
    setSession((prev) => ({ ...prev, cv }));
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

  const startInterview = () => {
    setSession((prev) => ({
      ...prev,
      id: `vh-session-${Date.now().toString(36).toUpperCase()}`,
      status: 'live',
      turns: [],
      durationSeconds: 0,
    }));
  };

  const completeInterviewTurn = (userTranscript: string, durationSec: number) => {
    setSession((prev) => {
      const turnNumber = prev.turns.length + 1;
      const question =
        turnNumber === 1
          ? 'Ceritakan tentang diri Anda dan inisiatif kepemimpinan terbesar Anda yang berdampak pada metrik produk.'
          : turnNumber === 2
          ? 'Bagaimana cara Anda memprioritaskan fitur saat ada perbedaan pendapat antara tim engineering dan target bisnis sales?'
          : 'Berapa ekspektasi kompensasi Anda untuk posisi ini, dan apa dasar nilai yang Anda bawa ke perusahaan?';

      const copilotHints = [
        'Sebutkan proyek 1-Click Checkout di PT Kreasi Fintech',
        'Tekankan kenaikan payment success rate 78% -> 88.5%',
        'Jelaskan koordinasi squad lintas fungsi (7 tim teknis)',
      ];

      const newTurn: SessionTurn = evaluateTurn(
        turnNumber,
        question,
        userTranscript,
        durationSec,
        copilotHints
      );

      const updatedTurns = [...prev.turns, newTurn];
      return {
        ...prev,
        turns: updatedTurns,
      };
    });
  };

  const finalizeSession = () => {
    setSession((prev) => {
      // Calculate overall statistics
      const totalTurns = prev.turns.length;
      if (totalTurns === 0) {
        // Mock a turn if user quickly tested
        const mockTurn = evaluateTurn(
          1,
          'Ceritakan tentang pengalaman Anda menangani proyek dengan tenggat waktu ketat.',
          'Waktu itu di kantor lama saya memimpin pembuatan fitur checkout dalam 3 minggu, hasilnya sukses.',
          45,
          ['Sebutkan nama perusahaan', 'Tekankan metrik keberhasilan', 'Jelaskan peran aktif Anda']
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
        star: avgStar || 8.5,
        impact: 8.0,
        relevance: 9.0,
        delivery: deliveryScore || 7.5,
        conciseness: 8.0,
      };

      const overallScore = calculateOverallScore(radarMetrics);

      return {
        ...prev,
        status: 'completed',
        overallScore,
        radarMetrics,
        avgWpm,
        totalFillerWords: totalFiller,
        durationSeconds: prev.turns.reduce((acc, t) => acc + t.durationSeconds, 0) || 180,
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
