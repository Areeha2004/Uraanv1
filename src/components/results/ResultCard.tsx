'use client';

import React from 'react';
import {
  ArrowRight,
  Clock,
  DollarSign,
  Sparkles,
  Star,
  TrendingUp,
  Users,
} from 'lucide-react';

interface ResultCardProps {
  result: {
    id: string;
    title: string;
    description: string;
    match: number;
    timeline: string;
    investment: string;
    platforms: string[];
    benefits: string[];
    image: string;
  };
  index: number;
  onStart?: () => void;
}

const ResultCard: React.FC<ResultCardProps> = ({ result, index, onStart }) => {
  return (
    <article className="premium-card group overflow-hidden rounded-[2rem] p-4 sm:p-5">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.25fr_0.75fr]">
        <div className="space-y-5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full border border-amber-300/40 bg-amber-100/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.1em] text-amber-700">
              <Star size={12} fill="currentColor" />
              {result.match}% Match
            </span>
            <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.1em] text-primary">
              #{index + 1} Recommended
            </span>
          </div>

          <div>
            <h3 className="font-display text-3xl leading-tight text-text">{result.title}</h3>
            <p className="mt-3 text-primary leading-relaxed text-text/72">{result.description}</p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-primary/15 bg-baby-powder/85 p-3">
              <div className="mb-2 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Clock size={15} />
              </div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-text/55">Timeline</p>
              <p className="mt-1 text-sm font-semibold text-text">{result.timeline}</p>
            </div>
            <div className="rounded-2xl border border-primary/15 bg-baby-powder/85 p-3">
              <div className="mb-2 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <DollarSign size={15} />
              </div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-text/55">Investment</p>
              <p className="mt-1 text-sm font-semibold text-text">{result.investment}</p>
            </div>
            <div className="rounded-2xl border border-primary/15 bg-baby-powder/85 p-3">
              <div className="mb-2 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <TrendingUp size={15} />
              </div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-text/55">Potential</p>
              <p className="mt-1 text-sm font-semibold text-text">High Growth</p>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-text/58">Key platforms</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {result.platforms.map((platform, idx) => (
                <span
                  key={idx}
                  className="rounded-full border border-primary/15 bg-baby-powder/85 px-3 py-1 text-xs font-medium text-text/72"
                >
                  {platform}
                </span>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-text/58">Why this fits you</p>
            <ul className="mt-2 space-y-2">
              {result.benefits.slice(0, 3).map((benefit, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-text/72">
                  <Sparkles size={14} className="mt-0.5 text-primary" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          <button
            onClick={onStart}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-primary-light px-5 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-baby-powder transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_36px_-22px_rgba(138,31,74,0.95)]"
          >
            Start This Roadmap
            <ArrowRight size={15} />
          </button>
        </div>

        <div className="relative overflow-hidden rounded-[1.6rem] border border-primary/15">
          <img src={result.image} alt={result.title} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-text/55 via-transparent to-transparent" />
          <div className="absolute bottom-3 left-3 rounded-xl border border-baby-powder/30 bg-baby-powder/20 p-3 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-baby-powder">
              <Users size={14} />
              <div>
                <p className="text-[10px] uppercase tracking-[0.1em] text-baby-powder/70">Success Rate</p>
                <p className="text-sm font-semibold">92%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ResultCard;
