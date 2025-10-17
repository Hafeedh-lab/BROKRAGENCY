import type { OverallScore, PillarScore, ScanInput } from '@/lib/types';

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

type PillarRule = (input: ScanInput) => { score: number; rationale: string; dimension: string; max: number };

const strategyRules: PillarRule[] = [
  (input) => ({
    dimension: 'Goal clarity',
    max: 8,
    score: input.goals.length >= 2 ? 8 : 5,
    rationale: input.goals.length >= 2 ? 'Multiple prioritized goals identified.' : 'Single goal limits focus.',
  }),
  (input) => ({
    dimension: 'Decision rights',
    max: 8,
    score:
      input.decisionRights === 'marketing_lead'
        ? 8
        : input.decisionRights === 'shared_committee'
        ? 6
        : input.decisionRights === 'founder_only'
        ? 4
        : 2,
    rationale:
      input.decisionRights === 'marketing_lead'
        ? 'Marketing leadership controls execution.'
        : input.decisionRights === 'shared_committee'
        ? 'Shared committee slows iteration.'
        : input.decisionRights === 'founder_only'
        ? 'Founder-led approvals hinder scale.'
        : 'Unclear governance introduces risk.',
  }),
  (input) => ({
    dimension: 'Budget to ambition',
    max: 9,
    score:
      input.monthlyBudget === '>150k'
        ? 9
        : input.monthlyBudget === '50k-150k'
        ? 8
        : input.monthlyBudget === '15k-50k'
        ? 6
        : input.monthlyBudget === '5k-15k'
        ? 4
        : 2,
    rationale: 'Spend level relative to goals.',
  }),
];

const channelFitRules: PillarRule[] = [
  (input) => ({
    dimension: 'Channel diversification',
    max: 8,
    score: clamp(input.currentChannels.length * 2.5, 2, 8),
    rationale: `${input.currentChannels.length} active channels.`,
  }),
  (input) => ({
    dimension: 'Spend concentration',
    max: 8,
    score: (() => {
      const overWeighted = input.currentChannels.some((c) => c.spendPercent > 70);
      if (overWeighted) return 4;
      const balanced = input.currentChannels.every((c) => c.spendPercent <= 50);
      return balanced ? 8 : 6;
    })(),
    rationale: 'Balanced spend reduces channel risk.',
  }),
  (input) => ({
    dimension: 'Future roadmap',
    max: 9,
    score: clamp(input.plannedChannels.length * 2, 3, 9),
    rationale: `${input.plannedChannels.length} upcoming bets.`,
  }),
];

const opsRules: PillarRule[] = [
  (input) => ({
    dimension: 'Creative velocity',
    max: 8,
    score: input.creativeCadence >= 8 ? 8 : input.creativeCadence >= 4 ? 6 : input.creativeCadence >= 2 ? 4 : 2,
    rationale: `${input.creativeCadence} concepts / month.`,
  }),
  (input) => ({
    dimension: 'Experimentation cadence',
    max: 9,
    score: input.croCadence >= 6 ? 9 : input.croCadence >= 3 ? 7 : input.croCadence >= 1 ? 5 : 2,
    rationale: `${input.croCadence} CRO experiments monthly.`,
  }),
  (input) => ({
    dimension: 'Team coverage',
    max: 8,
    score: (() => {
      if (input.inHouseRoles.includes('head_of_marketing') && input.inHouseRoles.includes('data_analyst')) return 8;
      if (input.inHouseRoles.includes('head_of_marketing')) return 6;
      if (input.inHouseRoles.includes('growth_lead')) return 5;
      return 3;
    })(),
    rationale: `${input.inHouseRoles.length} roles staffed.`,
  }),
];

const measurementRules: PillarRule[] = [
  (input) => ({
    dimension: 'Source of truth',
    max: 5,
    score:
      input.sourceOfTruth === 'custom_bi'
        ? 5
        : input.sourceOfTruth === 'amplitude' || input.sourceOfTruth === 'mixpanel'
        ? 4
        : input.sourceOfTruth === 'google_analytics'
        ? 3
        : input.sourceOfTruth === 'multiple_conflicting'
        ? 2
        : 1,
    rationale: `Reporting lives in ${input.sourceOfTruth.replace('_', ' ')}.`,
  }),
  (input) => ({
    dimension: 'Reporting cadence',
    max: 5,
    score:
      input.reportingCadence === 'weekly'
        ? 5
        : input.reportingCadence === 'bi_weekly'
        ? 4
        : input.reportingCadence === 'monthly'
        ? 3
        : input.reportingCadence === 'daily'
        ? 4
        : 2,
    rationale: `Reports shipped ${input.reportingCadence.replace('_', ' ')}.`,
  }),
  (input) => ({
    dimension: 'KPI clarity & ownership',
    max: 5,
    score:
      input.kpiClarity === 'laddered'
        ? 5
        : input.kpiClarity === 'blended'
        ? 3
        : input.kpiClarity === 'vanity'
        ? 2
        : 1,
    rationale: `KPIs rated ${input.kpiClarity}.`,
  }),
  (input) => ({
    dimension: 'Experimentation budget',
    max: 5,
    score:
      input.experimentationBudgetPercent >= 20
        ? 5
        : input.experimentationBudgetPercent >= 10
        ? 4
        : input.experimentationBudgetPercent >= 5
        ? 3
        : 1,
    rationale: `${input.experimentationBudgetPercent}% ring-fenced.`,
  }),
  (input) => ({
    dimension: 'Event hygiene',
    max: 3,
    score:
      input.eventHygiene === 'audited'
        ? 3
        : input.eventHygiene === 'basic'
        ? 2
        : input.eventHygiene === 'partial'
        ? 1
        : 0,
    rationale: `Tracking hygiene is ${input.eventHygiene}.`,
  }),
  (input) => ({
    dimension: 'Analytics ownership',
    max: 2,
    score: input.reportingOwner ? 2 : 1,
    rationale: input.reportingOwner ? 'Dedicated owner in place.' : 'No owner accountable for insights.',
  }),
];

const buildPillarScore = (input: ScanInput, rules: PillarRule[], pillar: PillarScore['pillar']): PillarScore => {
  const breakdown = rules.map((rule) => rule(input));
  const score = breakdown.reduce((acc, item) => acc + item.score, 0);
  const maxScore = breakdown.reduce((acc, item) => acc + item.max, 0);
  const percentage = Math.round((score / maxScore) * 100);
  const tier = percentage >= 80 ? 'excellent' : percentage >= 60 ? 'good' : percentage >= 40 ? 'fair' : 'poor';

  return {
    pillar,
    score: Math.round(score),
    maxScore,
    percentage,
    tier,
    breakdown: breakdown.map((item) => ({
      dimension: item.dimension,
      score: Math.round(item.score),
      maxScore: item.max,
      rationale: item.rationale,
    })),
  };
};

const deriveFitTier = (total: number): OverallScore['fitTier'] => {
  if (total >= 75) return 'A';
  if (total >= 55) return 'B';
  return 'C';
};

const buildBenchmarkNote = (fitTier: OverallScore['fitTier']) => {
  switch (fitTier) {
    case 'A':
      return 'You outperform 80% of marketing orgs we benchmark. Focus on scaling experiments and cross-channel orchestration.';
    case 'B':
      return 'Solid foundations with a few gaps. Address the flagged items and you will join the top quartile teams we work with.';
    default:
      return 'Foundational work required before scaling paid investment. Align leadership, instrument measurement, and ship creative velocity.';
  }
};

export const scoreScan = (input: ScanInput): OverallScore => {
  const strategy = buildPillarScore(input, strategyRules, 'strategy');
  const channelFit = buildPillarScore(input, channelFitRules, 'channel_fit');
  const ops = buildPillarScore(input, opsRules, 'ops');
  const measurement = buildPillarScore(input, measurementRules, 'measurement');

  const total = strategy.score + channelFit.score + ops.score + measurement.score;
  const fitTier = deriveFitTier(total);

  return {
    total,
    pillars: [strategy, channelFit, ops, measurement],
    fitTier,
    benchmarkNote: buildBenchmarkNote(fitTier),
  };
};
