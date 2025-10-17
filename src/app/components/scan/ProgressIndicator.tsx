'use client';

import { CheckCircle2 } from 'lucide-react';

interface Props {
  currentStep: number;
  totalSteps: number;
  stepTitles?: string[];
}

export function ProgressIndicator({ currentStep, totalSteps, stepTitles }: Props) {
  const percentage = Math.round((currentStep / totalSteps) * 100);
  const timeRemaining = Math.max(1, Math.ceil((totalSteps - currentStep) * 0.5));

  return (
    <div className="mb-8">
      {stepTitles && (
        <div className="flex justify-between mb-4">
          {stepTitles.map((title, index) => {
            const stepNumber = index + 1;
            const isCompleted = stepNumber < currentStep;
            const isCurrent = stepNumber === currentStep;

            return (
              <div
                key={title}
                className={`flex items-center gap-2 text-sm ${
                  isCompleted
                    ? 'text-score-excellent'
                    : isCurrent
                    ? 'text-brand-blue font-semibold'
                    : 'text-neutral-400'
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-4 h-4" />
                ) : (
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${
                      isCurrent ? 'bg-brand-blue text-white' : 'bg-neutral-200 text-neutral-500'
                    }`}
                  >
                    {stepNumber}
                  </span>
                )}
                <span className="hidden sm:inline">{title}</span>
              </div>
            );
          })}
        </div>
      )}

      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-semibold text-brand-navy">
          Question {currentStep} of {totalSteps}
        </span>
        <span className="text-sm text-neutral-700">~{timeRemaining} min remaining</span>
      </div>

      <div className="h-2.5 bg-neutral-100 rounded-full overflow-hidden shadow-inner">
        <div
          className="h-full bg-brand-blue transition-all duration-300 ease-out rounded-full shadow-sm"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
