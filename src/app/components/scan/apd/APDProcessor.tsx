'use client';

import { useState } from 'react';
import { Loader2 } from 'lucide-react';

interface Props {
  input: string;
}

export function APDProcessor({ input }: Props) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [summary, setSummary] = useState<string | null>(null);

  const handleAnalyze = async () => {
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 600));
    setSummary(
      input
        ? 'High-level risks: clarify KPIs, align reporting cadence, ensure experimentation budget is stated. Vendor questions auto-generated in the full platform.'
        : 'Paste a proposal to see a quick risk summary.',
    );
    setIsProcessing(false);
  };

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={handleAnalyze}
        className="bg-brand-blue text-white px-4 py-2 rounded-lg font-semibold hover:bg-brand-blue/90 transition-colors inline-flex items-center gap-2"
      >
        {isProcessing && <Loader2 className="w-4 h-4 animate-spin" />}
        Analyze proposal
      </button>
      {summary && (
        <div className="bg-info/10 border border-info rounded-lg p-4 text-sm text-brand-navy">{summary}</div>
      )}
    </div>
  );
}
