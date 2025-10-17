'use client';

import { HelpCircle } from 'lucide-react';
import type { ReactNode } from 'react';

interface QuestionCardProps {
  question: string;
  helpText?: string;
  children: ReactNode;
}

export function QuestionCard({ question, helpText, children }: QuestionCardProps) {
  return (
    <div className="bg-base rounded-xl shadow-card border border-neutral-100 p-8 hover:shadow-card-hover transition-shadow">
      <div className="flex items-start gap-3 mb-6">
        <div className="flex-1">
          <h3 className="text-2xl font-semibold text-brand-navy leading-tight">{question}</h3>
        </div>

        {helpText && (
          <span className="text-neutral-400" title={helpText}>
            <HelpCircle className="w-5 h-5" />
          </span>
        )}
      </div>

      <div className="space-y-3">{children}</div>
    </div>
  );
}

interface OptionProps {
  label: string;
  description?: string;
  selected: boolean;
  onClick: () => void;
  type?: 'radio' | 'checkbox';
}

const baseClasses =
  'flex items-start gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all bg-base';

export function OptionCard({ label, description, selected, onClick, type = 'radio' }: OptionProps) {
  return (
    <label
      className={`${baseClasses} ${
        selected
          ? 'border-brand-blue bg-brand-blue/5 shadow-sm'
          : 'border-neutral-200 hover:border-brand-blue/50'
      }`}
      onClick={onClick}
    >
      <input
        type={type}
        checked={selected}
        onChange={onClick}
        className={`${type === 'checkbox' ? 'form-checkbox' : 'form-radio'} mt-0.5`}
      />

      <div className="flex-1">
        <div className={`font-medium ${selected ? 'text-brand-navy' : 'text-neutral-900'}`}>{label}</div>
        {description && <div className="text-sm text-neutral-700 mt-1">{description}</div>}
      </div>
    </label>
  );
}
