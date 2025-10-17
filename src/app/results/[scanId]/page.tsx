'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ScoreOverview } from '@/app/components/results/ScoreOverview';
import { PillarHeatmap } from '@/app/components/results/PillarHeatmap';
import { TopFlags } from '@/app/components/results/TopFlags';
import { FixFirstChecklist } from '@/app/components/results/FixFirstChecklist';
import { BookingCTA } from '@/app/components/results/BookingCTA';
import type { ScanResult, ScanInput } from '@/lib/types';

export default function ResultsPage() {
  const params = useParams<{ scanId: string }>();
  const router = useRouter();
  const [result, setResult] = useState<ScanResult | null>(null);
  const [input, setInput] = useState<ScanInput | null>(null);

  useEffect(() => {
    if (!params?.scanId) return;
    const cacheRaw = sessionStorage.getItem('brokr-scan-results');
    const cache = cacheRaw ? (JSON.parse(cacheRaw) as Record<string, ScanResult>) : {};
    const storedResult = cache[params.scanId];
    const storedInput = sessionStorage.getItem(`brokr-scan-input-${params.scanId}`);

    if (!storedResult || !storedInput) {
      router.replace('/scan');
      return;
    }

    setResult(storedResult);
    setInput(JSON.parse(storedInput));
  }, [params?.scanId, router]);

  if (!result || !input) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <div className="text-center">
          <p className="text-neutral-600">Preparing your results...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 py-12">
      <div className="container mx-auto px-6 max-w-6xl space-y-12">
        <header className="text-center space-y-4">
          <span className="badge-gold">Brokr Readiness Report</span>
          <h1 className="text-4xl font-bold text-brand-navy">Your Agency-Fit Risk Scan</h1>
          <p className="text-neutral-700 max-w-2xl mx-auto">
            These insights are private to you. Save the PDF, share with stakeholders, and bring the fix-first checklist to your next agency conversation.
          </p>
        </header>

        <section className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 items-stretch">
          <ScoreOverview score={result.score} />
          <PillarHeatmap pillars={result.score.pillars} />
        </section>

        <section className="grid lg:grid-cols-2 gap-8">
          <TopFlags flags={result.topFlags} />
          <FixFirstChecklist items={result.checklist} />
        </section>

        <section className="grid lg:grid-cols-[1fr_1fr] gap-8 items-start">
          <div className="bg-base rounded-xl shadow-card border border-neutral-100 p-6">
            <h2 className="text-2xl font-semibold text-brand-navy mb-4">Suggested Loom Talk-Track</h2>
            <p className="text-neutral-700 whitespace-pre-line leading-relaxed">{result.loomScript}</p>
          </div>
          <BookingCTA fitTier={result.score.fitTier} onBookClick={() => router.push('/scan?mode=book')} />
        </section>

        <section className="bg-base rounded-xl shadow-card border border-neutral-100 p-6">
          <h2 className="text-xl font-semibold text-brand-navy mb-3">What we captured</h2>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-neutral-700">
            <div>
              <p className="font-semibold text-brand-navy mb-1">Industry</p>
              <p>{input.industry.replace(/_/g, ' ')}</p>
            </div>
            <div>
              <p className="font-semibold text-brand-navy mb-1">Top Goals</p>
              <p>{input.goals.map((goal) => goal.replace(/_/g, ' ')).join(', ')}</p>
            </div>
            <div>
              <p className="font-semibold text-brand-navy mb-1">Channel Mix</p>
              <p>
                {input.currentChannels
                  .map((channel) => `${channel.channel.replace(/_/g, ' ')} (${channel.spendPercent}%)`)
                  .join(', ')}
              </p>
            </div>
            <div>
              <p className="font-semibold text-brand-navy mb-1">Measurement Stack</p>
              <p>{input.sourceOfTruth.replace(/_/g, ' ')}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
