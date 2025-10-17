import type { Flag, ScanInput } from '@/lib/types';

const createFlag = (flag: Flag): Flag => flag;

export const detectFlags = (input: ScanInput): Flag[] => {
  const flags: Flag[] = [];

  if (input.decisionRights === 'unclear') {
    flags.push(
      createFlag({
        id: 'decision-unclear',
        severity: 'critical',
        title: 'Decision rights are unclear',
        description: 'Agency work will stall without defined approvers and SLAs.',
        evidence: ['Decision rights set to unclear'],
        pillar: 'strategy',
        impact: 'Establish RACI and approval timelines before onboarding an agency.',
      }),
    );
  }

  const totalSpend = input.currentChannels.reduce((sum, channel) => sum + channel.spendPercent, 0);
  if (totalSpend !== 100) {
    flags.push(
      createFlag({
        id: 'spend-not-100',
        severity: 'medium',
        title: 'Channel spend allocation misaligned',
        description: 'Spend distribution should total 100% to reflect real resourcing.',
        evidence: [`Reported spend total ${totalSpend}%`],
        pillar: 'channel_fit',
        impact: 'Reconcile spend mix to expose opportunities for efficiency.',
      }),
    );
  }

  if (input.reportingCadence === 'ad_hoc') {
    flags.push(
      createFlag({
        id: 'reporting-ad-hoc',
        severity: 'high',
        title: 'Reporting is ad-hoc',
        description: 'Without a predictable reporting rhythm, agencies cannot calibrate performance.',
        evidence: ['Reporting cadence set to ad-hoc'],
        pillar: 'measurement',
        impact: 'Install a weekly or bi-weekly readout before scaling spend.',
      }),
    );
  }

  if (!input.reportingOwner) {
    flags.push(
      createFlag({
        id: 'no-reporting-owner',
        severity: 'medium',
        title: 'No analytics owner identified',
        description: 'A single accountable owner accelerates insights and action.',
        evidence: ['Reporting owner set to no'],
        pillar: 'measurement',
        impact: 'Designate an internal or fractional analytics owner before the engagement.',
      }),
    );
  }

  if (input.creativeCadence < 2) {
    flags.push(
      createFlag({
        id: 'low-creative-velocity',
        severity: 'high',
        title: 'Creative velocity is below readiness threshold',
        description: 'High-performing programs ship new creative weekly. Consider a creative sprints program.',
        evidence: [`Only ${input.creativeCadence} concepts per month`],
        pillar: 'ops',
        impact: 'Spin up a creative pod or allocate resources to increase velocity.',
      }),
    );
  }

  return flags.slice(0, 3);
};
