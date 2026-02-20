import React from 'react';
import Link from 'next/link';
import { ArrowRight, Award } from 'lucide-react';

import HeroSection from '../components/home/HeroSection';
import StatsSection from '../components/home/StatsSection';
import FeaturesSection from '../components/home/FeaturesSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import CTASection from '../components/home/CTASection';

const aboutPillars = [
  'Built specifically for women entrepreneurs in Pakistan',
  'AI + practical execution roadmaps, not just inspiration',
  'Community-backed growth with measurable milestones',
];

const HomePage: React.FC = () => {
  return (
    <div className="relative overflow-hidden">
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <TestimonialsSection />

      <section className="relative px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_0.9fr]">
            <div className="space-y-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">The mission</p>
              <h2 className="font-display text-4xl leading-tight text-text md:text-5xl">
                About URAAN
              </h2>
              <p className="text-lg leading-relaxed text-text/75">
                URAAN means flight in Urdu. Our mission is to help women founders rise from uncertainty to sustainable success with better strategy, polished branding, and practical business systems.
              </p>
              <p className="text-base leading-relaxed text-text/70">
                We blend personalized AI guidance with local market relevance, so your journey feels both ambitious and achievable from the first decision to the first sale.
              </p>
              <div className="space-y-3">
                {aboutPillars.map((pillar) => (
                  <div key={pillar} className="premium-card rounded-2xl px-4 py-3 text-sm text-text/75">
                    {pillar}
                  </div>
                ))}
              </div>
              <Link
                href="/AboutPage"
                className="group inline-flex items-center gap-2 rounded-xl border border-primary/25 bg-baby-powder/80 px-5 py-3 font-semibold text-primary transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/45"
              >
                Learn more about our story
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="relative">
              <div className="relative overflow-hidden rounded-[2rem] border border-primary/15 bg-baby-powder/70 p-4 shadow-[0_30px_70px_-45px_rgba(46,30,74,0.7)] backdrop-blur-xl">
                <img
                  src="https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg"
                  alt="Pakistani woman entrepreneur"
                  className="h-[440px] w-full rounded-[1.6rem] object-cover"
                />
                <div className="absolute inset-4 rounded-[1.6rem] bg-gradient-to-t from-text/50 via-transparent to-transparent" />
              </div>

              <div className="animate-float-gentle absolute -bottom-6 -left-6 rounded-2xl border border-primary/20 bg-baby-powder/95 p-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent2 text-baby-powder">
                    <Award size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-text">500+ success stories</p>
                    <p className="text-xs text-text/60">Founders empowered across Pakistan</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
};

export default HomePage;
