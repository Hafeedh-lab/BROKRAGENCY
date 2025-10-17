'use client';

import { AlertTriangle, AlertCircle, Info } from 'lucide-react';
import type { Flag } from '@/lib/types';

interface Props {
  flags: Flag[];
}

export function TopFlags({ flags }: Props) {
  const getFlagStyles = (severity: Flag['severity']) => {
    switch (severity) {
      case 'critical':
        return {
          bg: 'bg-danger/10',
          border: 'border-danger',
          icon: AlertTriangle,
          iconColor: 'text-danger',
          textColor: 'text-danger',
          label: 'CRITICAL',
        } as const;
      case 'high':
        return {
          bg: 'bg-warning/10',
          border: 'border-warning',
          icon: AlertCircle,
          iconColor: 'text-brand-gold',
          textColor: 'text-brand-navy',
          label: 'HIGH PRIORITY',
        } as const;
      default:
        return {
          bg: 'bg-info/10',
          border: 'border-info',
          icon: Info,
          iconColor: 'text-brand-blue',
          textColor: 'text-brand-navy',
          label: 'MODERATE',
        } as const;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-brand-navy">Top 3 Red Flags</h3>
        <span className="text-sm text-neutral-700">Address these first</span>
      </div>

      {flags.map((flag, index) => {
        const styles = getFlagStyles(flag.severity);
        const Icon = styles.icon;

        return (
          <div key={flag.id} className={`${styles.bg} border-l-4 ${styles.border} p-5 rounded-r-lg shadow-sm`}>
            <div className="flex items-start gap-3 mb-3">
              <Icon className={`w-5 h-5 ${styles.iconColor} mt-0.5 flex-shrink-0`} />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-xs font-bold ${styles.iconColor}`}>{styles.label}</span>
                  <span className="text-xs text-neutral-500">• {flag.pillar.replace(/_/g, ' ')}</span>
                </div>
                <div className={`text-base font-semibold ${styles.textColor}`}>
                  {index + 1}. {flag.title}
                </div>
              </div>
            </div>

            <p className="text-sm text-neutral-900 mb-3 leading-relaxed">{flag.description}</p>

            {flag.evidence.length > 0 && (
              <div className="mb-3">
                <div className="text-xs font-semibold text-neutral-700 mb-1">Evidence:</div>
                <ul className="text-xs text-neutral-700 space-y-0.5">
                  {flag.evidence.map((item, i) => (
                    <li key={i}>• {item}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="bg-base/50 rounded px-3 py-2 border border-neutral-200">
              <div className="text-xs font-semibold text-brand-navy mb-1">Impact:</div>
              <div className="text-xs text-neutral-900">{flag.impact}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
