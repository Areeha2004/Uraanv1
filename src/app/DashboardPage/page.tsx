'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Award,
  BookOpen,
  Calendar,
  CheckCircle2,
  Download,
  Flame,
  MessageCircle,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Trophy,
  Users,
} from 'lucide-react';

type StepWithProgress = {
  id: string;
  stepNumber: number;
  title: string;
  content: string;
  resources?: string | null;
  userProgress: { status: string }[];
};

type UserRoadmap = {
  id: string;
  roadmap: {
    id: string;
    title: string;
    image?: string;
    steps: StepWithProgress[];
  };
};

type Tab = 'overview' | 'progress' | 'achievements' | 'resources';

const NAV_TABS: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: 'overview', label: 'Overview', icon: Sparkles },
  { id: 'progress', label: 'Progress', icon: TrendingUp },
  { id: 'achievements', label: 'Achievements', icon: Trophy },
  { id: 'resources', label: 'Resources', icon: Download },
];

const DashboardPage: React.FC = () => {
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.replace('/LoginPage');
    },
  });

  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [userRoadmaps, setUserRoadmaps] = useState<UserRoadmap[]>([]);

  useEffect(() => {
    if (status !== 'authenticated') return;

    fetch('/api/user/roadmaps')
      .then((res) => res.json())
      .then((data: UserRoadmap[]) => setUserRoadmaps(data))
      .catch(console.error);
  }, [status]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="premium-card rounded-3xl p-8 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-primary">Loading Dashboard</p>
            <h2 className="font-display mt-3 text-3xl text-text">Preparing your founder cockpit...</h2>
          </div>
        </div>
      </div>
    );
  }

  const primary = userRoadmaps.length > 0 ? userRoadmaps[0].roadmap : null;
  const roadmapSteps = primary?.steps ?? [];
  const doneCount = roadmapSteps.filter((s) => s.userProgress[0]?.status === 'done').length;
  const nextStep = roadmapSteps.find((s) => s.userProgress[0]?.status !== 'done');

  const userData = {
    name: session.user.name || 'Founder',
    avatar: session.user.image || '/fallback-avatar.png',
    businessIdea: primary ? primary.title : 'No roadmap selected yet',
    roadmapId: primary?.id || '',
    joinDate: 'January 2025',
    level: 'Rising Star',
    points: 0,
  };

  const progressData = {
    currentStep: doneCount,
    totalSteps: roadmapSteps.length,
    stepTitle: nextStep ? nextStep.title : 'All steps completed',
    completedTasks: doneCount,
    totalTasks: roadmapSteps.length,
    nextMilestone: nextStep ? nextStep.title : 'Congratulations! You completed your roadmap.',
  };

  const overallProgress = progressData.totalSteps
    ? Math.round((progressData.currentStep / progressData.totalSteps) * 100)
    : 0;

  const roadmapHref = userData.roadmapId ? `/roadmaps/${userData.roadmapId}` : '/QuizPage';

  const achievements = [
    {
      id: 1,
      title: 'Quiz Master',
      description: 'Completed AI business analysis',
      icon: Star,
      earned: true,
      date: 'Jan 15, 2025',
    },
    {
      id: 2,
      title: 'Goal Setter',
      description: 'Set up your business roadmap',
      icon: Target,
      earned: true,
      date: 'Jan 16, 2025',
    },
    {
      id: 3,
      title: 'Community Member',
      description: 'Joined the URAAN community',
      icon: Users,
      earned: true,
      date: 'Jan 16, 2025',
    },
    {
      id: 4,
      title: 'Resource Collector',
      description: 'Downloaded 5 starter kits',
      icon: Download,
      earned: false,
      progress: '3/5',
    },
    {
      id: 5,
      title: 'Collaborator',
      description: 'Hired your first collaborator',
      icon: Users,
      earned: false,
      progress: 'Locked',
    },
    {
      id: 6,
      title: 'Business Launcher',
      description: 'Completed your roadmap',
      icon: Award,
      earned: false,
      progress: 'Locked',
    },
  ];

  const recentActivity = [
    {
      id: 1,
      title: 'Completed market research tasks',
      description: 'Step 1: Market Research and Planning',
      timestamp: '2 hours ago',
      icon: CheckCircle2,
      color: 'text-emerald-600',
    },
    {
      id: 2,
      title: 'Downloaded Brand Identity Kit',
      description: 'Resources for Step 2',
      timestamp: '1 day ago',
      icon: Download,
      color: 'text-primary',
    },
    {
      id: 3,
      title: 'Liked a success story',
      description: "Sana's jewelry business milestone",
      timestamp: '2 days ago',
      icon: MessageCircle,
      color: 'text-accent2',
    },
    {
      id: 4,
      title: 'Earned Goal Setter badge',
      description: 'Roadmap setup completed',
      timestamp: '3 days ago',
      icon: Award,
      color: 'text-amber-500',
    },
  ];

  const savedResources = [
    {
      id: 1,
      title: 'Business Plan Template',
      type: 'Template',
      category: 'Foundation',
      downloadDate: 'Jan 16, 2025',
    },
    {
      id: 2,
      title: 'Social Media Marketing Guide',
      type: 'Guide',
      category: 'Marketing',
      downloadDate: 'Jan 15, 2025',
    },
    {
      id: 3,
      title: 'Brand Identity Kit',
      type: 'Template Pack',
      category: 'Branding',
      downloadDate: 'Jan 14, 2025',
    },
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: 'Digital Marketing Workshop',
      date: 'March 18, 2025',
      time: '7:00 PM',
      type: 'Virtual',
    },
    {
      id: 2,
      title: 'Women Entrepreneur Meetup',
      date: 'March 22, 2025',
      time: '6:00 PM',
      type: 'In-Person',
    },
  ];

  return (
    <div className="relative isolate min-h-screen overflow-hidden px-4 pb-10 pt-6 sm:px-6 lg:px-8">
      <div className="aurora-bg absolute inset-0" />
      <div className="luxury-grid absolute inset-0 opacity-[0.18]" />
      <div className="pointer-events-none absolute -left-24 top-24 h-96 w-96 rounded-full bg-primary/20 blur-3xl animate-float-gentle" />
      <div className="pointer-events-none absolute -right-24 top-28 h-[28rem] w-[28rem] rounded-full bg-accent2/20 blur-3xl animate-float-delayed" />

      <div className="relative mx-auto max-w-7xl">
        <section className="premium-card rounded-[2rem] p-5 sm:p-7">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="flex items-start gap-4">
              <Image
                src={userData.avatar}
                width={92}
                height={92}
                alt={session.user.name || 'User avatar'}
                className="h-20 w-20 rounded-2xl border border-primary/20 object-cover sm:h-24 sm:w-24"
              />
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">Founder Dashboard</p>
                <h1 className="font-display mt-1 text-3xl leading-tight text-text sm:text-4xl">
                  Welcome back, {userData.name}
                </h1>
                <p className="mt-2 text-sm text-text/72 sm:text-base">
                  Building: <span className="font-semibold text-text">{userData.businessIdea}</span>
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.1em] text-primary">
                    {userData.level}
                  </span>
                  <span className="rounded-full border border-text/12 bg-baby-powder/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.1em] text-text/70">
                    {userData.points} points
                  </span>
                  <span className="rounded-full border border-text/12 bg-baby-powder/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.1em] text-text/70">
                    Member since {userData.joinDate}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-2xl border border-primary/15 bg-baby-powder/85 p-3 text-center">
                <p className="text-xs uppercase tracking-[0.1em] text-text/55">Progress</p>
                <p className="mt-1 text-2xl font-bold text-primary">{overallProgress}%</p>
              </div>
              <div className="rounded-2xl border border-primary/15 bg-baby-powder/85 p-3 text-center">
                <p className="text-xs uppercase tracking-[0.1em] text-text/55">Completed</p>
                <p className="mt-1 text-2xl font-bold text-text">{progressData.currentStep}</p>
              </div>
              <div className="rounded-2xl border border-primary/15 bg-baby-powder/85 p-3 text-center">
                <p className="text-xs uppercase tracking-[0.1em] text-text/55">Streak</p>
                <p className="mt-1 text-2xl font-bold text-text">12d</p>
              </div>
              <Link
                href={roadmapHref}
                className="col-span-2 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-primary-light px-4 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-baby-powder transition-all duration-300 hover:-translate-y-0.5"
              >
                Continue Roadmap
                <ArrowRight size={15} />
              </Link>
              <Link
                href="/ResourcesPage"
                className="inline-flex items-center justify-center rounded-xl border border-primary/20 bg-baby-powder/90 px-3 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-primary transition-all duration-300 hover:border-primary/35"
              >
                Resources
              </Link>
            </div>
          </div>
        </section>

        <section className="mt-6 flex flex-wrap items-center gap-2 rounded-2xl border border-primary/12 bg-baby-powder/70 p-2 backdrop-blur-xl">
          {NAV_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold uppercase tracking-[0.08em] transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-primary text-baby-powder shadow-[0_14px_30px_-18px_rgba(138,31,74,0.95)]'
                  : 'text-text/75 hover:bg-primary/10 hover:text-primary'
              }`}
            >
              <tab.icon size={14} />
              {tab.label}
            </button>
          ))}
        </section>

        {activeTab === 'overview' && (
          <section className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1.4fr_0.6fr]">
            <div className="space-y-6">
              <article className="premium-card rounded-3xl p-6">
                <div className="mb-5 flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">Execution cockpit</p>
                    <h2 className="font-display mt-1 text-3xl text-text">Roadmap Momentum</h2>
                  </div>
                  <Link
                    href={roadmapHref}
                    className="inline-flex items-center gap-1 text-sm font-semibold text-primary transition-colors hover:text-primary-light"
                  >
                    Open Full Roadmap
                    <ArrowRight size={14} />
                  </Link>
                </div>

                <div className="rounded-2xl border border-primary/15 bg-baby-powder/85 p-4">
                  <div className="mb-3 flex items-center justify-between text-sm">
                    <span className="font-medium text-text/70">Current Step</span>
                    <span className="font-semibold text-primary">
                      {progressData.currentStep} / {progressData.totalSteps || 0}
                    </span>
                  </div>
                  <p className="text-lg font-semibold text-text">{progressData.stepTitle}</p>
                  <div className="mt-4 h-2 rounded-full bg-secondary/25">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-primary to-accent2 transition-all duration-700"
                      style={{ width: `${overallProgress}%` }}
                    />
                  </div>
                  <div className="mt-3 flex items-center justify-between text-xs uppercase tracking-[0.1em] text-text/55">
                    <span>{progressData.completedTasks} tasks complete</span>
                    <span>{overallProgress}% complete</span>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-4">
                  <Link href={roadmapHref} className="rounded-2xl border border-primary/15 bg-baby-powder/85 p-4 transition-all duration-300 hover:border-primary/35">
                    <BookOpen size={18} className="text-primary" />
                    <p className="mt-2 text-sm font-semibold text-text">Continue Roadmap</p>
                    <p className="text-xs text-text/60">Resume current step</p>
                  </Link>
                  <Link href="/ResourcesPage" className="rounded-2xl border border-primary/15 bg-baby-powder/85 p-4 transition-all duration-300 hover:border-primary/35">
                    <Download size={18} className="text-primary" />
                    <p className="mt-2 text-sm font-semibold text-text">Browse Resources</p>
                    <p className="text-xs text-text/60">Templates and guides</p>
                  </Link>
                  <Link href="/CommunityPage" className="rounded-2xl border border-primary/15 bg-baby-powder/85 p-4 transition-all duration-300 hover:border-primary/35">
                    <Users size={18} className="text-primary" />
                    <p className="mt-2 text-sm font-semibold text-text">Join Community</p>
                    <p className="text-xs text-text/60">Founder discussions</p>
                  </Link>
                  <Link href="/CollaborationPage" className="rounded-2xl border border-primary/15 bg-baby-powder/85 p-4 transition-all duration-300 hover:border-primary/35">
                    <TrendingUp size={18} className="text-primary" />
                    <p className="mt-2 text-sm font-semibold text-text">Find Collaborators</p>
                    <p className="text-xs text-text/60">Get execution support</p>
                  </Link>
                </div>
              </article>

              <article className="premium-card rounded-3xl p-6">
                <h3 className="font-display text-2xl text-text">Recent Activity</h3>
                <div className="mt-5 space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3 rounded-2xl border border-primary/10 bg-baby-powder/85 p-3">
                      <div className={`inline-flex h-9 w-9 items-center justify-center rounded-xl bg-baby-powder ${activity.color}`}>
                        <activity.icon size={16} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-text">{activity.title}</p>
                        <p className="mt-0.5 text-sm text-text/65">{activity.description}</p>
                        <p className="mt-1 text-xs uppercase tracking-[0.1em] text-text/50">{activity.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            </div>

            <aside className="space-y-6">
              <article className="premium-card rounded-3xl p-5">
                <h3 className="font-display text-2xl text-text">Performance</h3>
                <div className="mt-4 space-y-3">
                  <div className="rounded-2xl border border-primary/15 bg-baby-powder/85 p-3">
                    <p className="text-xs uppercase tracking-[0.1em] text-text/55">Roadmap Completion</p>
                    <p className="mt-1 text-xl font-bold text-primary">{overallProgress}%</p>
                  </div>
                  <div className="rounded-2xl border border-primary/15 bg-baby-powder/85 p-3">
                    <p className="text-xs uppercase tracking-[0.1em] text-text/55">Resources Downloaded</p>
                    <p className="mt-1 text-xl font-bold text-text">8</p>
                  </div>
                  <div className="rounded-2xl border border-primary/15 bg-baby-powder/85 p-3">
                    <p className="text-xs uppercase tracking-[0.1em] text-text/55">Community Posts</p>
                    <p className="mt-1 text-xl font-bold text-text">3</p>
                  </div>
                </div>
              </article>

              <article className="premium-card rounded-3xl p-5">
                <h3 className="font-display text-2xl text-text">Upcoming Events</h3>
                <div className="mt-4 space-y-3">
                  {upcomingEvents.map((event) => (
                    <div key={event.id} className="rounded-2xl border border-primary/15 bg-baby-powder/85 p-3">
                      <p className="text-sm font-semibold text-text">{event.title}</p>
                      <p className="mt-1 flex items-center gap-1 text-xs text-text/60">
                        <Calendar size={12} className="text-primary" />
                        {event.date} | {event.time}
                      </p>
                      <span className="mt-2 inline-flex rounded-full border border-primary/20 bg-primary/10 px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-primary">
                        {event.type}
                      </span>
                    </div>
                  ))}
                </div>
              </article>

              <article className="rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/12 to-accent2/12 p-5">
                <h3 className="font-display text-2xl text-text">Need Support?</h3>
                <p className="mt-2 text-sm leading-relaxed text-text/70">
                  The URAAN community and mentors are available to help you move faster.
                </p>
                <Link
                  href="/ContactPage"
                  className="mt-4 inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold uppercase tracking-[0.08em] text-baby-powder transition-colors hover:bg-primary-light"
                >
                  <MessageCircle size={14} />
                  Get Support
                </Link>
              </article>
            </aside>
          </section>
        )}

        {activeTab === 'progress' && (
          <section className="mt-6 premium-card rounded-3xl p-6 sm:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">Progress analytics</p>
            <h2 className="font-display mt-1 text-3xl text-text">Your Business Journey</h2>
            <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-primary/15 bg-baby-powder/85 p-4 text-center">
                <p className="text-xs uppercase tracking-[0.1em] text-text/55">Overall Progress</p>
                <p className="mt-2 text-3xl font-bold text-primary">{overallProgress}%</p>
              </div>
              <div className="rounded-2xl border border-primary/15 bg-baby-powder/85 p-4 text-center">
                <p className="text-xs uppercase tracking-[0.1em] text-text/55">Steps Completed</p>
                <p className="mt-2 text-3xl font-bold text-text">
                  {progressData.currentStep}/{progressData.totalSteps || 0}
                </p>
              </div>
              <div className="rounded-2xl border border-primary/15 bg-baby-powder/85 p-4 text-center">
                <p className="text-xs uppercase tracking-[0.1em] text-text/55">Current Tasks</p>
                <p className="mt-2 text-3xl font-bold text-text">
                  {progressData.completedTasks}/{progressData.totalTasks || 0}
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-primary/15 bg-baby-powder/85 p-5">
              <h3 className="text-lg font-semibold text-text">Current Focus</h3>
              <p className="mt-1 text-text/70">{progressData.stepTitle}</p>
              <p className="mt-3 text-sm uppercase tracking-[0.08em] text-text/55">
                Next milestone: <span className="font-semibold text-primary">{progressData.nextMilestone}</span>
              </p>
              <Link
                href={roadmapHref}
                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-primary-light px-5 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-baby-powder"
              >
                <BookOpen size={15} />
                Continue Your Roadmap
              </Link>
            </div>

            <div className="mt-6 space-y-3">
              {roadmapSteps.length > 0 ? (
                roadmapSteps.map((step) => {
                  const done = step.userProgress[0]?.status === 'done';
                  return (
                    <div
                      key={step.id}
                      className={`rounded-2xl border p-4 ${
                        done
                          ? 'border-emerald-300/40 bg-emerald-50/55'
                          : 'border-primary/15 bg-baby-powder/85'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-text/55">
                            Step {step.stepNumber}
                          </p>
                          <p className="mt-1 text-base font-semibold text-text">{step.title}</p>
                        </div>
                        <span
                          className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] ${
                            done ? 'bg-emerald-100 text-emerald-700' : 'bg-primary/12 text-primary'
                          }`}
                        >
                          {done ? 'Completed' : 'In Progress'}
                        </span>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="rounded-2xl border border-primary/15 bg-baby-powder/85 p-5 text-center">
                  <p className="text-text/70">No roadmap data yet. Complete the quiz to generate your first path.</p>
                </div>
              )}
            </div>
          </section>
        )}

        {activeTab === 'resources' && (
          <section className="mt-6 premium-card rounded-3xl p-6 sm:p-7">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">Resource vault</p>
                <h2 className="font-display mt-1 text-3xl text-text">My Resources</h2>
              </div>
              <Link
                href="/ResourcesPage"
                className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.08em] text-primary"
              >
                Browse All
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {savedResources.map((resource) => (
                <article
                  key={resource.id}
                  className="rounded-2xl border border-primary/15 bg-baby-powder/85 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/35"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Download size={16} />
                    </div>
                    <span className="rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-primary">
                      {resource.type}
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-text">{resource.title}</h3>
                  <p className="mt-2 text-sm text-text/65">Category: {resource.category}</p>
                  <p className="mt-3 text-xs uppercase tracking-[0.08em] text-text/50">
                    Downloaded {resource.downloadDate}
                  </p>
                </article>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'achievements' && (
          <section className="mt-6 premium-card rounded-3xl p-6 sm:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">Milestone gallery</p>
            <h2 className="font-display mt-1 text-3xl text-text">Your Achievements</h2>
            <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {achievements.map((achievement) => (
                <article
                  key={achievement.id}
                  className={`rounded-2xl border p-5 transition-all duration-300 ${
                    achievement.earned
                      ? 'border-primary/30 bg-gradient-to-br from-primary/12 to-accent2/12'
                      : 'border-text/12 bg-baby-powder/75 opacity-80'
                  }`}
                >
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <div
                      className={`inline-flex h-11 w-11 items-center justify-center rounded-xl ${
                        achievement.earned
                          ? 'bg-gradient-to-br from-primary to-accent2 text-baby-powder'
                          : 'bg-text/15 text-text/45'
                      }`}
                    >
                      <achievement.icon size={19} />
                    </div>
                    <span
                      className={`rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] ${
                        achievement.earned
                          ? 'border border-primary/20 bg-primary/12 text-primary'
                          : 'border border-text/15 bg-text/8 text-text/55'
                      }`}
                    >
                      {achievement.earned ? 'Earned' : 'Locked'}
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-text">{achievement.title}</h3>
                  <p className="mt-1 text-sm text-text/68">{achievement.description}</p>
                  <p className="mt-3 text-xs uppercase tracking-[0.08em] text-text/52">
                    {achievement.earned ? `Earned ${achievement.date}` : `Progress: ${achievement.progress}`}
                  </p>
                </article>
              ))}
            </div>
          </section>
        )}

        <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-primary">
          <Flame size={13} />
          Keep building daily momentum
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
