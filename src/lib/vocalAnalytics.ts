import { COMMON_FILLER_WORDS } from './constants';
import { FillerWordOccurrence } from '@/types/interview';

export function countFillerWords(transcript: string): { total: number; occurrences: FillerWordOccurrence[] } {
  if (!transcript || transcript.trim().length === 0) {
    return { total: 0, occurrences: [] };
  }

  const occurrencesMap = new Map<string, number>();
  const lowerTranscript = transcript.toLowerCase();

  for (const filler of COMMON_FILLER_WORDS) {
    // Escape regex characters
    const escaped = filler.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`\\b${escaped}\\b`, 'gi');
    const matches = lowerTranscript.match(regex);
    if (matches && matches.length > 0) {
      occurrencesMap.set(filler, (occurrencesMap.get(filler) || 0) + matches.length);
    }
  }

  const occurrences: FillerWordOccurrence[] = Array.from(occurrencesMap.entries())
    .map(([word, count]) => ({ word, count }))
    .sort((a, b) => b.count - a.count);

  const total = occurrences.reduce((acc, curr) => acc + curr.count, 0);

  return { total, occurrences };
}

export function calculateWpm(transcript: string, durationSeconds: number): number {
  if (durationSeconds <= 2 || !transcript.trim()) return 0;
  const words = transcript.trim().split(/\s+/).filter(Boolean).length;
  const minutes = durationSeconds / 60;
  const wpm = Math.round(words / minutes);
  return Math.min(300, Math.max(0, wpm));
}

export function evaluatePace(wpm: number): { label: string; status: 'slow' | 'ideal' | 'fast' | 'idle'; color: string } {
  if (wpm === 0) return { label: 'Menunggu Suara', status: 'idle', color: 'text-obsidian-400' };
  if (wpm < 90) return { label: `${wpm} WPM (Terlalu Lambat)`, status: 'slow', color: 'text-amber-400' };
  if (wpm >= 90 && wpm <= 105) return { label: `${wpm} WPM (Cukup Santai)`, status: 'ideal', color: 'text-teal-400' };
  if (wpm > 105 && wpm <= 150) return { label: `${wpm} WPM (Pace Ideal)`, status: 'ideal', color: 'text-emerald-400' };
  if (wpm > 150 && wpm <= 170) return { label: `${wpm} WPM (Agak Cepat)`, status: 'fast', color: 'text-amber-400' };
  return { label: `${wpm} WPM (Terlalu Cepat)`, status: 'fast', color: 'text-rose-400' };
}
