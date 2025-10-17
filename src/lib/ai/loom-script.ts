import type { Flag, OverallScore } from '@/lib/types';

export const generateLoomScript = (score: OverallScore, flags: Flag[]): string => {
  const intro = `Hey there — thanks for running the Brokr Agency-Fit Scan. You landed a Tier ${score.fitTier} with a total score of ${score.total}.`;
  const pillarSummary = score.pillars
    .map((pillar) => `${pillar.pillar.replace('_', ' ')} came in at ${pillar.percentage}% (${pillar.tier}).`)
    .join(' ');
  const flagSummary = flags.length
    ? `The top risks we spotted: ${flags
        .map((flag) => `${flag.title.toLowerCase()} (${flag.severity}).`)
        .join(' ')}`
    : 'No critical risks surfaced — impressive foundation!';
  const close =
    score.fitTier === 'A'
      ? 'Let’s use the triage call to plan the next wave of experimentation and channel scaling.'
      : score.fitTier === 'B'
      ? 'On our triage call we’ll prioritize the fix-first sprint so your agency can hit the ground running.'
      : 'I recommend we spend 20 minutes on a readiness consult to build the foundation before you brief agencies.';

  return [intro, pillarSummary, flagSummary, close].join(' ');
};
