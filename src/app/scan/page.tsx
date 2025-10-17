'use client';

import { useEffect, useMemo, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { QUESTION_STEPS, scanInputSchema, type ScanFormValues } from '@/config/questions';
import { ProgressIndicator } from '@/app/components/scan/ProgressIndicator';
import { QuestionCard, OptionCard } from '@/app/components/scan/QuestionCard';
import { Navigation } from '@/app/components/scan/Navigation';
import { scoreScan } from '@/lib/scoring';
import { detectFlags } from '@/lib/flags/detector';
import { buildChecklist } from '@/lib/checklist/generator';
import { generateLoomScript } from '@/lib/ai/loom-script';
import { APDUploader } from '@/app/components/scan/apd/APDUploader';
import { APDPaster } from '@/app/components/scan/apd/APDPaster';
import { APDProcessor } from '@/app/components/scan/apd/APDProcessor';
import type { ScanResult } from '@/lib/types';

const STORAGE_KEY = 'brokr-scan-progress-v1';

const DEFAULT_VALUES: ScanFormValues = {
  industry: 'b2b_saas',
  revenueBand: '1m-5m',
  monthlyBudget: '15k-50k',
  goals: ['pipeline_growth'],
  inHouseRoles: ['head_of_marketing'],
  decisionRights: 'marketing_lead',
  creativeCadence: 4,
  croCadence: 2,
  currentChannels: [
    {
      channel: 'paid_search',
      spendPercent: 50,
    },
    {
      channel: 'paid_social',
      spendPercent: 50,
    },
  ],
  plannedChannels: ['seo_content'],
  sourceOfTruth: 'google_analytics',
  reportingCadence: 'monthly',
  reportingOwner: true,
  kpiClarity: 'blended',
  experimentationBudgetPercent: 10,
  eventHygiene: 'basic',
  constraints: '',
  proposalConsent: '',
};

type Step = (typeof QUESTION_STEPS)[number];

type ResultsCache = Record<string, ScanResult>;

const persistResults = (result: ScanResult) => {
  if (typeof window === 'undefined') return;
  const cache: ResultsCache = JSON.parse(sessionStorage.getItem('brokr-scan-results') ?? '{}');
  cache[result.scanId] = result;
  sessionStorage.setItem('brokr-scan-results', JSON.stringify(cache));
};

const loadProgress = (): ScanFormValues | null => {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    return scanInputSchema.partial().parse(parsed) as ScanFormValues;
  } catch (error) {
    console.warn('Failed to parse stored progress', error);
    return null;
  }
};

export default function ScanPage() {
  const router = useRouter();
  const params = useSearchParams();
  const isAPDMode = params.get('mode') === 'apd';

  const [stepIndex, setStepIndex] = useState(0);
  const [proposalText, setProposalText] = useState('');
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);

  const form = useForm<ScanFormValues>({
    resolver: zodResolver(scanInputSchema),
    defaultValues: DEFAULT_VALUES,
    mode: 'onChange',
  });

  const { control, watch, setValue, getValues, trigger } = form;
  const { fields, append, remove } = useFieldArray({ control, name: 'currentChannels' });

  useEffect(() => {
    const stored = loadProgress();
    if (stored) {
      Object.entries(stored).forEach(([key, value]) => {
        const typedKey = key as keyof ScanFormValues;
        setValue(typedKey, value as never, { shouldDirty: false });
      });
      setProposalText(stored.proposalConsent ?? '');
    }
  }, [setValue]);

  useEffect(() => {
    const subscription = watch((values) => {
      if (typeof window === 'undefined') return;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(values));
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const currentStep = QUESTION_STEPS[stepIndex];
  const totalSteps = QUESTION_STEPS.length;

  const handleNext = async () => {
    const step = QUESTION_STEPS[stepIndex];
    const field = step.id as keyof ScanFormValues;
    const isValid = await trigger(field as any);

    if (!isValid) {
      return;
    }

    if (stepIndex === totalSteps - 1) {
      await handleSubmit();
    } else {
      setStepIndex((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (stepIndex === 0) return;
    setStepIndex((prev) => prev - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = form.handleSubmit((values) => {
    const scanId = crypto.randomUUID();
    const score = scoreScan(values);
    const flags = detectFlags(values);
    const checklist = buildChecklist(score, flags, values);
    const loomScript = generateLoomScript(score, flags);

    const result: ScanResult = {
      scanId,
      score,
      topFlags: flags,
      checklist,
      loomScript,
      generatedAt: new Date().toISOString(),
    };

    persistResults(result);
    sessionStorage.setItem(`brokr-scan-input-${scanId}`, JSON.stringify(values));
    router.push(`/results/${scanId}`);
  });

  const stepTitles = useMemo(() => QUESTION_STEPS.map((step) => step.title), []);

  const values = getValues();

  return (
    <div className="min-h-screen bg-neutral-50 py-12">
      <div className="container mx-auto max-w-3xl px-6">
        <div className="mb-10">
          <span className="badge-gold mb-4 inline-flex">7-Minute Diagnostic</span>
          <h1 className="text-4xl font-bold text-brand-navy mb-4">
            Agency-Fit Risk Scan
          </h1>
          <p className="text-neutral-700 text-lg">
            {isAPDMode
              ? 'Start with the Agency Proposal Decoder to unpack scope and risk, then complete the readiness scan.'
              : 'Answer 12 quick questions to benchmark readiness, surface risk, and leave with a fix-first checklist.'}
          </p>
        </div>

        <ProgressIndicator currentStep={stepIndex + 1} totalSteps={totalSteps} stepTitles={stepTitles} />

        <form onSubmit={(event) => event.preventDefault()} className="space-y-8">
          {renderStep(
            currentStep,
            form,
            fields,
            append,
            remove,
            proposalText,
            setProposalText,
            setUploadedFile,
            uploadedFile,
          )}

          <Navigation
            onBack={handleBack}
            onNext={handleNext}
            showBack={stepIndex > 0}
            isLastStep={stepIndex === totalSteps - 1}
            nextLabel={stepIndex === totalSteps - 1 ? 'Generate Results' : 'Continue'}
          />
        </form>
      </div>
    </div>
  );
}

type FormCtx = ReturnType<typeof useForm<ScanFormValues>>;

type FieldArrayItem = {
  id: string;
  channel: string;
  spendPercent: number;
};

function renderStep(
  step: Step,
  form: FormCtx,
  fields: FieldArrayItem[],
  append: (value: { channel: string; spendPercent: number }) => void,
  remove: (index: number) => void,
  proposalText: string,
  setProposalText: (value: string) => void,
  setUploadedFile: (value: string | null) => void,
  uploadedFile: string | null,
) {
  const { register, setValue, watch } = form;
  const values = watch();

  switch (step.type) {
    case 'single':
      return (
        <QuestionCard question={step.title} helpText={step.description}>
          <div className="grid gap-3">
            {step.options?.map((option) => {
              const selected = values[step.id as keyof ScanFormValues] === option.value;
              return (
                <OptionCard
                  key={option.value}
                  label={option.label}
                  description={option.description}
                  selected={selected}
                  onClick={() => setValue(step.id as keyof ScanFormValues, option.value as never)}
                />
              );
            })}
          </div>
        </QuestionCard>
      );
    case 'multi':
      return (
        <QuestionCard question={step.title} helpText={step.description}>
          <div className="grid gap-3">
            {step.options?.map((option) => {
              const current = (values[step.id as keyof ScanFormValues] as string[] | undefined) ?? [];
              const isSelected = current.includes(option.value);
              const toggle = () => {
                let next = current;
                if (isSelected) {
                  next = current.filter((item) => item !== option.value);
                } else {
                  if (step.maxSelections && current.length >= step.maxSelections) {
                    return;
                  }
                  next = [...current, option.value];
                }
                setValue(step.id as keyof ScanFormValues, next as never);
              };

              return (
                <OptionCard
                  key={option.value}
                  label={option.label}
                  description={option.description}
                  selected={isSelected}
                  onClick={toggle}
                  type="checkbox"
                />
              );
            })}
          </div>
          {step.maxSelections && (
            <p className="text-xs text-neutral-600 mt-2">
              Select up to {step.maxSelections}. Currently selected
              {' '}
              {((values[step.id as keyof ScanFormValues] as string[] | undefined) ?? []).length}
            </p>
          )}
        </QuestionCard>
      );
    case 'numeric':
      return (
        <QuestionCard question={step.title} helpText={step.description}>
          <input
            type="number"
            min={0}
            className="form-input max-w-xs"
            {...register(step.id as keyof ScanFormValues, { valueAsNumber: true })}
          />
        </QuestionCard>
      );
    case 'text':
      if (step.id === 'proposalConsent') {
        return (
          <QuestionCard question={step.title} helpText={step.description}>
            <div className="space-y-4">
              <APDPaster
                value={proposalText}
                onChange={(value) => {
                  setProposalText(value);
                  setValue('proposalConsent', value as never);
                }}
              />
              <APDUploader
                onUpload={(file) => {
                  setUploadedFile(file.name);
                  setProposalText(`Uploaded file: ${file.name}`);
                  setValue('proposalConsent', `uploaded:${file.name}` as never);
                }}
              />
              {uploadedFile && (
                <p className="text-sm text-neutral-600">Uploaded: {uploadedFile}</p>
              )}
              <APDProcessor input={proposalText} />
            </div>
          </QuestionCard>
        );
      }
      return (
        <QuestionCard question={step.title} helpText={step.description}>
          <textarea
            rows={4}
            className="form-textarea"
            {...register(step.id as keyof ScanFormValues)}
            placeholder="Optional"
          />
        </QuestionCard>
      );
    case 'grid':
      return (
        <QuestionCard question={step.title} helpText={step.description}>
          <div className="space-y-4">
            {fields.map((field, index) => (
              <div key={field.id} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-brand-navy block mb-1">Channel</label>
                  <select
                    className="form-select"
                    {...register(`currentChannels.${index}.channel` as const)}
                  >
                    <option value="paid_search">Paid Search</option>
                    <option value="paid_social">Paid Social</option>
                    <option value="seo_content">SEO & Content</option>
                    <option value="lifecycle_email">Lifecycle Email</option>
                    <option value="cro">CRO</option>
                    <option value="affiliates">Affiliates</option>
                    <option value="podcast_sponsorships">Podcast Sponsorships</option>
                    <option value="offline_events">Offline Events</option>
                    <option value="pr_earned">PR / Earned Media</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-semibold text-brand-navy block mb-1">Spend %</label>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    className="form-input"
                    {...register(`currentChannels.${index}.spendPercent` as const, { valueAsNumber: true })}
                  />
                </div>
                {fields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="text-sm text-danger hover:underline"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => append({ channel: 'paid_search', spendPercent: 0 })}
              className="text-brand-blue text-sm font-semibold"
            >
              + Add channel
            </button>
          </div>
        </QuestionCard>
      );
    default:
      return null;
  }
}
