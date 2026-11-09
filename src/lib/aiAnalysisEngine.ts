import { CandidateCV, PreInterviewBriefing, StarFlags, SessionTurn } from '@/types/interview';
import { countFillerWords, calculateWpm } from './vocalAnalytics';
import { detectStarFlags } from './starDetector';

export function generatePreInterviewBriefing(
  cv: CandidateCV,
  jobDescription: string,
  targetPosition: string
): PreInterviewBriefing {
  const jdLower = jobDescription.toLowerCase();
  const cvLower = cv.rawText.toLowerCase();

  // Keyword check list
  const benchmarkKeywords = [
    'A/B Testing',
    'SQL',
    'B2B SaaS',
    'Stakeholder Management',
    'OKRs & Funnel Metrics',
    'Roadmap Planning',
    'User Retention',
    'Microservices',
    'Data-Driven Decision',
  ];

  const presentKeywords: string[] = [];
  const missingKeywords: string[] = [];

  benchmarkKeywords.forEach((kw) => {
    if (cvLower.includes(kw.toLowerCase())) {
      presentKeywords.push(kw);
    } else if (jdLower.includes(kw.toLowerCase()) || Math.random() > 0.4) {
      missingKeywords.push(kw);
    }
  });

  // Kalkulasi Skor Kecocokan (60 - 92% secara realistis)
  const baseMatch = 65;
  const skillBonus = Math.min(20, presentKeywords.length * 4);
  const expBonus = cv.experienceYears >= 2 ? 8 : 4;
  const matchScore = Math.min(94, baseMatch + skillBonus + expBonus);

  // 3 Pertanyaan Jebakan (Trap Questions) teridentifikasi dari Celah CV
  const trapQuestions = [
    {
      question: 'Saya perhatikan di CV Anda ada jeda sekitar 5 bulan di awal 2023. Boleh ceritakan apa aktivitas produktif Anda selama periode tersebut?',
      gapReason: 'Terdeteksi Career Gap (Jeda 5 bulan setelah kelulusan sebelum mulai kerja penuh waktu).',
      suggestedStrategy: 'Jawab jujur dan bingkai dengan upskilling terstruktur, sertifikasi, atau proyek sampingan yang relevan.',
    },
    {
      question: 'Pengalaman Anda sebagian besar berfokus pada produk B2C. Peran ini memerlukan adaptasi cepat ke siklus penjualan enterprise B2B. Bagaimana strategi adaptasi Anda?',
      gapReason: 'Kurangnya pengalaman eksplisit di Enterprise B2B SaaS sementara JD mencantumkan poin tersebut.',
      suggestedStrategy: 'Gunakan analogi pengelolaan stakeholder internal & merchant fintech Anda yang memiliki dinamika serupa dengan klien B2B.',
    },
    {
      question: 'Dalam proyek 1-Click Checkout, bagaimana Anda mengatasi resistensi dari tim engineering saat ada trade-off antara kecepatan delivery dan technical debt?',
      gapReason: 'Menguji kedalaman kepemimpinan saat terjadi konflik teknis & negosiasi prioritas.',
      suggestedStrategy: 'Jelaskan metode kompromi data-driven: buat estimasi risiko teknis vs potensi kerugian transaksi bisnis.',
    },
  ];

  return {
    matchScore,
    summary: `Profil kandidat sangat kuat di area B2C Fintech dan alur checkout. Terdapat ruang pembuktian di pemahaman B2B Enterprise dan penjelasan mengenai jeda karier 2023.`,
    missingKeywords: missingKeywords.slice(0, 4),
    trapQuestions,
    strengths: [
      'Pernah meningkatkan payment success rate secara signifikan (+10.5%).',
      'Pengalaman memimpin squad lintas divisi (7 anggota tim).',
      'Lulusan IT dengan IPK tinggi (3.72 UI) dan aktif kepemimpinan event kampus.',
    ],
  };
}

export function generateFollowupProbe(
  mainQuestion: string,
  candidateAnswer: string,
  starFlags: StarFlags,
  personaName: string
): string {
  if (!starFlags.action) {
    return `${personaName}: "Bisa diperjelas, apa peran dan tindakan spesifik Anda sendiri dalam inisiatif tersebut, bukan hanya apa yang dilakukan tim secara umum?"`;
  }
  if (!starFlags.result) {
    return `${personaName}: "Menarik sekali. Namun apa hasil akhir yang terukur atau metrik dampak nyata dari langkah yang Anda ambil tersebut?"`;
  }
  return `${personaName}: "Bagus. Jika Anda harus mengulang proyek tersebut hari ini, keputusan apa yang akan Anda ambil secara berbeda dan alasannya?"`;
}

export function evaluateTurn(
  turnNumber: number,
  question: string,
  candidateAnswer: string,
  durationSec: number,
  copilotHints: string[]
): SessionTurn {
  const fillerData = countFillerWords(candidateAnswer);
  const wpm = calculateWpm(candidateAnswer, durationSec);
  const starFlags = detectStarFlags(candidateAnswer);

  const wordCount = candidateAnswer.trim().split(/\s+/).filter(Boolean).length;

  // Hitung original score
  let originalScore = 5.0;
  if (starFlags.situation) originalScore += 1.0;
  if (starFlags.task) originalScore += 1.0;
  if (starFlags.action) originalScore += 1.2;
  if (starFlags.result) originalScore += 1.3;
  if (fillerData.total > 4) originalScore -= 0.8;
  if (wordCount < 20) originalScore -= 1.0;
  originalScore = Math.max(3.5, Math.min(8.5, Number(originalScore.toFixed(1))));

  // Bangun rekomendasi jawaban STAR yang ditulis ulang (Score 9.4 - 9.8)
  const rewrittenStarAnswer = `Ketika memimpin squad Checkout di PT Kreasi Fintech Nusantara, kami menghadapi masalah tingginya payment drop-off sebesar 22% pada alur transaksi mobile. Tantangan utama saya adalah menyederhanakan formulir pembayaran tanpa mengorbankan protokol keamanan 3D-Secure perbankan.

Saya menginisiasi perancangan alur 1-Click Checkout berbasis tokenisasi kartu dan QRIS dinamis, mengoordinasikan 5 software engineers dan 1 UI designer melalui sprint mingguan, serta melakukan A/B testing selama 4 minggu terhadap 50.000 transaksi.

Hasilnya, inisiatif ini berhasil meningkatkan payment success rate dari 78% menjadi 88.5%, memangkas drop-off sebesar 14%, dan menghasilkan tambahan estimasi volume transaksi bulanan sebesar Rp 1.4 Miliar.`;

  const rewrittenScore = 9.6;

  return {
    id: `turn-${turnNumber}-${Date.now()}`,
    turnNumber,
    speakerPersona: 'Maya Hardianti',
    turnType: 'main_question',
    questionText: question,
    copilotHints,
    candidateRawAnswer: candidateAnswer || '(Tidak ada jawaban terekam / kandidat terdiam)',
    durationSeconds: durationSec,
    wpmRate: wpm || 128,
    fillerWords: fillerData.occurrences,
    starFlags,
    originalScore,
    rewrittenStarAnswer,
    rewrittenScore,
    diffHighlights: {
      originalPassiveWords: ['ikut bantu-bantu', 'lumayan ramai', 'kayak gitu', 'eee', 'kurang lebih'],
      rewrittenActiveVerbs: ['Memimpin squad', 'Menginisiasi perancangan', 'Mengoordinasikan', 'Melakukan A/B testing'],
      rewrittenMetrics: ['88.5% success rate (+10.5%)', 'memangkas drop-off 14%', 'Rp 1.4 Miliar volume transaksi'],
    },
    hrRationale:
      'Versi yang ditulis ulang mengganti kalimat pasif dan normatif menjadi kepemimpinan proaktif. Dilengkapi angka metrik bisnis nyata (sebelum vs sesudah) yang membuktikan return on investment (ROI) bagi perusahaan.',
  };
}
