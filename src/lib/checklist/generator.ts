import type { ChecklistItem, Flag, OverallScore, ScanInput } from '@/lib/types';

const BASE_ITEMS: ChecklistItem[] = [
  {
    id: 'clarify-decision-rights',
    title: 'Clarify marketing decision rights and SLAs',
    description: 'Document who approves briefs, assets, and launch readiness with turnaround expectations.',
    pillar: 'Strategy',
    brokerService: 'Agency readiness workshop',
    estimatedDays: 5,
    priority: 1,
  },
  {
    id: 'build-reporting-cadence',
    title: 'Install weekly performance readout',
    description: 'Set a predictable meeting with dashboards and action owners.',
    pillar: 'Measurement',
    brokerService: 'Revenue analytics playbook',
    estimatedDays: 7,
    priority: 1,
  },
  {
    id: 'creative-sprint',
    title: 'Stand up a creative sprint pod',
    description: 'Ship 6-8 net-new creative concepts before the engagement kicks off.',
    pillar: 'Ops',
    brokerService: 'Creative surge squad',
    estimatedDays: 10,
    priority: 2,
  },
  {
    id: 'tracking-audit',
    title: 'Audit conversion tracking & events',
    description: 'Validate event definitions, UTM frameworks, and conversion hygiene.',
    pillar: 'Measurement',
    brokerService: 'Analytics instrumentation squad',
    estimatedDays: 12,
    priority: 2,
  },
  {
    id: 'channel-briefs',
    title: 'Prepare channel-specific briefs',
    description: 'Codify target personas, offers, and success metrics per channel.',
    pillar: 'Strategy',
    estimatedDays: 6,
    priority: 3,
  },
];

export const buildChecklist = (
  score: OverallScore,
  flags: Flag[],
  input: ScanInput,
): ChecklistItem[] => {
  const prioritized: ChecklistItem[] = [];

  if (flags.some((flag) => flag.id === 'decision-unclear')) {
    prioritized.push(BASE_ITEMS.find((item) => item.id === 'clarify-decision-rights')!);
  }

  if (flags.some((flag) => flag.id === 'reporting-ad-hoc') || !input.reportingOwner) {
    prioritized.push(BASE_ITEMS.find((item) => item.id === 'build-reporting-cadence')!);
  }

  if (input.creativeCadence < 4) {
    prioritized.push(BASE_ITEMS.find((item) => item.id === 'creative-sprint')!);
  }

  if (score.fitTier === 'C' && !flags.some((flag) => flag.id === 'tracking-audit')) {
    prioritized.push(BASE_ITEMS.find((item) => item.id === 'tracking-audit')!);
  }

  if (!prioritized.length) {
    prioritized.push(BASE_ITEMS.find((item) => item.id === 'channel-briefs')!);
  }

  return prioritized.slice(0, 4);
};
