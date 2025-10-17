'use client';

import { Award, TrendingUp } from 'lucide-react';
import type { OverallScore } from '@/lib/types';

interface Props {
  score: OverallScore;
}

export function ScoreOverview({ score }: Props) {
  const getTierInfo = (tier: string) => {
    switch (tier) {
      case 'A':
        return {
          label: 'Scale with Discipline',
          color: 'text-score-excellent',
          bgColor: 'bg-score-excellent/10',
          borderColor: 'border-score-excellent',
        } as const;
      case 'B':
        return {
          label: 'Fix-First Sprint',
          color: 'text-brand-blue',
          bgColor: 'bg-brand-blue/10',
          borderColor: 'border-brand-blue',
        } as const;
      case 'C':
        return {
          label: 'Foundations First',
          color: 'text-score-fair',
          bgColor: 'bg-score-fair/10',
          borderColor: 'border-score-fair',
        } as const;
      default:
        return {
          label: 'Unknown',
          color: 'text-neutral-700',
          bgColor: 'bg-neutral-100',
          borderColor: 'border-neutral-200',
        } as const;
    }
  };

  const tierInfo = getTierInfo(score.fitTier);

  return (
    <div className="bg-base rounded-2xl shadow-navy p-8 border border-neutral-100">
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-gold/10 border border-brand-gold/30 rounded-full mb-6">
        <Award className="w-5 h-5 text-brand-gold" />
        <span className="font-semibold text-brand-navy">Tier {score.fitTier} Fit</span>
      </div>

      <div className="flex items-end gap-4 mb-6">
        <div className={`text-7xl font-bold ${tierInfo.color}`}>{score.total}</div>
        <div className="pb-3">
          <div className="text-3xl font-semibold text-neutral-700">/100</div>
          <div className="text-base text-neutral-700 font-medium">{tierInfo.label}</div>
        </div>
      </div>

      <div className={`${tierInfo.bgColor} ${tierInfo.borderColor} border-l-4 p-4 rounded-r-lg mb-6`}>
        <p className="text-neutral-900 font-medium">
          {tierInfo.label === 'Scale with Discipline'
            ? "You're ready to scale with the right partner. Strong foundations across strategy, operations, and measurement."
            : tierInfo.label === 'Fix-First Sprint'
            ? 'Good foundations with specific gaps to address. A fix-first sprint will strengthen your agency partnerships.'
            : 'Focus on foundational work before engaging an agency. Build strategy clarity and measurement infrastructure first.'}
        </p>
      </div>

      <div className="border-t border-neutral-200 pt-4">
        <div className="flex items-start gap-2 text-neutral-900">
          <TrendingUp className="w-5 h-5 text-brand-blue mt-0.5 flex-shrink-0" />
          <p className="text-sm leading-relaxed">{score.benchmarkNote}</p>
        </div>
      </div>
    </div>
  );
}
