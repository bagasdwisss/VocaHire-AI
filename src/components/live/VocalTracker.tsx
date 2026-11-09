'use client';

import React from 'react';
import { Gauge, Mic, AlertCircle, Clock } from 'lucide-react';
import { evaluatePace } from '@/lib/vocalAnalytics';
import { FillerWordOccurrence } from '@/types/interview';

interface VocalTrackerProps {
  wpm: number;
  fillerWords: FillerWordOccurrence[];
  totalFiller: number;
  durationSec: number;
}

export const VocalTracker: React.FC<VocalTrackerProps> = ({
  wpm,
  fillerWords,
  totalFiller,
  durationSec,
}) => {
  const pace = evaluatePace(wpm);

  const formatTime = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const remainingSec = sec % 60;
    return `${mins.toString().padStart(2, '0')}:${remainingSec.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs font-mono">
      {/* Timer */}
      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-obsidian-850 border border-obsidian-700 text-obsidian-300">
        <Clock className="w-3.5 h-3.5 text-electric-violet" />
        <span className="text-white font-bold">{formatTime(durationSec)}</span>
      </div>

      {/* Speaking Pace (WPM) */}
      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-obsidian-850 border border-obsidian-700">
        <Gauge className="w-3.5 h-3.5 text-electric-teal" />
        <span className="text-obsidian-400">Pace:</span>
        <span className={`font-semibold ${pace.color}`}>{pace.label}</span>
      </div>

      {/* Filler Words */}
      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-obsidian-850 border border-obsidian-700">
        <AlertCircle className={`w-3.5 h-3.5 ${totalFiller > 3 ? 'text-rose-400' : 'text-amber-400'}`} />
        <span className="text-obsidian-400">Gumaman:</span>
        <span className={`font-bold ${totalFiller > 3 ? 'text-rose-400' : totalFiller > 0 ? 'text-amber-400' : 'text-emerald-400'}`}>
          {totalFiller}x
        </span>
        {fillerWords.length > 0 && (
          <span className="text-[10px] text-obsidian-400 max-w-[120px] truncate hidden md:inline">
            ({fillerWords.slice(0, 2).map((f) => `"${f.word}" ${f.count}x`).join(', ')})
          </span>
        )}
      </div>
    </div>
  );
};
