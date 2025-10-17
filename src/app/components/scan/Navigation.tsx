'use client';

import { ArrowLeft, ArrowRight } from 'lucide-react';

interface Props {
  onBack?: () => void;
  onNext: () => void;
  nextLabel?: string;
  nextDisabled?: boolean;
  showBack?: boolean;
  isLastStep?: boolean;
}

export function Navigation({
  onBack,
  onNext,
  nextLabel = 'Continue',
  nextDisabled = false,
  showBack = true,
  isLastStep = false,
}: Props) {
  return (
    <div className="flex items-center justify-between pt-8 border-t border-neutral-200">
      {showBack ? (
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-6 py-3 text-neutral-700 hover:text-brand-navy font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
      ) : (
        <div />
      )}

      <button
        onClick={onNext}
        disabled={nextDisabled}
        className={`inline-flex items-center gap-2 px-8 py-3 rounded-lg font-semibold transition-all ${
          nextDisabled
            ? 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
            : isLastStep
            ? 'bg-brand-gold text-brand-navy hover:bg-brand-gold/90 shadow-gold'
            : 'bg-brand-blue text-white hover:bg-brand-blue/90 shadow-blue'
        }`}
      >
        {nextLabel}
        {!isLastStep && <ArrowRight className="w-4 h-4" />}
      </button>
    </div>
  );
}
