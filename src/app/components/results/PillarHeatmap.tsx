'use client';

import { Info } from 'lucide-react';
import type { PillarScore } from '@/lib/types';

interface Props {
  pillars: PillarScore[];
}

export function PillarHeatmap({ pillars }: Props) {
  const getBarColor = (percentage: number) => {
    if (percentage >= 80) return 'bg-score-excellent';
    if (percentage >= 60) return 'bg-brand-blue';
    if (percentage >= 40) return 'bg-score-fair';
    return 'bg-score-poor';
  };

  const formatName = (pillar: string) => {
    switch (pillar) {
      case 'strategy':
        return 'Strategy Clarity';
      case 'channel_fit':
        return 'Channel-Goal Fit';
      case 'ops':
        return 'Ops Readiness';
      case 'measurement':
        return 'Measurement Maturity';
      default:
        return pillar;
    }
  };

  return (
    <div className="bg-neutral-100 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-brand-navy mb-6">4-Pillar Breakdown</h3>
      <div className="space-y-6">
        {pillars.map((pillar) => (
          <div key={pillar.pillar} className="bg-base rounded-lg p-4">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-2">
                <span className="text-base font-semibold text-brand-navy">{formatName(pillar.pillar)}</span>
                <Info className="w-4 h-4 text-neutral-400" />
              </div>
              <span className="text-base font-bold text-brand-navy">
                {pillar.score}/{pillar.maxScore}
              </span>
            </div>

            <div className="h-3 bg-neutral-200 rounded-full overflow-hidden shadow-inner">
              <div
                className={`h-full ${getBarColor(pillar.percentage)} transition-all duration-500 rounded-full`}
                style={{ width: `${pillar.percentage}%` }}
              />
            </div>

            <div className="text-xs font-medium text-neutral-700 mt-2">
              {pillar.tier.charAt(0).toUpperCase() + pillar.tier.slice(1)} ({pillar.percentage}%)
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
