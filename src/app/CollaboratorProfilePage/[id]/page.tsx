'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import {
  ArrowLeft,
  Award,
  Calendar,
  CheckCircle2,
  Clock,
  DollarSign,
  ExternalLink,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Star,
  Users,
} from 'lucide-react';

import HireCollaboratorModal from '../../../components/collaboration/HireCollaboratorModal';

interface Review {
  id: number;
  client: string;
  rating: number;
  comment: string;
  project: string;
  date: string;
  avatar: string;
}

interface Package {
  name: string;
  price: string;
  deliveryTime: string;
  features: string[];
}

interface PortfolioItem {
  id: string;
  title: string;
  image: string;
  category: string;
  url: string;
}

interface Collaborator {
  id: string;
  userId: string;
  name: string;
  title: string;
  location: string;
  avatar: string;
  image: string;
  rating: number;
  reviewsCount: number;
  completedProjects: number;
  responseTime: string;
  startingPrice: string;
  category: string;
  skills: string[];
  bio: string;
  portfolio: PortfolioItem[];
  verified: boolean;
  topRated: boolean;
}

type ActiveTab = 'portfolio' | 'about' | 'reviews';

const staticReviews: Review[] = [
  {
    id: 1,
    client: 'Fatima Ahmed',
    rating: 5,
    comment: 'Outstanding quality and very clear communication. The final outcome was better than expected.',
    project: 'Logo Design',
    date: '2 weeks ago',
    avatar: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg',
  },
  {
    id: 2,
    client: 'Ayesha Khan',
    rating: 5,
    comment: 'Delivered on time with excellent revisions support. Highly recommended for founder branding projects.',
    project: 'Brand Identity Package',
    date: '1 month ago',
    avatar: 'https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg',
  },
  {
    id: 3,
    client: 'Zara Butt',
    rating: 4,
    comment: 'Great collaboration and creative execution. Smooth process from kickoff to delivery.',
    project: 'Social Media Graphics',
    date: '2 months ago',
    avatar: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg',
  },
];

const staticPackages: Package[] = [
  {
    name: 'Basic Package',
    price: 'PKR 15,000',
    deliveryTime: '3 days',
    features: ['1 concept', '3 revisions', 'Export files', 'Basic delivery support'],
  },
  {
    name: 'Standard Package',
    price: 'PKR 35,000',
    deliveryTime: '7 days',
    features: ['3 concepts', 'Unlimited revisions', 'Brand kit', 'Social media assets'],
  },
  {
    name: 'Premium Package',
    price: 'PKR 65,000',
    deliveryTime: '14 days',
    features: ['Full identity system', 'Priority support', 'Marketing assets', 'Extended handover'],
  },
];

const languages = ['English', 'Urdu', 'Punjabi'];

const CollaboratorProfilePage: React.FC = () => {
  const { id } = useParams();
  const collaboratorId = String(id ?? '');

  const { data: session, status } = useSession();

  const [showHireModal, setShowHireModal] = useState(false);
  const [activeTab, setActiveTab] = useState<ActiveTab>('portfolio');
  const [collaborator, setCollaborator] = useState<Collaborator | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!collaboratorId) return;

    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`/api/collaborators/${collaboratorId}`);
        if (!res.ok) throw new Error('Failed to fetch collaborator profile');

        const entry = await res.json();

        const normalizedPortfolio: PortfolioItem[] = Array.isArray(entry.portfolio)
          ? entry.portfolio.map((item: { title?: string; serviceType?: string; url?: string; image?: string }, index: number) => ({
              id: `${index}-${item.title || 'portfolio'}`,
              title: item.title || 'Portfolio item',
              category: item.serviceType || 'General',
              url: item.url || '',
              image: item.image || item.url || '/default-profile.png',
            }))
          : [];

        const mapped: Collaborator = {
          id: String(entry.id || ''),
          userId: String(entry.userId || ''),
          name: entry.user?.name || 'Collaborator',
          title: entry.title || 'Freelance Specialist',
          location: entry.location || entry.user?.location || 'Pakistan',
          avatar: entry.avatar || entry.user?.image || '/default-profile.png',
          image: entry.user?.image || '/default-profile.png',
          rating: entry.rating || 0,
          reviewsCount: entry.reviewsCount || 0,
          completedProjects: entry.completedProjects || 0,
          responseTime: entry.responseTime || '24h',
          startingPrice: entry.startingPrice || 'PKR 0',
          category: entry.category || 'general',
          skills: Array.isArray(entry.skills) ? entry.skills : [],
          bio:
            entry.user?.bio ||
            'Experienced collaborator focused on helping founders move from ideas to execution.',
          portfolio: normalizedPortfolio,
          verified: !!entry.verified,
          topRated: !!entry.topRated,
        };

        setCollaborator(mapped);
      } catch (err: unknown) {
        console.error(err);
        setError(err instanceof Error ? err.message : 'Something went wrong loading profile.');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [collaboratorId]);

  const userIsHiring = useMemo(() => {
    if (status !== 'authenticated' || !collaborator?.userId || !session?.user?.id) return true;
    return session.user.id !== collaborator.userId;
  }, [status, collaborator?.userId, session?.user?.id]);

  if (loading) {
    return (
      <div className="relative isolate min-h-screen overflow-hidden px-4 pb-10 pt-8 sm:px-6 lg:px-8">
        <div className="aurora-bg absolute inset-0" />
        <div className="luxury-grid absolute inset-0 opacity-[0.18]" />
        <div className="relative mx-auto max-w-3xl">
          <div className="premium-card rounded-3xl p-10 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">Loading profile</p>
            <h2 className="font-display mt-3 text-4xl text-text">Preparing collaborator workspace</h2>
          </div>
        </div>
      </div>
    );
  }

  if (error || !collaborator) {
    return (
      <div className="relative isolate min-h-screen overflow-hidden px-4 pb-10 pt-8 sm:px-6 lg:px-8">
        <div className="aurora-bg absolute inset-0" />
        <div className="luxury-grid absolute inset-0 opacity-[0.18]" />
        <div className="relative mx-auto max-w-2xl">
          <div className="premium-card rounded-3xl p-8 text-center">
            <h2 className="font-display text-3xl text-text">Collaborator not available</h2>
            <p className="mt-3 text-text/70">{error || 'Profile could not be loaded.'}</p>
            <Link
              href="/CollaborationPage"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-baby-powder"
            >
              <ArrowLeft size={14} />
              Back to Collaborators
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const stats = [
    {
      label: 'Rating',
      value: collaborator.rating.toFixed(1),
      sub: `${collaborator.reviewsCount} reviews`,
      icon: Star,
    },
    {
      label: 'Projects',
      value: `${collaborator.completedProjects}`,
      sub: 'Completed',
      icon: CheckCircle2,
    },
    {
      label: 'Response',
      value: collaborator.responseTime,
      sub: 'Typical reply',
      icon: Clock,
    },
    {
      label: 'Starting',
      value: collaborator.startingPrice,
      sub: 'Base budget',
      icon: DollarSign,
    },
  ];
  const coverSrc =
    collaborator.avatar ||
    collaborator.portfolio[0]?.image ||
    collaborator.image ||
    '/default-profile.png';
  const avatarSrc = collaborator.image || collaborator.avatar || '/default-profile.png';
  const initials = collaborator.name
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="relative isolate min-h-screen overflow-hidden px-4 pb-10 pt-8 sm:px-6 lg:px-8">
      <div className="aurora-bg absolute inset-0" />
      <div className="luxury-grid absolute inset-0 opacity-[0.18]" />
      <div className="pointer-events-none absolute -left-24 top-24 h-80 w-80 rounded-full bg-primary/20 blur-3xl animate-float-gentle" />
      <div className="pointer-events-none absolute -right-24 top-32 h-96 w-96 rounded-full bg-accent2/20 blur-3xl animate-float-delayed" />

      <div className="relative mx-auto max-w-7xl">
        <Link
          href="/CollaborationPage"
          className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-baby-powder/85 px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-primary transition-colors hover:border-primary/35"
        >
          <ArrowLeft size={14} />
          Back to Collaborators
        </Link>

        <section className="premium-card mt-5 overflow-hidden rounded-[2rem] border border-primary/20 bg-baby-powder/80 shadow-[0_18px_48px_rgba(80,61,63,0.08)]">
          <div
            className="relative h-56 bg-cover bg-center sm:h-72"
            style={{ backgroundImage: `url(${coverSrc})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-text/75 via-text/30 to-transparent" />
            <div className="absolute right-5 top-5 flex flex-wrap gap-2">
              {collaborator.verified && (
                <span className="inline-flex items-center gap-1 rounded-full border border-emerald-300/40 bg-emerald-100/75 px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-emerald-700">
                  <ShieldCheck size={13} />
                  Verified
                </span>
              )}
              {collaborator.topRated && (
                <span className="inline-flex items-center gap-1 rounded-full border border-amber-300/40 bg-amber-100/75 px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-amber-700">
                  <Award size={13} />
                  Top Rated
                </span>
              )}
            </div>
            <div className="absolute bottom-4 left-5 right-5 flex flex-wrap items-center justify-between gap-2">
              <span className="rounded-full border border-baby-powder/35 bg-baby-powder/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-baby-powder">
                {collaborator.category}
              </span>
              <span className="rounded-full border border-baby-powder/35 bg-baby-powder/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-baby-powder">
                {collaborator.responseTime} response
              </span>
            </div>
            <div className="absolute -bottom-10 left-6 z-20 rounded-2xl bg-baby-powder p-1.5 shadow-2xl ring-1 ring-primary/15 sm:-bottom-12">
              {avatarSrc ? (
                <img
                  src={avatarSrc}
                  alt={collaborator.name}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = '/default-profile.png';
                  }}
                  className="h-20 w-20 rounded-xl object-cover sm:h-24 sm:w-24"
                />
              ) : (
                <div className="flex h-20 w-20 items-center justify-center rounded-xl bg-primary/10 text-2xl font-semibold uppercase text-primary sm:h-24 sm:w-24">
                  {initials || 'U'}
                </div>
              )}
            </div>
          </div>

          <div className="p-6 pt-14 sm:p-8 sm:pt-16">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">Collaborator Profile</p>
                <h1 className="font-display mt-1 text-3xl leading-tight text-text sm:text-4xl">
                  {collaborator.name}
                </h1>
                <p className="mt-1 text-base text-text/70">{collaborator.title}</p>
                <div className="mt-2 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.08em] text-text/60">
                  <span className="inline-flex items-center gap-1">
                    <MapPin size={12} className="text-primary" />
                    {collaborator.location}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Calendar size={12} className="text-primary" />
                    Member since 2025
                  </span>
                </div>
              </div>

              <div className="rounded-2xl border border-primary/20 bg-baby-powder/90 p-3 shadow-[0_10px_26px_rgba(80,61,63,0.07)]">
                <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-primary">Hire Collaborator</p>
                <p className="mt-1 text-xs text-text/65">
                  Starting at <span className="font-semibold text-primary">{collaborator.startingPrice}</span> with{' '}
                  {collaborator.responseTime} response time.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <button
                    onClick={() => setShowHireModal(true)}
                    disabled={!userIsHiring}
                    className={`inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold uppercase tracking-[0.08em] transition-all duration-300 ${
                      userIsHiring
                        ? 'bg-gradient-to-r from-primary to-primary-light text-baby-powder hover:-translate-y-0.5 hover:shadow-[0_14px_28px_rgba(175,130,137,0.3)]'
                        : 'cursor-not-allowed bg-text/10 text-text/45'
                    }`}
                  >
                    <Users size={14} />
                    {userIsHiring ? 'Hire Now' : 'Your Profile'}
                  </button>
                  <button className="inline-flex items-center gap-2 rounded-xl border border-primary/25 bg-baby-powder px-5 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-primary transition-colors hover:border-primary/35">
                    <MessageCircle size={14} />
                    Send Message
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {stats.map((stat) => (
                <article key={stat.label} className="rounded-2xl border border-primary/20 bg-baby-powder/92 p-3 shadow-[0_8px_22px_rgba(80,61,63,0.05)]">
                  <div className="flex items-center justify-between">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-text/55">{stat.label}</p>
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <stat.icon size={15} />
                    </span>
                  </div>
                  <p className="mt-2 text-base font-semibold text-text">{stat.value}</p>
                  <p className="text-[11px] uppercase tracking-[0.08em] text-text/55">{stat.sub}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="space-y-6">
            <div className="premium-card rounded-3xl p-4">
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'portfolio', label: 'Portfolio' },
                  { id: 'about', label: 'About' },
                  { id: 'reviews', label: 'Reviews' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as ActiveTab)}
                    className={`rounded-xl px-4 py-2 text-sm font-semibold uppercase tracking-[0.08em] transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'bg-primary text-baby-powder'
                        : 'text-text/70 hover:bg-primary/10 hover:text-primary'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {activeTab === 'portfolio' && (
              <article className="premium-card rounded-3xl p-6">
                <h3 className="font-display text-3xl text-text">Portfolio</h3>
                <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
                  {collaborator.portfolio.length > 0 ? (
                    collaborator.portfolio.map((item) => (
                      <div key={item.id} className="group overflow-hidden rounded-2xl border border-primary/15 bg-baby-powder/85">
                        <div className="relative h-48">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-text/50 via-transparent to-transparent" />
                          {item.url && (
                            <a
                              href={item.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-baby-powder text-primary shadow"
                            >
                              <ExternalLink size={14} />
                            </a>
                          )}
                        </div>
                        <div className="p-3">
                          <h4 className="text-base font-semibold text-text">{item.title}</h4>
                          <p className="text-sm text-text/60">{item.category}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-text/65">No portfolio items available yet.</p>
                  )}
                </div>
              </article>
            )}

            {activeTab === 'about' && (
              <article className="premium-card rounded-3xl p-6">
                <h3 className="font-display text-3xl text-text">About</h3>
                <p className="mt-4 text-base leading-relaxed text-text/72">{collaborator.bio}</p>

                <div className="mt-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.1em] text-text/55">Skills and Expertise</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {collaborator.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-primary"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.1em] text-text/55">Languages</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {languages.map((language) => (
                      <span
                        key={language}
                        className="rounded-full border border-primary/15 bg-baby-powder/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-text/70"
                      >
                        {language}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            )}

            {activeTab === 'reviews' && (
              <article className="premium-card rounded-3xl p-6">
                <h3 className="font-display text-3xl text-text">Client Reviews</h3>
                <div className="mt-5 space-y-4">
                  {staticReviews.map((review) => (
                    <div key={review.id} className="rounded-2xl border border-primary/15 bg-baby-powder/85 p-4">
                      <div className="flex items-start gap-3">
                        <img
                          src={review.avatar}
                          alt={review.client}
                          className="h-11 w-11 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <div>
                              <p className="text-sm font-semibold text-text">{review.client}</p>
                              <p className="text-xs uppercase tracking-[0.08em] text-text/55">
                                {review.project} | {review.date}
                              </p>
                            </div>
                            <div className="flex items-center gap-1 text-amber-500">
                              {Array.from({ length: review.rating }).map((_, idx) => (
                                <Star key={idx} size={14} fill="currentColor" />
                              ))}
                            </div>
                          </div>
                          <p className="mt-2 text-sm text-text/72">{review.comment}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            )}
          </div>

          <aside className="space-y-6">
            <article className="premium-card rounded-3xl p-5">
              <h3 className="font-display text-2xl text-text">Packages</h3>
              <div className="mt-4 space-y-3">
                {staticPackages.map((pkg) => (
                  <div key={pkg.name} className="rounded-2xl border border-primary/15 bg-baby-powder/85 p-4">
                    <div className="mb-2 flex items-start justify-between gap-2">
                      <h4 className="text-sm font-semibold text-text">{pkg.name}</h4>
                      <span className="text-sm font-semibold text-primary">{pkg.price}</span>
                    </div>
                    <p className="text-xs uppercase tracking-[0.08em] text-text/55">{pkg.deliveryTime} delivery</p>
                    <ul className="mt-3 space-y-1.5">
                      {pkg.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2 text-sm text-text/70">
                          <CheckCircle2 size={13} className="mt-0.5 text-emerald-600" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </article>

            <article className="premium-card rounded-3xl p-5">
              <h3 className="font-display text-2xl text-text">Quick Stats</h3>
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-text/65">Response Rate</span>
                  <span className="font-semibold text-text">100%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-text/65">On-time Delivery</span>
                  <span className="font-semibold text-text">98%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-text/65">Repeat Clients</span>
                  <span className="font-semibold text-text">85%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-text/65">Average Rating</span>
                  <span className="font-semibold text-text">{collaborator.rating.toFixed(1)}/5.0</span>
                </div>
              </div>
            </article>

            <article className="rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/10 to-accent2/10 p-5">
              <h3 className="font-display text-2xl text-text">Trust and Safety</h3>
              <div className="mt-4 space-y-2 text-sm text-text/72">
                <p className="inline-flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-emerald-600" />
                  Identity verified
                </p>
                <p className="inline-flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-emerald-600" />
                  Protected payments
                </p>
                <p className="inline-flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-emerald-600" />
                  Quality assurance standards
                </p>
              </div>
            </article>
          </aside>
        </section>
      </div>

      {showHireModal && (
        <HireCollaboratorModal
          collaborator={{
            id: collaborator.userId,
            name: collaborator.name,
            title: collaborator.title,
            avatar: collaborator.avatar || collaborator.image,
            startingPrice: collaborator.startingPrice,
          }}
          role={userIsHiring ? 'requester' : 'receiver'}
          onClose={() => setShowHireModal(false)}
          onSubmit={async ({
            id,
            role,
            projectTitle,
            projectDescription,
            budget,
            deadline,
            contactMethod,
            additionalInfo,
          }) => {
            try {
              const res = await fetch('/api/collaborations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  id,
                  role,
                  projectTitle,
                  projectDescription,
                  budget,
                  deadline,
                  contactMethod,
                  additionalInfo: additionalInfo?.trim() || null,
                }),
              });

              if (!res.ok) {
                const err = await res.json().catch(() => ({}));
                throw new Error(err?.error || 'Failed to create collaboration');
              }
            } catch (err: unknown) {
              console.error('Error creating collaboration:', err);
              alert(err instanceof Error ? err.message : 'Failed to send request. Please try again.');
            }
          }}
        />
      )}
    </div>
  );
};

export default CollaboratorProfilePage;
