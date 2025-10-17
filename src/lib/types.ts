export type Industry =
  | 'b2b_saas'
  | 'b2c_ecommerce'
  | 'professional_services'
  | 'tech_hardware'
  | 'fintech'
  | 'healthcare'
  | 'education'
  | 'media'
  | 'nonprofit'
  | 'other';

export type RevenueBand = '<1m' | '1m-5m' | '5m-20m' | '20m-100m' | '>100m';

export type BudgetBand = '<5k' | '5k-15k' | '15k-50k' | '50k-150k' | '>150k';

export type Goal =
  | 'pipeline_growth'
  | 'cac_efficiency'
  | 'ltv_expansion'
  | 'brand_search'
  | 'geo_expansion'
  | 'product_launch'
  | 'category_education'
  | 'retention_improvement';

export type Channel =
  | 'paid_search'
  | 'paid_social'
  | 'seo_content'
  | 'lifecycle_email'
  | 'cro'
  | 'affiliates'
  | 'podcast_sponsorships'
  | 'offline_events'
  | 'pr_earned';

export type Role =
  | 'founder_ceo'
  | 'head_of_marketing'
  | 'growth_lead'
  | 'content_lead'
  | 'data_analyst'
  | 'product_marketing'
  | 'sales_ops'
  | 'none';

export type DecisionRights =
  | 'founder_only'
  | 'marketing_lead'
  | 'shared_committee'
  | 'unclear';

export type SourceOfTruth =
  | 'google_analytics'
  | 'mixpanel'
  | 'amplitude'
  | 'custom_bi'
  | 'multiple_conflicting'
  | 'none';

export type ReportingCadence =
  | 'ad_hoc'
  | 'monthly'
  | 'bi_weekly'
  | 'weekly'
  | 'daily';

export interface ScanInput {
  industry: Industry;
  revenueBand: RevenueBand;
  monthlyBudget: BudgetBand;
  goals: Goal[];
  inHouseRoles: Role[];
  decisionRights: DecisionRights;
  creativeCadence: number;
  croCadence: number;
  currentChannels: {
    channel: Channel;
    spendPercent: number;
  }[];
  plannedChannels: Channel[];
  sourceOfTruth: SourceOfTruth;
  reportingCadence: ReportingCadence;
  reportingOwner: boolean;
  kpiClarity: 'none' | 'vanity' | 'blended' | 'laddered';
  experimentationBudgetPercent: number;
  eventHygiene: 'none' | 'partial' | 'basic' | 'audited';
  constraints?: string;
  proposalConsent?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  referrer?: string;
  device?: string;
  geo?: string;
}

export interface PillarScore {
  pillar: 'strategy' | 'channel_fit' | 'ops' | 'measurement';
  score: number;
  maxScore: number;
  percentage: number;
  tier: 'excellent' | 'good' | 'fair' | 'poor';
  breakdown: {
    dimension: string;
    score: number;
    maxScore: number;
    rationale: string;
  }[];
}

export interface OverallScore {
  total: number;
  pillars: PillarScore[];
  fitTier: 'A' | 'B' | 'C';
  benchmarkNote: string;
}

export interface Flag {
  id: string;
  severity: 'critical' | 'high' | 'medium';
  title: string;
  description: string;
  evidence: string[];
  pillar: 'strategy' | 'channel_fit' | 'ops' | 'measurement';
  impact: string;
}

export interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  pillar: string;
  brokerService?: string;
  estimatedDays: number;
  priority: 1 | 2 | 3;
}

export interface ProposalAnalysis {
  summary: {
    deliverables: string[];
    outcomes: string[];
    kpisPresent: boolean;
    kpisList: string[];
    reportingCadence: string;
    experimentationBudget: string;
    decisionRights: string;
    pricingModel: string;
    changeOrderPolicy: string;
  };
  risks: {
    id: string;
    type: string;
    severity: 'high' | 'medium' | 'low';
    description: string;
    recommendation: string;
  }[];
  vendorQuestions: string[];
  redFlags: string[];
  greenFlags: string[];
}

export interface ScanResult {
  scanId: string;
  score: OverallScore;
  topFlags: Flag[];
  checklist: ChecklistItem[];
  apdAnalysis?: ProposalAnalysis;
  loomScript: string;
  generatedAt: string;
}
