'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
  DollarSign,
  Download,
  Play,
  Sparkles,
  Star,
  Target,
  Users,
} from 'lucide-react';

import { ensureProtocol } from '@/utils/ensureProtocol';

type Progress = { status: string };

interface StepType {
  stepId: string;
  stepTitle: string;
  description: string;
  duration: string;
  tasks?: string[];
  downloadables?: string[];
  videoTutorial?: string | null;
  userProgress: Progress[];
}

interface RoadmapDataType {
  title: string;
  description: string;
  image?: string;
  timeline: string;
  investment: string;
  difficulty: string;
  successRate: string;
  steps?: StepType[];
}

type ReceivedStep = Omit<StepType, 'stepId' | 'userProgress'> & {
  id?: string;
  stepId?: string;
  userProgress?: Progress[];
};

type ServerRoadmap = Omit<RoadmapDataType, 'steps'> & {
  steps?: ReceivedStep[];
};

export default function RoadmapPage() {
  const { id: roadmapId } = useParams<{ id: string }>();

  const [roadmap, setRoadmap] = useState<RoadmapDataType | null>(null);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  useEffect(() => {
    if (!roadmapId) return;

    const fetchRoadmap = async () => {
      try {
        const res = await fetch(`/api/user/roadmaps/${roadmapId}`, {
          credentials: 'include',
          cache: 'no-store',
        });

        if (!res.ok) {
          const text = await res.text();
          console.error('Roadmap fetch failed:', res.status, text);
          return;
        }

        const data = (await res.json()) as ServerRoadmap;
        const normalizedSteps: StepType[] = (data.steps ?? []).map((step, idx) => ({
          stepId: step.stepId ?? step.id ?? `step-${idx}`,
          stepTitle: step.stepTitle,
          description: step.description,
          duration: step.duration,
          tasks: Array.isArray(step.tasks) ? step.tasks : [],
          downloadables: Array.isArray(step.downloadables) ? step.downloadables : [],
          videoTutorial: step.videoTutorial ?? null,
          userProgress: step.userProgress ?? [],
        }));

        const normalizedRoadmap: RoadmapDataType = {
          title: data.title,
          description: data.description,
          image: data.image,
          timeline: data.timeline,
          investment: data.investment,
          difficulty: data.difficulty,
          successRate: data.successRate,
          steps: normalizedSteps,
        };

        setRoadmap(normalizedRoadmap);

        const doneIndexes = normalizedSteps.reduce<number[]>((acc, step, idx) => {
          if (step.userProgress[0]?.status === 'done') acc.push(idx);
          return acc;
        }, []);
        setCompletedSteps(doneIndexes);
      } catch (err) {
        console.error('Error loading roadmap:', err);
      }
    };

    fetchRoadmap();
  }, [roadmapId]);

  const toggleStep = async (idx: number, stepId: string): Promise<void> => {
    const newStatus = completedSteps.includes(idx) ? 'pending' : 'done';

    setCompletedSteps((prev) =>
      newStatus === 'done' ? [...prev, idx] : prev.filter((i) => i !== idx),
    );

    try {
      const res = await fetch('/api/user/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ stepId, status: newStatus }),
      });

      if (!res.ok) throw new Error('Progress update failed');

      setRoadmap((old) =>
        old
          ? {
              ...old,
              steps: old.steps?.map((step, i) =>
                i === idx ? { ...step, userProgress: [{ status: newStatus }] } : step,
              ),
            }
          : old,
      );
    } catch (err) {
      console.error('Failed to update progress:', err);
      setCompletedSteps((prev) =>
        newStatus === 'done' ? prev.filter((i) => i !== idx) : [...prev, idx],
      );
    }
  };

  if (!roadmap) {
    return (
      <div className="relative isolate min-h-screen overflow-hidden px-4 pb-10 pt-10 sm:px-6 lg:px-8">
        <div className="aurora-bg absolute inset-0" />
        <div className="luxury-grid absolute inset-0 opacity-[0.18]" />
        <div className="relative mx-auto max-w-3xl">
          <div className="premium-card rounded-3xl p-10 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">Loading roadmap</p>
            <h2 className="font-display mt-3 text-4xl text-text">Preparing your execution blueprint</h2>
          </div>
        </div>
      </div>
    );
  }

  const {
    title,
    description,
    image,
    timeline,
    investment,
    difficulty,
    successRate,
    steps = [],
  } = roadmap;

  const completionPercentage = steps.length
    ? Math.round((completedSteps.length / steps.length) * 100)
    : 0;

  return (
    <div className="relative isolate min-h-screen overflow-hidden px-4 pb-10 pt-8 sm:px-6 lg:px-8">
      <div className="aurora-bg absolute inset-0" />
      <div className="luxury-grid absolute inset-0 opacity-[0.18]" />
      <div className="pointer-events-none absolute -left-24 top-24 h-80 w-80 rounded-full bg-primary/20 blur-3xl animate-float-gentle" />
      <div className="pointer-events-none absolute -right-24 top-32 h-96 w-96 rounded-full bg-accent2/20 blur-3xl animate-float-delayed" />

      <div className="relative mx-auto max-w-7xl">
        <Link
          href="/ResultsPage"
          className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-baby-powder/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-primary transition-colors hover:border-primary/35"
        >
          <ArrowLeft size={14} />
          Back to Results
        </Link>

        <section className="premium-card mt-5 overflow-hidden rounded-[2rem] p-6 sm:p-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">Execution Blueprint</p>
              <h1 className="font-display mt-2 text-4xl leading-tight text-text sm:text-5xl">{title}</h1>
              <p className="mt-4 max-w-3xl text-primary leading-relaxed text-text/72 sm:text-lg">{description}</p>

              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div className="rounded-2xl border border-primary/15 bg-baby-powder/85 p-3 text-center">
                  <Clock className="mx-auto text-primary" size={18} />
                  <p className="mt-1 text-[11px] uppercase tracking-[0.1em] text-text/55">Timeline</p>
                  <p className="mt-0.5 text-sm font-semibold text-text">{timeline}</p>
                </div>
                <div className="rounded-2xl border border-primary/15 bg-baby-powder/85 p-3 text-center">
                  <DollarSign className="mx-auto text-primary" size={18} />
                  <p className="mt-1 text-[11px] uppercase tracking-[0.1em] text-text/55">Investment</p>
                  <p className="mt-0.5 text-sm font-semibold text-text">{investment}</p>
                </div>
                <div className="rounded-2xl border border-primary/15 bg-baby-powder/85 p-3 text-center">
                  <Users className="mx-auto text-primary" size={18} />
                  <p className="mt-1 text-[11px] uppercase tracking-[0.1em] text-text/55">Difficulty</p>
                  <p className="mt-0.5 text-sm font-semibold text-text">{difficulty}</p>
                </div>
                <div className="rounded-2xl border border-primary/15 bg-baby-powder/85 p-3 text-center">
                  <Star className="mx-auto text-primary" size={18} />
                  <p className="mt-1 text-[11px] uppercase tracking-[0.1em] text-text/55">Success</p>
                  <p className="mt-0.5 text-sm font-semibold text-text">{successRate}</p>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[1.8rem] border border-primary/15">
              <img
                src={
                  image ||
                  'https://media.istockphoto.com/id/498366234/photo/notepad-with-home-based-business-on-the-wooden-table.jpg?s=612x612&w=0&k=20&c=XxPsIAJDs5bT7spQBEFspWx9Wkfb1b7slClYljpqS3o='
                }
                alt={title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-text/45 via-transparent to-transparent" />
            </div>
          </div>
        </section>

        <section className="mt-6 premium-card rounded-3xl p-6">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-display text-2xl text-text">Your completion progress</h2>
            <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.1em] text-primary">
              {completionPercentage}% complete
            </span>
          </div>
          <div className="h-2 rounded-full bg-secondary/25">
            <div
              className="h-full rounded-full bg-gradient-to-r from-primary to-accent2 transition-all duration-700"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
          <p className="mt-2 text-sm text-text/65">
            {completedSteps.length} of {steps.length} roadmap steps are completed.
          </p>
        </section>

        <section className="mt-7 space-y-5">
          {steps.map((step, index) => {
            const isCompleted = completedSteps.includes(index);
            const tasks = Array.isArray(step.tasks) ? step.tasks : [];
            const files = Array.isArray(step.downloadables) ? step.downloadables : [];
            const videoUrl = step.videoTutorial ?? '';

            return (
              <article key={step.stepId} className="premium-card rounded-3xl p-5 sm:p-6">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div
                      className={`inline-flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold ${
                        isCompleted ? 'bg-primary text-baby-powder' : 'bg-primary/12 text-primary'
                      }`}
                    >
                      {isCompleted ? <CheckCircle2 size={18} /> : index + 1}
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.1em] text-text/55">
                        Step {index + 1}
                      </p>
                      <h3 className="text-xl font-semibold text-text">{step.stepTitle}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-text/70">{step.description}</p>
                      <div className="mt-2 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.08em] text-primary">
                        <Clock size={13} />
                        {step.duration}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleStep(index, step.stepId)}
                    className={`rounded-xl px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] transition-all duration-200 ${
                      isCompleted
                        ? 'bg-primary text-baby-powder'
                        : 'border border-primary/20 bg-baby-powder/90 text-primary hover:border-primary/35'
                    }`}
                  >
                    {isCompleted ? 'Completed' : 'Mark Done'}
                  </button>
                </div>

                <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-[1.15fr_0.85fr]">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.1em] text-text/58">Action tasks</p>
                    <ul className="mt-3 space-y-2">
                      {tasks.length > 0 ? (
                        tasks.map((task, idx) => (
                          <li key={idx} className="flex items-start gap-2 rounded-xl border border-primary/10 bg-baby-powder/85 px-3 py-2 text-sm text-text/72">
                            <Target size={14} className="mt-0.5 text-primary" />
                            <span>{task}</span>
                          </li>
                        ))
                      ) : (
                        <li className="rounded-xl border border-primary/10 bg-baby-powder/85 px-3 py-2 text-sm text-text/60">
                          No specific tasks listed for this step.
                        </li>
                      )}
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <div className="rounded-2xl border border-primary/15 bg-baby-powder/85 p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.1em] text-text/58">Downloads</p>
                      <div className="mt-3 space-y-2">
                        {files.length > 0 ? (
                          files.map((raw, idx) => {
                            const url = ensureProtocol(raw);
                            const label = url.split('/').pop() || url;
                            return (
                              <a
                                key={idx}
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 rounded-xl border border-primary/12 bg-baby-powder/95 px-3 py-2 text-sm text-text/72 transition-colors hover:border-primary/30"
                              >
                                <Download size={14} className="text-primary" />
                                <span className="break-all">{label}</span>
                              </a>
                            );
                          })
                        ) : (
                          <p className="text-sm text-text/55">No downloadable files for this step.</p>
                        )}
                      </div>
                    </div>

                    <div className="rounded-2xl border border-primary/15 bg-baby-powder/85 p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.1em] text-text/58">Video tutorial</p>
                      <div className="mt-3">
                        {videoUrl ? (
                          <a
                            href={ensureProtocol(videoUrl)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-xl bg-primary/10 px-3 py-2 text-sm font-medium text-primary"
                          >
                            <Play size={14} />
                            Open tutorial
                          </a>
                        ) : (
                          <p className="text-sm text-text/55">No tutorial link available.</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </section>

        <section className="mt-12 rounded-[2rem] border border-primary/20 bg-gradient-to-br from-primary/10 to-accent2/10 p-6 text-center sm:p-8">
          <div className="mx-auto max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">Launch support</p>
            <h3 className="font-display mt-2 text-3xl text-text sm:text-4xl">Ready to launch with confidence?</h3>
            <p className="mt-3 text-primary leading-relaxed text-text/72">
              Finish each step and use community + dashboard support to keep your momentum high.
            </p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/CommunityPage"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-primary-light px-5 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-baby-powder"
              >
                <Users size={15} />
                Join Community
              </Link>
              <Link
                href="/DashboardPage"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-primary/25 bg-baby-powder/90 px-5 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-primary"
              >
                Go to Dashboard
                <ArrowRight size={14} />
              </Link>
            </div>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-primary">
              <Sparkles size={13} />
              Keep consistent execution daily
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
