import React, { useState } from 'react';
import { Edit3, Heart, Sparkles } from 'lucide-react';

interface ReflectionAreaProps {
  title: string;
  subtitle: string;
  value: string;
  onChange: (value: string) => void;
}

const ReflectionArea: React.FC<ReflectionAreaProps> = ({ title, subtitle, value, onChange }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
          <Sparkles size={14} />
          Reflection moment
        </div>
        <h2 className="font-display mt-4 text-3xl leading-tight text-text md:text-4xl">{title}</h2>
        <p className="mx-auto mt-2 max-w-2xl text-base leading-relaxed text-text/72">{subtitle}</p>
      </div>

      <div
        className={`premium-card mx-auto max-w-3xl rounded-3xl p-5 transition-all duration-300 sm:p-6 ${
          isFocused ? 'border-primary/35 shadow-[0_26px_55px_-38px_rgba(138,31,74,0.9)]' : ''
        }`}
      >
        <div className="mb-4 flex items-center gap-3">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent2 text-baby-powder">
            <Edit3 size={16} />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-text/60">Founder notes</p>
            <p className="text-sm text-text/70">Optional, but useful for better recommendations</p>
          </div>
        </div>

        <div className="relative">
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Share your goals, doubts, or anything you want URAAN to understand."
            className="h-40 w-full resize-none rounded-2xl border border-primary/20 bg-baby-powder/80 p-4 text-sm leading-relaxed text-text placeholder:text-text/50 focus:border-primary/45 focus:outline-none"
          />
          <div className="absolute bottom-3 right-3 rounded-full border border-primary/15 bg-baby-powder/90 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-text/55">
            {value.length} chars
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 text-sm text-text/65">
            <Heart size={15} className="text-primary" />
            Your context helps us personalize your path.
          </div>
          <button
            onClick={() => onChange('')}
            className="text-xs font-semibold uppercase tracking-[0.1em] text-text/55 underline decoration-primary/40 underline-offset-4 transition-colors hover:text-primary"
          >
            Skip this step
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReflectionArea;
