'use client';

import { Calendar, ArrowRight, Clock } from 'lucide-react';

interface Props {
  fitTier: 'A' | 'B' | 'C';
  onBookClick: () => void;
}

export function BookingCTA({ fitTier, onBookClick }: Props) {
  const getTierMessage = (tier: Props['fitTier']) => {
    switch (tier) {
      case 'A':
        return {
          headline: "You're ready to scale with discipline",
          subtext: "Let's map your execution plan in a 20-minute strategy triage.",
          cta: 'Book Strategy Triage',
        } as const;
      case 'B':
        return {
          headline: 'A fix-first sprint will strengthen your foundation',
          subtext: "We'll prioritize your gaps and scope a 2-week sprint.",
          cta: 'Book Fix-First Review',
        } as const;
      default:
        return {
          headline: "Let's build your foundations first",
          subtext: "We'll discuss the roadmap to agency-ready in 30-90 days.",
          cta: 'Book Readiness Consult',
        } as const;
    }
  };

  const message = getTierMessage(fitTier);

  return (
    <div className="bg-gradient-brand rounded-2xl p-8 text-center shadow-blue overflow-hidden relative">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(245,180,0,0.2),transparent_50%)]" />
      </div>

      <div className="relative">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-gold/20 border border-brand-gold/30 rounded-full mb-4">
          <Clock className="w-4 h-4 text-brand-gold" />
          <span className="text-sm font-semibold text-white">20 Minutes • No Obligation</span>
        </div>

        <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">{message.headline}</h3>

        <p className="text-lg text-white/90 mb-6 max-w-2xl mx-auto">{message.subtext}</p>

        <button
          onClick={onBookClick}
          className="group bg-white text-brand-navy hover:bg-neutral-100 px-8 py-4 rounded-lg font-semibold shadow-lg transition-all inline-flex items-center gap-2"
        >
          <Calendar className="w-5 h-5" />
          {message.cta}
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>

        <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm text-white/80">
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            Custom talk-track
          </div>
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            Action plan
          </div>
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            Next steps
          </div>
        </div>
      </div>
    </div>
  );
}
