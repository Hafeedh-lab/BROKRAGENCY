'use client';

import { Sparkles, ArrowRight, Shield } from 'lucide-react';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-base">
      <section className="relative bg-gradient-brand py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(245,180,0,0.15),transparent_50%)]" />
        </div>

        <div className="container mx-auto px-6 max-w-6xl relative">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-gold/15 border border-brand-gold/30 rounded-full mb-6">
              <Shield className="w-4 h-4 text-brand-gold" />
              <span className="text-sm font-semibold text-white">
                100+ Marketing Leaders Trust This Scan
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Avoid the 12–18 month agency churn cycle
            </h1>

            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              Get a score, spot red flags, and leave with a 30-day fix-first plan—before you spend.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/scan"
                className="group bg-white text-brand-navy hover:bg-neutral-100 px-8 py-4 rounded-lg font-semibold shadow-lg transition-all inline-flex items-center justify-center gap-2"
              >
                Run the 7-Minute Scan
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/scan?mode=apd"
                className="border-2 border-white text-white hover:bg-white/10 px-8 py-4 rounded-lg font-semibold transition-all inline-flex items-center justify-center gap-2"
              >
                <Sparkles className="w-5 h-5" />
                Decode a Proposal
              </Link>
            </div>

            <p className="text-sm text-white/70 mt-6">
              ✓ No credit card  ✓ Results in 60 seconds  ✓ Free PDF report
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-neutral-100">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
            <ValueProp
              icon="🎯"
              title="Strategy Clarity"
              description="Assess goal-channel-budget alignment in minutes"
            />
            <ValueProp
              icon="⚙️"
              title="Ops Readiness"
              description="Identify execution gaps before you sign"
            />
            <ValueProp
              icon="📊"
              title="Measurement Maturity"
              description="Ensure you can prove ROI and iterate"
            />
          </div>
        </div>
      </section>
    </main>
  );
}

function ValueProp({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="bg-base rounded-xl p-6 shadow-card border border-neutral-200 hover:shadow-card-hover transition-shadow">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-brand-navy mb-2">{title}</h3>
      <p className="text-neutral-700">{description}</p>
    </div>
  );
}
