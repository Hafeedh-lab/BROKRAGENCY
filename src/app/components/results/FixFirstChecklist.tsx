'use client';

import { CheckSquare, Clock, Zap } from 'lucide-react';
import type { ChecklistItem } from '@/lib/types';

interface Props {
  items: ChecklistItem[];
}

export function FixFirstChecklist({ items }: Props) {
  const getPriorityBadge = (priority: ChecklistItem['priority']) => {
    if (priority === 1) {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-danger/10 text-danger text-xs font-semibold rounded">
          <Zap className="w-3 h-3" />
          Start Here
        </span>
      );
    }

    if (priority === 2) {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-brand-gold/10 text-brand-navy text-xs font-semibold rounded">
          Week 2
        </span>
      );
    }

    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-neutral-200 text-neutral-700 text-xs font-semibold rounded">
        Week 3-4
      </span>
    );
  };

  return (
    <div className="bg-base rounded-xl shadow-card border border-neutral-100 p-6">
      <div className="flex items-center gap-2 mb-6">
        <CheckSquare className="w-6 h-6 text-brand-blue" />
        <h3 className="text-lg font-semibold text-brand-navy">30-Day Fix-First Checklist</h3>
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-neutral-50 rounded-lg p-4 border border-neutral-200 hover:border-brand-blue/50 transition-colors"
          >
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex items-start gap-3 flex-1">
                <input type="checkbox" className="mt-1 form-checkbox" />
                <div>
                  <div className="font-semibold text-brand-navy mb-1">{item.title}</div>
                  <p className="text-sm text-neutral-700 leading-relaxed">{item.description}</p>
                </div>
              </div>
              <div className="flex-shrink-0">{getPriorityBadge(item.priority)}</div>
            </div>

            <div className="flex items-center gap-4 ml-9 mt-3 text-xs text-neutral-600">
              <div className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>{item.estimatedDays} days</span>
              </div>

              {item.brokerService && (
                <div className="flex items-center gap-1">
                  <span className="text-brand-blue font-medium">Brokr can help: {item.brokerService}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-neutral-200">
        <p className="text-sm text-neutral-700 mb-3">
          These quick wins strengthen your readiness and improve agency partnership outcomes.
        </p>
        <button className="text-brand-blue hover:text-brand-blue/80 font-semibold text-sm inline-flex items-center gap-1 transition-colors">
          Talk to us about implementation
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
