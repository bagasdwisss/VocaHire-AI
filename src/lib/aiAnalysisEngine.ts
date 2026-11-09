import { CandidateCV, PreInterviewBriefing, StarFlags, SessionTurn, TargetRolePreset } from '@/types/interview';
import { countFillerWords, calculateWpm } from './vocalAnalytics';
import { detectStarFlags } from './starDetector';
import { ROLE_PRESETS } from './constants';

export function generatePreInterviewBriefing(
  cv: CandidateCV,
  jobDescription: string,
  targetPosition: string,
  rolePresetKey: TargetRolePreset = 'pm'
): PreInterviewBriefing {
  const jdLower = jobDescription.toLowerCase();
  const cvLower = cv.rawText.toLowerCase();

  const preset = ROLE_PRESETS[rolePresetKey] || ROLE_PRESETS.pm;
  const benchmarkKeywords = preset.benchmarkKeywords;

  const presentKeywords: string[] = [];
  const missingKeywords: { word: string; importance: 'high' | 'medium'; category: string }[] = [];

  benchmarkKeywords.forEach((kw, idx) => {
    if (cvLower.includes(kw.toLowerCase())) {
      presentKeywords.push(kw);
    } else {
      missingKeywords.push({
        word: kw,
        importance: idx < 3 ? 'high' : 'medium',
        category: idx % 2 === 0 ? 'Technical Core' : 'Methodology & Leadership',
      });
    }
  });

  // Kalkulasi Skor Terukur Multi-Dimensi
  const hardSkillScore = Math.min(95, Math.max(68, 65 + presentKeywords.length * 4));
  const experienceScore = cv.experienceYears >= 3 ? 90 : cv.experienceYears >= 2 ? 82 : 75;
  const cultureScore = 85;

  const matchScore = Math.round(
    hardSkillScore * 0.45 + experienceScore * 0.35 + cultureScore * 0.20
  );

  const trapQuestions = preset.defaultTrapQuestions;

  return {
    matchScore,
    hardSkillScore,
    experienceScore,
    cultureScore,
    summary: `Profil ${cv.candidateName} memiliki kecocokan teknis ${hardSkillScore}% dan rekam jejak pengalaman yang relevan (${experienceScore}%). Terdapat beberapa kata kunci teknis yang belum tertulis secara eksplisit, serta 3 pertanyaan jebakan yang wajib diantisipasi.`,
    missingKeywords: missingKeywords.slice(0, 5),
    trapQuestions,
    strengths: cv.careerHighlights.slice(0, 3),
  };
}

export function generateDynamicProbe(
  lastQuestion: string,
  candidateAnswer: string,
  starFlags: StarFlags,
  interviewerName: string
): { question: string; reason: string } {
  if (!starFlags.action) {
    return {
      question: `${interviewerName}: "Bisa diperjelas peran dan aksi nyata Anda sendiri? Apa keputusan kunci yang Anda buat secara mandiri dalam inisiatif tersebut?"`,
      reason: 'Jawaban sebelumnya masih berfokus pada apa yang dilakukan tim, bukan tindakan kepemimpinan kandidat (Missing Action [A]).',
    };
  }

  if (!starFlags.result) {
    return {
      question: `${interviewerName}: "Menarik sekali. Namun apa hasil akhir kuantitatif yang dicapai? Berapa persentase kenaikan atau angka dampak terukur yang dihasilkan?"`,
      reason: 'Jawaban terhenti sebelum menyajikan bukti metrik bisnis nyata (Missing Result [R]).',
    };
  }

  return {
    question: `${interviewerName}: "Bagus. Jika Anda harus mengulang proyek tersebut hari ini dengan sumber daya yang lebih terbatas, keputusan apa yang akan Anda ambil secara berbeda?"`,
    reason: 'Menguji kematangan evaluasi diri (Self-Reflection) dan manajemen risiko teknis.',
  };
}

export function evaluateTurn(
  turnNumber: number,
  question: string,
  candidateAnswer: string,
  durationSec: number,
  copilotHints: string[],
  speakerPersona: string = 'Maya Hardianti, M.Psi',
  speakerRole: string = 'Head of Talent Acquisition'
): SessionTurn {
  const fillerData = countFillerWords(candidateAnswer);
  const wpm = calculateWpm(candidateAnswer, durationSec);
  const starFlags = detectStarFlags(candidateAnswer);

  const wordCount = candidateAnswer.trim().split(/\s+/).filter(Boolean).length;

  // Kalkulasi Skor Awal Kandidat
  let originalScore = 5.0;
  if (starFlags.situation) originalScore += 1.0;
  if (starFlags.task) originalScore += 1.0;
  if (starFlags.action) originalScore += 1.2;
  if (starFlags.result) originalScore += 1.4;
  if (fillerData.total > 3) originalScore -= 0.6;
  if (wordCount < 20) originalScore -= 1.2;
  originalScore = Math.max(3.5, Math.min(8.6, Number(originalScore.toFixed(1))));

  // Format Jawaban STAR versi HR Lolos (Skor 9.6/10)
  const rewrittenStarAnswer = `[Situation] Ketika memimpin inisiatif di PT Kreasi Fintech Nusantara, kami menghadapi masalah payment drop-off sebesar 22% pada alur transaksi mobile checkout pengguna.

[Task] Tantangan utama saya adalah menyederhanakan alur pembayaran menjadi 1-Click tanpa menurunkan compliance standar keamanan perbankan dan enkripsi 3D-Secure.

[Action] Saya menginisiasi perancangan alur integrasi QRIS dinamis dan tokenisasi kartu debit, mengoordinasikan 5 backend/frontend engineers dan 1 UI designer dalam 6 sprint dua mingguan, serta menjalankan A/B testing intensif terhadap 50.000 transaksi.

[Result] Inisiatif ini berhasil mendongkrak payment success rate dari 78% menjadi 88.5% (+10.5%), memangkas payment drop-off sebesar 14%, dan mengamankan estimasi volume transaksi senilai Rp 1.4 Miliar per kuartal.`;

  return {
    id: `turn-${turnNumber}-${Date.now()}`,
    turnNumber,
    speakerPersona,
    speakerRole,
    turnType: turnNumber === 2 ? 'followup_probe' : 'main_question',
    questionText: question,
    copilotHints,
    candidateRawAnswer: candidateAnswer || '(Kandidat belum memberikan jawaban)',
    durationSeconds: durationSec,
    wpmRate: wpm || 128,
    fillerWords: fillerData.occurrences,
    starFlags,
    originalScore,
    rewrittenStarAnswer,
    rewrittenScore: 9.6,
    diffHighlights: {
      originalPassiveWords: ['ikut bantu-bantu', 'lumayan ramai', 'kayak gitu', 'eee', 'kurang lebih'],
      rewrittenActiveVerbs: [
        'Memimpin inisiatif',
        'Menginisiasi perancangan',
        'Mengoordinasikan sprint',
        'Menjalankan A/B testing',
      ],
      rewrittenMetrics: [
        '88.5% payment success rate (+10.5%)',
        'memangkas drop-off 14%',
        'Rp 1.4 Miliar volume transaksi',
      ],
    },
    hrRationale:
      'Versi yang ditulis ulang mengeliminasi kata-kata pasif dan gumaman, menggantinya dengan kepemimpinan aktif berstruktur STAR. Dilengkapi metrik komparasi (sebelum 78% vs sesudah 88.5%) yang memberikan bukti ROI bisnis nyata kepada manajemen puncak.',
  };
}
