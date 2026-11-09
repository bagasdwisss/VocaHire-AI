export type CulturePreset = 'startup' | 'bumn' | 'corporate' | 'scholarship';
export type InterviewMode = 'single' | 'panel_dual';
export type LanguageCode = 'id' | 'en' | 'ms' | 'ja' | 'ko' | 'de' | 'zh' | 'ar';

export interface Persona {
  id: string;
  name: string;
  role: string;
  avatar: string;
  tagline: string;
  voiceStyle: string;
  traits: string[];
}

export interface CandidateCV {
  id: string;
  fileName: string;
  rawText: string;
  candidateName: string;
  targetRole: string;
  experienceYears: number;
  keySkills: string[];
  careerHighlights: string[];
  potentialGaps: string[];
}

export interface PreInterviewBriefing {
  matchScore: number; // 0-100%
  summary: string;
  missingKeywords: string[];
  trapQuestions: {
    question: string;
    gapReason: string;
    suggestedStrategy: string;
  }[];
  strengths: string[];
}

export interface StarFlags {
  situation: boolean;
  task: boolean;
  action: boolean;
  result: boolean;
}

export interface FillerWordOccurrence {
  word: string;
  count: number;
}

export interface SessionTurn {
  id: string;
  turnNumber: number;
  speakerPersona: string;
  turnType: 'main_question' | 'followup_probe' | 'salary_negotiation';
  questionText: string;
  copilotHints: string[]; // 3 bullet points from CV
  candidateRawAnswer: string;
  durationSeconds: number;
  wpmRate: number;
  fillerWords: FillerWordOccurrence[];
  starFlags: StarFlags;
  originalScore: number;
  rewrittenStarAnswer: string;
  rewrittenScore: number;
  diffHighlights: {
    originalPassiveWords: string[];
    rewrittenActiveVerbs: string[];
    rewrittenMetrics: string[];
  };
  hrRationale: string;
}

export interface RadarMetrics {
  star: number;        // C_STAR (1-10)
  impact: number;      // C_impact (1-10)
  relevance: number;   // C_relevance (1-10)
  delivery: number;    // C_delivery (1-10)
  conciseness: number; // C_conciseness (1-10)
}

export interface InterviewSession {
  id: string;
  targetPosition: string;
  industry: string;
  jobDescription: string;
  culturePreset: CulturePreset;
  languageCode: LanguageCode;
  interviewMode: InterviewMode;
  primaryPersona: Persona;
  secondaryPersona?: Persona;
  copilotEnabled: boolean;
  includeSalaryRound: boolean;
  cv: CandidateCV;
  briefing: PreInterviewBriefing;
  status: 'setup' | 'live' | 'completed';
  turns: SessionTurn[];
  overallScore: number;
  radarMetrics: RadarMetrics;
  avgWpm: number;
  totalFillerWords: number;
  durationSeconds: number;
  createdAt: string;
}
