'use client';
export const dynamic = 'force-dynamic';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowRight,
  Clock,
  Sparkles,
  Star,
  TrendingUp,
  Users,
} from 'lucide-react';

import ResultCard from '../../components/results/ResultCard';
import { parseQuizData } from '../../utils/parseQuizData';

interface RoadmapStep {
  stepTitle: string;
  description: string;
  duration: string;
  tasks: string[];
  downloadables: string[];
  videoTutorial: string;
}

interface BusinessIdea {
  id: string;
  title: string;
  description: string;
  match: number;
  timeline: string;
  investment: string;
  potential: string;
  platforms: string[];
  benefits: string[];
  image: string;
  keywords: string[];
  roadmap: RoadmapStep[];
}

export default function ResultsPage() {
  const router = useRouter();
  const hasFetched = useRef(false);

  const [rawParsedParam, setRawParsedParam] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [ideas, setIdeas] = useState<BusinessIdea[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [savingIdeaId, setSavingIdeaId] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    setRawParsedParam(params.get('parsed') ?? '');
  }, []);

  const fetchIdeas = useCallback(async (rawParam: string) => {
    setLoading(true);
    setError(null);

    try {
      const parsed = parseQuizData(rawParam);

      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          investment: parsed.investment,
          goals: parsed.goals,
          time: parsed.time,
          experience: parsed.experience,
          personality: parsed.personality,
          interests: parsed.interests,
          constraints: parsed.constraints,
          response_format: 'json',
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => null);
        throw new Error(errData?.error || `Generation API failed (${res.status})`);
      }

      const data = await res.json();

      if (!data.businessCard || !data.roadmap?.steps) {
        throw new Error('AI returned malformed result format.');
      }

      const normalizedIdea: BusinessIdea = {
        id: data.businessCard.title?.toLowerCase().replace(/\s+/g, '-') ?? String(Date.now()),
        title: data.businessCard.title ?? 'Untitled idea',
        description: data.businessCard.description ?? '',
        match: 95,
        timeline: data.businessCard.timeline ?? '',
        investment: data.businessCard.investment ?? '',
        potential: data.businessCard.potential ?? '',
        platforms: data.businessCard.keyPlatforms || [],
        benefits: [data.businessCard.whyThisWorksForYou].filter(Boolean) as string[],
        keywords: data.businessCard.keywords || ['business'],
        image:
          data.businessCard.image ||
          `https://source.unsplash.com/featured/?${encodeURIComponent(
            data.businessCard.keywords?.[0] ?? data.businessCard.title ?? 'business'
          )}`,
        roadmap: data.roadmap.steps as RoadmapStep[],
      };

      setIdeas([normalizedIdea]);
    } catch (err: unknown) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'Unable to generate ideas right now.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (rawParsedParam === null || hasFetched.current) return;
    hasFetched.current = true;
    fetchIdeas(rawParsedParam);
  }, [rawParsedParam, fetchIdeas]);

  const handleStartJourney = async (idea: BusinessIdea) => {
    setSavingIdeaId(idea.id);
    try {
      const payload = {
        title: `${idea.title} Roadmap`,
        description: `Launch your ${idea.title} business step-by-step`,
        tags: [],
        steps: idea.roadmap,
      };

      const res = await fetch('/api/roadmaps', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error('Could not save roadmap');
      }

      const saved = await res.json();
      router.push(`/roadmaps/${saved.id}`);
    } catch (err) {
      console.error('Roadmap save failed:', err);
      setError('Failed to save roadmap. Please try again.');
    } finally {
      setSavingIdeaId(null);
    }
  };

  if (loading) {
    return (
      <div className="relative isolate min-h-screen overflow-hidden px-4 pb-10 pt-10 sm:px-6 lg:px-8">
        <div className="aurora-bg absolute inset-0" />
        <div className="luxury-grid absolute inset-0 opacity-[0.18]" />
        <div className="relative mx-auto max-w-3xl">
          <div className="premium-card rounded-3xl p-8 text-center sm:p-10">
            <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent2 text-baby-powder animate-glow-soft">
              <Sparkles size={22} />
            </div>
            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-primary">AI analysis in progress</p>
            <h2 className="font-display mt-2 text-3xl text-text sm:text-4xl">Crafting your premium business matches</h2>
            <p className="mt-3 text-sm text-text/70 sm:text-primary">
              This can take a few moments while we personalize your recommendations.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative isolate min-h-screen overflow-hidden px-4 pb-10 pt-10 sm:px-6 lg:px-8">
        <div className="aurora-bg absolute inset-0" />
        <div className="luxury-grid absolute inset-0 opacity-[0.18]" />
        <div className="relative mx-auto max-w-2xl">
          <div className="premium-card rounded-3xl p-8 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">Generation failed</p>
            <h2 className="font-display mt-2 text-3xl text-text">We hit a temporary issue</h2>
            <p className="mt-3 text-text/70">{error}</p>
            <button
              onClick={() => fetchIdeas(rawParsedParam ?? '')}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-baby-powder"
            >
              Retry Generation
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative isolate min-h-screen overflow-hidden px-4 pb-10 pt-8 sm:px-6 lg:px-8">
      <div className="aurora-bg absolute inset-0" />
      <div className="luxury-grid absolute inset-0 opacity-[0.18]" />
      <div className="pointer-events-none absolute -left-24 top-24 h-80 w-80 rounded-full bg-primary/20 blur-3xl animate-float-gentle" />
      <div className="pointer-events-none absolute -right-24 top-32 h-96 w-96 rounded-full bg-accent2/20 blur-3xl animate-float-delayed" />

      <div className="relative mx-auto max-w-7xl">
        <section className="premium-card rounded-[2rem] p-6 sm:p-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
              <Star size={14} />
              AI Analysis Complete
            </div>
            <h1 className="font-display mt-4 text-4xl leading-tight text-text sm:text-5xl">
              Your curated business matches
            </h1>
            <p className="mx-auto mt-4 max-w-3xl text-primary leading-relaxed text-text/72 sm:text-lg">
              Personalized opportunities aligned with your interests, constraints, and growth goals. Choose one and launch with a ready execution roadmap.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-primary/15 bg-baby-powder/85 p-4 text-center">
              <p className="text-xs uppercase tracking-[0.1em] text-text/55">Matches found</p>
              <p className="mt-1 text-2xl font-bold text-primary">{ideas.length}</p>
            </div>
            <div className="rounded-2xl border border-primary/15 bg-baby-powder/85 p-4 text-center">
              <p className="text-xs uppercase tracking-[0.1em] text-text/55">Confidence score</p>
              <p className="mt-1 text-2xl font-bold text-text">
                {ideas.length > 0 ? `${ideas[0].match}%` : 'N/A'}
              </p>
            </div>
            <div className="rounded-2xl border border-primary/15 bg-baby-powder/85 p-4 text-center">
              <p className="text-xs uppercase tracking-[0.1em] text-text/55">Roadmap readiness</p>
              <p className="mt-1 text-2xl font-bold text-text">100%</p>
            </div>
          </div>
        </section>

        <section className="mx-auto mt-7 max-w-6xl space-y-6">
          {ideas.map((idea, idx) => (
            <div key={idea.id} className="animate-reveal-up">
              <ResultCard result={idea} index={idx} onStart={() => handleStartJourney(idea)} />
              {savingIdeaId === idea.id && (
                <p className="mt-2 text-center text-sm font-medium text-primary">Saving your roadmap and preparing your workspace...</p>
              )}
            </div>
          ))}
        </section>

        <section className="mt-12 rounded-[2rem] border border-primary/18 bg-gradient-to-br from-primary/10 to-accent2/10 p-6 sm:p-8">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">Beyond the roadmap</p>
            <h2 className="font-display mt-2 text-3xl text-text sm:text-4xl">Scale faster with support and resources</h2>
            <p className="mx-auto mt-3 max-w-3xl text-text/72">
              Join other founders, access curated templates, and track execution through your premium dashboard.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="premium-card rounded-2xl p-5 text-center">
              <Users className="mx-auto text-primary" size={24} />
              <h3 className="mt-3 text-lg font-semibold text-text">Join Community</h3>
              <p className="mt-1 text-sm text-text/65">Connect with women entrepreneurs and mentors.</p>
              <Link href="/CommunityPage" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                Explore
                <ArrowRight size={14} />
              </Link>
            </div>
            <div className="premium-card rounded-2xl p-5 text-center">
              <TrendingUp className="mx-auto text-primary" size={24} />
              <h3 className="mt-3 text-lg font-semibold text-text">Build with Resources</h3>
              <p className="mt-1 text-sm text-text/65">Get templates, guides, and launch-ready assets.</p>
              <Link href="/ResourcesPage" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                Browse
                <ArrowRight size={14} />
              </Link>
            </div>
            <div className="premium-card rounded-2xl p-5 text-center">
              <Clock className="mx-auto text-primary" size={24} />
              <h3 className="mt-3 text-lg font-semibold text-text">Track Execution</h3>
              <p className="mt-1 text-sm text-text/65">Monitor milestones and keep momentum high.</p>
              <Link href="/DashboardPage" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                Open Dashboard
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>

        <div className="mt-10 text-center">
          <Link
            href="/QuizPage"
            className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-baby-powder/80 px-5 py-2.5 text-sm font-semibold uppercase tracking-[0.08em] text-primary transition-all duration-300 hover:border-primary/35"
          >
            Retake Quiz for Different Path
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
