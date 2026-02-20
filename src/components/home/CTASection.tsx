import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

const CTASection: React.FC = () => {
  return (
    <section className="relative px-4 pb-16 pt-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="relative overflow-hidden rounded-[1.9rem] border border-primary/20 bg-gradient-to-br from-primary via-primary-light to-accent2 p-6 text-baby-powder shadow-[0_26px_70px_-42px_rgba(46,30,74,0.95)] md:p-9">
          <div className="pointer-events-none absolute -left-14 top-6 h-44 w-44 rounded-full border border-baby-powder/25" />
          <div className="pointer-events-none absolute -right-16 bottom-4 h-56 w-56 rounded-full border border-baby-powder/20" />
          <div className="pointer-events-none absolute inset-0 opacity-70">
            <div className="absolute left-1/4 top-0 h-full w-px bg-baby-powder/10" />
            <div className="absolute right-1/4 top-0 h-full w-px bg-baby-powder/10" />
          </div>

          <div className="relative mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-baby-powder/35 bg-baby-powder/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] backdrop-blur-md">
              <Sparkles size={14} />
              Premium Founder Journey
            </div>
            <h2 className="font-display mt-5 text-3xl leading-tight md:text-4xl">
              Start building the brand and business you actually envision
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-baby-powder/90">
              Take the AI discovery quiz, get your roadmap, and launch with the confidence of a founder who has a clear system behind her.
            </p>

            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/QuizPage"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-baby-powder px-6 py-3 text-sm font-semibold text-primary transition-all duration-300 hover:-translate-y-0.5 hover:bg-baby-powder/90"
              >
                Start Your Strategy Quiz
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/SignupPage"
                className="inline-flex items-center justify-center rounded-xl border border-baby-powder/60 px-6 py-3 text-sm font-semibold text-baby-powder transition-all duration-300 hover:-translate-y-0.5 hover:bg-baby-powder hover:text-primary"
              >
                Create Free Account
              </Link>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3 text-left sm:grid-cols-3">
              <div className="rounded-xl border border-baby-powder/25 bg-baby-powder/10 p-3">
                <p className="text-xs uppercase tracking-[0.12em] text-baby-powder/70">Cost</p>
                <p className="mt-1 text-base font-bold">Free to begin</p>
              </div>
              <div className="rounded-xl border border-baby-powder/25 bg-baby-powder/10 p-3">
                <p className="text-xs uppercase tracking-[0.12em] text-baby-powder/70">Quiz time</p>
                <p className="mt-1 text-base font-bold">Under 5 minutes</p>
              </div>
              <div className="rounded-xl border border-baby-powder/25 bg-baby-powder/10 p-3">
                <p className="text-xs uppercase tracking-[0.12em] text-baby-powder/70">Experience needed</p>
                <p className="mt-1 text-base font-bold">None required</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
