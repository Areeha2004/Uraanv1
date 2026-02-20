import React from 'react';
import { Award, Brain, Compass, Download, Target, Users } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'Strategic Intelligence',
    description:
      'AI evaluates your constraints and strengths to surface opportunities worth pursuing now.',
    tag: 'Precision',
  },
  {
    icon: Compass,
    title: 'Launch Navigation',
    description:
      'A practical sequence for each week so you can execute without second-guessing every move.',
    tag: 'Direction',
  },
  {
    icon: Download,
    title: 'Operator-Grade Kits',
    description:
      'Ready-to-use templates, outreach scripts, and planning sheets built for local market realities.',
    tag: 'Assets',
  },
  {
    icon: Users,
    title: 'Founder Circle',
    description:
      'A curated peer network that provides momentum, accountability, and opportunity sharing.',
    tag: 'Community',
  },
  {
    icon: Target,
    title: 'Outcome Tracking',
    description:
      'Clear milestones, completion confidence, and structured feedback loops to stay on course.',
    tag: 'Control',
  },
  {
    icon: Award,
    title: 'Credibility Signals',
    description:
      'Showcase achievements and progress markers that build trust with clients and collaborators.',
    tag: 'Positioning',
  },
];

const FeaturesSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 flex flex-col gap-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Capability stack</p>
          <h2 className="font-display text-4xl leading-tight text-text md:text-5xl">
            A premium system, not just a tool
          </h2>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-text/70">
            URAAN combines strategy, execution, and support into one cohesive experience so your brand and business evolve together from day one.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature, index) => (
            <article
              key={feature.title}
              className="premium-card group animate-reveal-up relative overflow-hidden rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/10 blur-2xl transition-transform duration-500 group-hover:scale-110" />
              <div className="relative">
                <div className="mb-6 flex items-center justify-between">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent2 text-baby-powder shadow-[0_12px_30px_-16px_rgba(138,31,74,0.95)]">
                    <feature.icon size={22} />
                  </div>
                  <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-primary">
                    {feature.tag}
                  </span>
                </div>
                <h3 className="text-2xl font-semibold tracking-tight text-text">{feature.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-text/70">{feature.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
