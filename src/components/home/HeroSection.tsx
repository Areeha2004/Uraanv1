'use client';

import React from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Crown,
  PlayCircle,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
} from 'lucide-react';

const trustSignals = [
  {
    icon: Target,
    title: 'Personalized Strategy',
    detail: 'AI maps your strengths to a business model that fits your reality.',
  },
  {
    icon: ShieldCheck,
    title: 'Proven Framework',
    detail: 'Battle-tested execution plans from idea validation to first revenue.',
  },
  {
    icon: TrendingUp,
    title: 'Growth Built-In',
    detail: 'Milestone tracking, accountability prompts, and market-facing playbooks.',
  },
];

const launchFlow = [
  { step: '01', title: 'Profile Intelligence', text: 'Decode your skills, time, and goals.' },
  { step: '02', title: 'Business Matchmaking', text: 'Get ideas tailored for demand and feasibility.' },
  { step: '03', title: 'Execution Engine', text: 'Follow a practical roadmap to launch confidently.' },
];

const HeroSection: React.FC = () => {
  return (
    <section className="relative isolate overflow-hidden px-4 pb-24 pt-16 sm:px-6 lg:px-8 lg:pt-20">
      <div className="aurora-bg absolute inset-0" />
      <div className="luxury-grid absolute inset-0 opacity-[0.22]" />
      <div className="pointer-events-none absolute -left-24 top-24 h-80 w-80 rounded-full bg-primary/20 blur-3xl animate-float-gentle" />
      <div className="pointer-events-none absolute -right-16 top-40 h-96 w-96 rounded-full bg-accent2/20 blur-3xl animate-float-delayed" />
      <div className="pointer-events-none absolute bottom-8 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-secondary/40 blur-3xl animate-float-gentle" />

      <div className="relative mx-auto w-full max-w-7xl">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-baby-powder/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-primary backdrop-blur-md animate-reveal-up">
              <Crown size={14} />
              Elite Launch Platform
            </div>

            <h1 className="font-display animate-reveal-up text-5xl leading-[0.97] tracking-tight text-text sm:text-6xl lg:text-7xl">
              Build a business
              <span className="mt-3 block bg-gradient-to-r from-primary via-primary-light to-accent2 bg-clip-text text-transparent">
                that looks premium
              </span>
              <span className="mt-2 block text-text/80">and performs like one.</span>
            </h1>

            <p className="animate-reveal-up mt-7 max-w-2xl text-lg leading-relaxed text-text/75 sm:text-xl">
              URAAN helps ambitious women founders in Pakistan move from uncertainty to execution with AI-guided strategy, polished roadmaps, and an ecosystem built for momentum.
            </p>

            <div className="animate-reveal-up mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                href="/QuizPage"
                className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-primary to-primary-light px-7 py-4 text-base font-semibold text-baby-powder shadow-[0_18px_40px_-20px_rgba(138,31,74,0.8)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_30px_60px_-22px_rgba(138,31,74,0.95)]"
              >
                Discover Your Launch Blueprint
                <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/ExplorePage"
                className="group inline-flex items-center justify-center gap-2 rounded-2xl border border-text/15 bg-baby-powder/80 px-7 py-4 text-base font-semibold text-text backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/35 hover:bg-baby-powder"
              >
                <PlayCircle size={18} className="text-primary transition-transform duration-300 group-hover:scale-110" />
                Explore Business Ideas
              </Link>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {trustSignals.map((signal, index) => (
                <div
                  key={signal.title}
                  className="premium-card animate-reveal-up rounded-2xl p-4"
                  style={{ animationDelay: `${index * 130}ms` }}
                >
                  <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent2 text-baby-powder">
                    <signal.icon size={18} />
                  </div>
                  <p className="text-sm font-semibold text-text">{signal.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-text/70">{signal.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="animate-reveal-up relative overflow-hidden rounded-[2rem] border border-primary/15 bg-baby-powder/75 p-6 shadow-[0_35px_90px_-45px_rgba(46,30,74,0.6)] backdrop-blur-xl">
              <div className="absolute right-5 top-5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                New Season
              </div>

              <div className="mb-7">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-text/55">Founder Command Room</p>
                <h3 className="font-display mt-3 text-3xl leading-tight text-text">
                  Your elite launch console
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-text/70">
                  A guided path designed to reduce noise and keep your execution focused week after week.
                </p>
              </div>

              <div className="space-y-3">
                {launchFlow.map((item) => (
                  <div key={item.step} className="rounded-2xl border border-text/10 bg-baby-powder/90 p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-xs font-semibold tracking-[0.12em] text-primary">{item.step}</span>
                      <Sparkles size={14} className="text-accent2" />
                    </div>
                    <p className="text-sm font-semibold text-text">{item.title}</p>
                    <p className="mt-1 text-sm text-text/65">{item.text}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-gradient-to-br from-primary to-primary-light p-4 text-baby-powder animate-glow-soft">
                  <p className="text-xs uppercase tracking-[0.12em] text-baby-powder/80">Community Revenue</p>
                  <p className="mt-2 text-2xl font-bold">PKR 5Cr+</p>
                </div>
                <div className="rounded-2xl border border-primary/20 bg-baby-powder/90 p-4">
                  <p className="text-xs uppercase tracking-[0.12em] text-text/55">Completion Rate</p>
                  <p className="mt-2 text-2xl font-bold text-primary">95%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
