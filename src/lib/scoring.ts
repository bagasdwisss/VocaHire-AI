import { RadarMetrics } from '@/types/interview';

/**
 * Kalkulasi skor otomatis sesuai Formula PRD 6.2:
 * S_total = 0.30(C_STAR) + 0.25(C_impact) + 0.20(C_relevance) + 0.15(C_delivery) + 0.10(C_conciseness)
 */
export function calculateDeliveryScore(fillerWordsCount: number, totalWords: number, wpm: number): number {
  if (totalWords === 0) return 5.0;

  const rf = (fillerWordsCount / Math.max(totalWords, 1)) * 100;
  const pacePenalty = (wpm < 90 || wpm > 170) ? 1.5 : 0;
  const fillerPenalty = Math.floor(1.5 * rf);

  const delivery = Math.max(1.0, Math.min(10.0, 10.0 - fillerPenalty - pacePenalty));
  return Number(delivery.toFixed(1));
}

export function calculateOverallScore(metrics: RadarMetrics): number {
  const { star, impact, relevance, delivery, conciseness } = metrics;
  const score = (
    0.30 * star +
    0.25 * impact +
    0.20 * relevance +
    0.15 * delivery +
    0.10 * conciseness
  );
  return Number(Math.max(1.0, Math.min(10.0, score)).toFixed(1));
}

export function getScoreBadge(score: number): { label: string; color: string; desc: string } {
  if (score >= 8.5) {
    return {
      label: 'Sangat Siap (Top 5% Candidate)',
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
      desc: 'Jawaban Anda terstruktur rapi, berdampak terukur, dan memancarkan kepemimpinan.',
    };
  }
  if (score >= 7.0) {
    return {
      label: 'Siap Wawancara (Passing Grade)',
      color: 'text-teal-400 bg-teal-500/10 border-teal-500/30',
      desc: 'Kompetensi inti tersampaikan baik. Tingkatkan sedikit ketajaman angka hasil dan kurangi gumaman.',
    };
  }
  if (score >= 5.5) {
    return {
      label: 'Perlu Latihan Tambahan',
      color: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
      desc: 'Jawaban masih cenderung normatif/pasif dan belum melengkapi siklus STAR secara utuh.',
    };
  }
  return {
    label: 'Kritis (Perlu Pembenahan Serius)',
    color: 'text-rose-400 bg-rose-500/10 border-rose-500/30',
    desc: 'Banyak jeda hening atau gumaman berulang. Pelajari rekomendasi jawaban STAR yang ditulis ulang.',
  };
}
