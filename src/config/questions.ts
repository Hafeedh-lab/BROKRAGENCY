import { z } from 'zod';
import type { ScanInput } from '@/lib/types';

export type QuestionStep = {
  id: keyof ScanInput | 'proposalConsent';
  title: string;
  description: string;
  type: 'single' | 'multi' | 'numeric' | 'text' | 'grid';
  options?: { value: any; label: string; description?: string }[];
  helper?: string;
  maxSelections?: number;
};

export const QUESTION_STEPS: QuestionStep[] = [
  {
    id: 'industry',
    title: 'Which best describes your business?',
    description: 'Choose the industry that reflects the majority of your revenue.',
    type: 'single',
    options: [
      { value: 'b2b_saas', label: 'B2B SaaS' },
      { value: 'b2c_ecommerce', label: 'B2C Ecommerce' },
      { value: 'professional_services', label: 'Professional Services' },
      { value: 'fintech', label: 'Fintech' },
      { value: 'healthcare', label: 'Healthcare' },
      { value: 'education', label: 'Education' },
      { value: 'media', label: 'Media & Publishing' },
      { value: 'other', label: 'Other' },
    ],
  },
  {
    id: 'revenueBand',
    title: 'Annual revenue band',
    description: 'This helps us benchmark channel efficiency.',
    type: 'single',
    options: [
      { value: '<1m', label: 'Under $1M' },
      { value: '1m-5m', label: '$1M - $5M' },
      { value: '5m-20m', label: '$5M - $20M' },
      { value: '20m-100m', label: '$20M - $100M' },
      { value: '>100m', label: '$100M +' },
    ],
  },
  {
    id: 'monthlyBudget',
    title: 'Monthly marketing investment',
    description: 'How much are you investing across performance and brand today?',
    type: 'single',
    options: [
      { value: '<5k', label: 'Under $5k' },
      { value: '5k-15k', label: '$5k - $15k' },
      { value: '15k-50k', label: '$15k - $50k' },
      { value: '50k-150k', label: '$50k - $150k' },
      { value: '>150k', label: '$150k +' },
    ],
  },
  {
    id: 'goals',
    title: 'Top growth goals for the next 2 quarters',
    description: 'Select up to three outcomes your team is accountable for.',
    type: 'multi',
    maxSelections: 3,
    options: [
      { value: 'pipeline_growth', label: 'Pipeline growth' },
      { value: 'cac_efficiency', label: 'Improve CAC' },
      { value: 'ltv_expansion', label: 'Increase LTV' },
      { value: 'brand_search', label: 'Grow brand search' },
      { value: 'geo_expansion', label: 'Launch new geo' },
      { value: 'product_launch', label: 'Launch product' },
      { value: 'category_education', label: 'Educate the market' },
      { value: 'retention_improvement', label: 'Improve retention' },
    ],
  },
  {
    id: 'inHouseRoles',
    title: 'Who owns marketing in-house today?',
    description: 'Select every role that is currently staffed internally.',
    type: 'multi',
    options: [
      { value: 'founder_ceo', label: 'Founder / CEO' },
      { value: 'head_of_marketing', label: 'Head of Marketing' },
      { value: 'growth_lead', label: 'Growth Lead' },
      { value: 'content_lead', label: 'Content Lead' },
      { value: 'data_analyst', label: 'Marketing Analyst' },
      { value: 'product_marketing', label: 'Product Marketing' },
      { value: 'sales_ops', label: 'Sales / Rev Ops' },
      { value: 'none', label: 'None of the above' },
    ],
  },
  {
    id: 'decisionRights',
    title: 'Who signs off on campaigns and spend?',
    description: 'Clear decision rights predict faster iteration cycles.',
    type: 'single',
    options: [
      { value: 'founder_only', label: 'Founder only' },
      { value: 'marketing_lead', label: 'Marketing leadership' },
      { value: 'shared_committee', label: 'Shared committee' },
      { value: 'unclear', label: 'Unclear / ad-hoc' },
    ],
  },
  {
    id: 'creativeCadence',
    title: 'How many net-new creative concepts ship each month?',
    description: 'Count distinct creative variations ready for paid activation.',
    type: 'numeric',
  },
  {
    id: 'croCadence',
    title: 'How often do you run CRO experiments?',
    description: 'Number of A/B or multivariate tests launched monthly.',
    type: 'numeric',
  },
  {
    id: 'currentChannels',
    title: 'Where do you spend today?',
    description: 'List your active channels and approximate % of spend.',
    type: 'grid',
  },
  {
    id: 'plannedChannels',
    title: 'Which channels are on deck for the next 2 quarters?',
    description: 'Select all channels you intend to explore soon.',
    type: 'multi',
    options: [
      { value: 'paid_search', label: 'Paid Search' },
      { value: 'paid_social', label: 'Paid Social' },
      { value: 'seo_content', label: 'SEO & Content' },
      { value: 'lifecycle_email', label: 'Lifecycle Email' },
      { value: 'cro', label: 'Conversion Rate Optimization' },
      { value: 'affiliates', label: 'Affiliates / Partnerships' },
      { value: 'podcast_sponsorships', label: 'Podcast Sponsorships' },
      { value: 'offline_events', label: 'Offline Events' },
      { value: 'pr_earned', label: 'PR / Earned Media' },
    ],
  },
  {
    id: 'sourceOfTruth',
    title: 'Primary reporting source of truth',
    description: 'How do you adjudicate performance debates today?',
    type: 'single',
    options: [
      { value: 'google_analytics', label: 'Google Analytics' },
      { value: 'mixpanel', label: 'Mixpanel' },
      { value: 'amplitude', label: 'Amplitude' },
      { value: 'custom_bi', label: 'Custom BI / Warehouse' },
      { value: 'multiple_conflicting', label: 'Multiple conflicting views' },
      { value: 'none', label: 'No source of truth' },
    ],
  },
  {
    id: 'reportingCadence',
    title: 'How often do you ship performance readouts?',
    description: 'Cadence indicates feedback loops and agency velocity.',
    type: 'single',
    options: [
      { value: 'ad_hoc', label: 'Ad-hoc' },
      { value: 'monthly', label: 'Monthly' },
      { value: 'bi_weekly', label: 'Bi-weekly' },
      { value: 'weekly', label: 'Weekly' },
      { value: 'daily', label: 'Daily dashboards' },
    ],
  },
  {
    id: 'kpiClarity',
    title: 'How clear are your marketing KPIs?',
    description: 'Are goals laddered into accountable metrics?',
    type: 'single',
    options: [
      { value: 'none', label: 'No defined KPIs' },
      { value: 'vanity', label: 'Primarily vanity metrics' },
      { value: 'blended', label: 'Blended KPIs without ownership' },
      { value: 'laddered', label: 'Laddered KPIs with accountable owners' },
    ],
  },
  {
    id: 'reportingOwner',
    title: 'Do you have a dedicated owner for reporting & analytics?',
    description: 'Select yes if a named person is accountable for insights.',
    type: 'single',
    options: [
      { value: true, label: 'Yes' },
      { value: false, label: 'No' },
    ],
  },
  {
    id: 'experimentationBudgetPercent',
    title: 'What % of budget is ring-fenced for experiments?',
    description: 'Healthy experimentation budgets accelerate learning.',
    type: 'numeric',
  },
  {
    id: 'eventHygiene',
    title: 'How clean is your event & conversion tracking?',
    description: 'Accuracy of events, UTMs, and conversion tracking.',
    type: 'single',
    options: [
      { value: 'none', label: 'No tracking' },
      { value: 'partial', label: 'Fragmented tracking' },
      { value: 'basic', label: 'Basic coverage' },
      { value: 'audited', label: 'Audited & trusted' },
    ],
  },
  {
    id: 'constraints',
    title: 'Anything that could slow an agency down?',
    description: 'Optional: procurement, legal, seasonal realities, etc.',
    type: 'text',
  },
  {
    id: 'proposalConsent',
    title: 'Want a proposal decoded?',
    description: 'Optionally upload or paste an active proposal for gaps & flags.',
    type: 'text',
  },
];

export const scanInputSchema = z.object({
  industry: z.enum(['b2b_saas', 'b2c_ecommerce', 'professional_services', 'tech_hardware', 'fintech', 'healthcare', 'education', 'media', 'nonprofit', 'other']),
  revenueBand: z.enum(['<1m', '1m-5m', '5m-20m', '20m-100m', '>100m']),
  monthlyBudget: z.enum(['<5k', '5k-15k', '15k-50k', '50k-150k', '>150k']),
  goals: z.array(z.enum(['pipeline_growth', 'cac_efficiency', 'ltv_expansion', 'brand_search', 'geo_expansion', 'product_launch', 'category_education', 'retention_improvement'])).min(1).max(3),
  inHouseRoles: z.array(z.enum(['founder_ceo', 'head_of_marketing', 'growth_lead', 'content_lead', 'data_analyst', 'product_marketing', 'sales_ops', 'none'])).min(1),
  decisionRights: z.enum(['founder_only', 'marketing_lead', 'shared_committee', 'unclear']),
  creativeCadence: z.number().min(0),
  croCadence: z.number().min(0),
  currentChannels: z
    .array(
      z.object({
        channel: z.enum(['paid_search', 'paid_social', 'seo_content', 'lifecycle_email', 'cro', 'affiliates', 'podcast_sponsorships', 'offline_events', 'pr_earned']),
        spendPercent: z.number().min(0).max(100),
      }),
    )
    .min(1),
  plannedChannels: z.array(z.enum(['paid_search', 'paid_social', 'seo_content', 'lifecycle_email', 'cro', 'affiliates', 'podcast_sponsorships', 'offline_events', 'pr_earned'])).min(0),
  sourceOfTruth: z.enum(['google_analytics', 'mixpanel', 'amplitude', 'custom_bi', 'multiple_conflicting', 'none']),
  reportingCadence: z.enum(['ad_hoc', 'monthly', 'bi_weekly', 'weekly', 'daily']),
  reportingOwner: z.boolean(),
  kpiClarity: z.enum(['none', 'vanity', 'blended', 'laddered']),
  experimentationBudgetPercent: z.number().min(0).max(100),
  eventHygiene: z.enum(['none', 'partial', 'basic', 'audited']),
  constraints: z.string().optional().default(''),
  proposalConsent: z.string().optional(),
});

export type ScanFormValues = z.infer<typeof scanInputSchema>;
