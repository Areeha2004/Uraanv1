'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Filter,
  Heart,
  MapPin,
  MessageCircle,
  Search,
  Star,
  Users,
} from 'lucide-react';

interface PortfolioItem {
  title?: string;
  serviceType?: string;
  url?: string;
  image?: string;
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
  portfolio: PortfolioItem[];
  verified: boolean;
  topRated: boolean;
}

interface ApiCollaboratorResponse {
  id: string;
  userId: string;
  title: string;
  location: string;
  avatar: string;
  rating: number;
  reviewsCount: number;
  completedProjects?: number;
  responseTime: string;
  startingPrice: string;
  category: string;
  skills: string[];
  portfolio: PortfolioItem[];
  verified: boolean;
  topRated: boolean;
  user?: {
    name?: string;
    image?: string;
  };
}

const categories = [
  { id: 'all', label: 'All Services' },
  { id: 'design', label: 'Design and Branding' },
  { id: 'marketing', label: 'Marketing and Social Media' },
  { id: 'development', label: 'Web Development' },
  { id: 'content', label: 'Content Writing' },
  { id: 'photography', label: 'Photography' },
  { id: 'consulting', label: 'Business Consulting' },
  { id: 'finance', label: 'Finance and Accounting' },
];

const locations = [
  { id: 'all', label: 'All Pakistan' },
  { id: 'karachi', label: 'Karachi' },
  { id: 'lahore', label: 'Lahore' },
  { id: 'islamabad', label: 'Islamabad' },
  { id: 'faisalabad', label: 'Faisalabad' },
  { id: 'remote', label: 'Remote Only' },
];

const CollaborationPage: React.FC = () => {
  const router = useRouter();

  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');

  useEffect(() => {
    const controller = new AbortController();

    async function loadCollaborators() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch('/api/collaborators', { signal: controller.signal });
        if (!res.ok) throw new Error(`Failed to fetch collaborators (${res.status})`);

        const data: ApiCollaboratorResponse[] = await res.json();
        const mapped: Collaborator[] = data.map((entry) => ({
          id: entry.id,
          userId: entry.userId,
          name: entry.user?.name || 'Collaborator',
          title: entry.title || 'Freelance Specialist',
          location: entry.location || 'Pakistan',
          avatar: entry.avatar || '/default-profile.png',
          image: entry.user?.image || '/default-profile.png',
          rating: entry.rating ?? 0,
          reviewsCount: entry.reviewsCount ?? 0,
          completedProjects: entry.completedProjects ?? 0,
          responseTime: entry.responseTime || '24h',
          startingPrice: entry.startingPrice || 'PKR 0',
          category: entry.category || 'general',
          skills: Array.isArray(entry.skills) ? entry.skills : [],
          portfolio: Array.isArray(entry.portfolio) ? entry.portfolio : [],
          verified: !!entry.verified,
          topRated: !!entry.topRated,
        }));

        setCollaborators(mapped);
      } catch (err: unknown) {
        if (err instanceof Error && err.name !== 'AbortError') {
          setError(err.message || 'Something went wrong while loading collaborators.');
        }
      } finally {
        setLoading(false);
      }
    }

    loadCollaborators();
    return () => controller.abort();
  }, []);

  const filteredCollaborators = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    return collaborators.filter((collaborator) => {
      const matchesSearch =
        !term ||
        collaborator.name.toLowerCase().includes(term) ||
        collaborator.title.toLowerCase().includes(term) ||
        collaborator.skills.some((skill) => skill.toLowerCase().includes(term));

      const matchesCategory =
        selectedCategory === 'all' || collaborator.category === selectedCategory;

      const loc = collaborator.location.toLowerCase();
      const matchesLocation =
        selectedLocation === 'all' ||
        loc === selectedLocation ||
        (selectedLocation === 'remote' && loc === 'remote');

      return matchesSearch && matchesCategory && matchesLocation;
    });
  }, [collaborators, searchTerm, selectedCategory, selectedLocation]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedLocation('all');
  };

  return (
    <div className="relative isolate min-h-screen overflow-hidden px-4 pb-10 pt-8 sm:px-6 lg:px-8">
      <div className="aurora-bg absolute inset-0" />
      <div className="luxury-grid absolute inset-0 opacity-[0.18]" />
      <div className="pointer-events-none absolute -left-24 top-24 h-80 w-80 rounded-full bg-primary/20 blur-3xl animate-float-gentle" />
      <div className="pointer-events-none absolute -right-24 top-32 h-96 w-96 rounded-full bg-accent2/20 blur-3xl animate-float-delayed" />

      <div className="relative mx-auto max-w-7xl">
        <section className="premium-card rounded-[2rem] p-6 sm:p-8">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">Premium Collaboration Network</p>
            <h1 className="font-display mt-3 text-4xl leading-tight text-text sm:text-5xl">
              Find your ideal collaborator
            </h1>
            <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-text/72 sm:text-lg text-primary">
              Partner with skilled women professionals across Pakistan to accelerate your business execution.
            </p>
          </div>

          <div className="mx-auto mt-7 max-w-3xl">
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-text/40" size={18} />
              <input
                type="text"
                placeholder="Search by name, skill, or service..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-2xl border border-primary/20 bg-baby-powder/85 py-3 pl-11 pr-4 text-sm text-text placeholder:text-text/50 focus:border-primary/40 focus:outline-none"
              />
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full border border-emerald-300/40 bg-emerald-100/60 px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-emerald-700">
              <CheckCircle2 size={13} />
              Verified Experts
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-primary">
              <Heart size={13} />
              Safe Collaboration
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-primary">
              <MessageCircle size={13} />
              Direct Communication
            </span>
          </div>
        </section>

        <section className="mt-6 premium-card rounded-3xl p-5">
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.1em] text-primary">
            <Filter size={15} />
            Smart Filters
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-[0.08em] text-text/55">
                Service Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full rounded-xl border border-primary/20 bg-baby-powder/90 px-3 py-2.5 text-sm text-text focus:border-primary/40 focus:outline-none"
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-[0.08em] text-text/55">
                Location
              </label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full rounded-xl border border-primary/20 bg-baby-powder/90 px-3 py-2.5 text-sm text-text focus:border-primary/40 focus:outline-none"
              >
                {locations.map((location) => (
                  <option key={location.id} value={location.id}>
                    {location.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={clearFilters}
                className="w-full rounded-xl border border-primary/20 bg-baby-powder/90 px-4 py-2.5 text-sm font-semibold uppercase tracking-[0.08em] text-primary transition-all duration-300 hover:border-primary/35"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </section>

        <section className="mt-7">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-display text-3xl text-text">
              {filteredCollaborators.length} collaborators found
            </h2>
            <p className="text-sm text-text/60">
              Showing {selectedCategory !== 'all' ? categories.find((c) => c.id === selectedCategory)?.label : 'all categories'}
            </p>
          </div>

          {loading && (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, idx) => (
                <div key={idx} className="premium-card animate-pulse rounded-3xl p-5">
                  <div className="h-28 rounded-2xl bg-primary/10" />
                  <div className="mt-4 h-4 w-2/3 rounded bg-primary/10" />
                  <div className="mt-2 h-3 w-1/2 rounded bg-primary/10" />
                  <div className="mt-5 h-9 rounded-xl bg-primary/10" />
                </div>
              ))}
            </div>
          )}

          {!loading && error && (
            <div className="premium-card rounded-3xl p-8 text-center">
              <h3 className="font-display text-3xl text-text">Unable to load collaborators</h3>
              <p className="mt-2 text-text/70">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-5 rounded-xl bg-primary px-5 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-baby-powder"
              >
                Retry
              </button>
            </div>
          )}

          {!loading && !error && filteredCollaborators.length > 0 && (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
              {filteredCollaborators.map((collaborator) => {
                const preview =
                  collaborator.portfolio[1]?.image ||
                  collaborator.portfolio[1]?.url ||
                  collaborator.avatar ||
                  collaborator.image ||
                  '/default-profile.png';
                const avatarSrc =
                  collaborator.image ||
                  collaborator.avatar ||
                  collaborator.portfolio[1]?.image ||
                  '/default-profile.png';
                const coverSrc =
                  collaborator.avatar ||
                  collaborator.portfolio[1]?.image ||
                  collaborator.image ||
                  '/default-profile.png';
                const initials = collaborator.name
                  .split(' ')
                  .filter(Boolean)
                  .map((part) => part[0])
                  .join('')
                  .slice(0, 2)
                  .toUpperCase();

                return (
                  <article
                    key={collaborator.id}
                    className="premium-card group overflow-hidden rounded-[1.6rem] border border-primary/20 bg-baby-powder/80 p-0 shadow-[0_12px_35px_rgba(80,61,63,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/35"
                  >
                    <div
                      className="relative h-36 bg-cover bg-center"
                      style={{ backgroundImage: `url(${coverSrc})` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-text/75 via-text/25 to-transparent" />
                      <div className="absolute right-3 top-3 flex flex-wrap gap-1.5">
                        {collaborator.verified && (
                          <span className="rounded-full border border-emerald-300/40 bg-emerald-100/85 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-emerald-700">
                            Verified
                          </span>
                        )}
                        {collaborator.topRated && (
                          <span className="rounded-full border border-amber-300/40 bg-amber-100/85 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-amber-700">
                            Top Rated
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="p-4 pt-0">
                      <div className="-mt-9 mb-2 flex items-end justify-between gap-2">
                        <div className="relative z-10 rounded-2xl bg-baby-powder p-1.5 shadow-xl ring-1 ring-primary/15">
                          {avatarSrc ? (
                            <img
                              src={avatarSrc}
                              alt={`${collaborator.name} profile`}
                              onError={(e) => {
                                e.currentTarget.onerror = null;
                                e.currentTarget.src = '/default-profile.png';
                              }}
                              className="h-16 w-16 rounded-xl object-cover"
                            />
                          ) : (
                            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10 text-lg font-semibold uppercase text-primary">
                              {initials || 'U'}
                            </div>
                          )}
                        </div>
                        <span className="rounded-lg border border-primary/20 bg-primary/10 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-primary">
                          From {collaborator.startingPrice}
                        </span>
                      </div>

                      <h3 className="text-lg font-semibold text-text">{collaborator.name}</h3>
                      <p className="text-sm text-text/68">{collaborator.title}</p>
                      <p className="mt-1 flex items-center gap-1 text-xs uppercase tracking-[0.08em] text-text/55">
                        <MapPin size={12} className="text-primary" />
                        {collaborator.location}
                      </p>

                      <div className="mt-4 grid grid-cols-2 gap-2">
                        <div className="rounded-xl border border-primary/15 bg-baby-powder/90 p-2 text-center">
                          <p className="inline-flex items-center gap-1 text-sm font-semibold text-text">
                            <Star size={13} className="text-amber-500" fill="currentColor" />
                            {collaborator.rating.toFixed(1)}
                          </p>
                          <p className="text-[10px] uppercase tracking-[0.08em] text-text/55">
                            {collaborator.reviewsCount} reviews
                          </p>
                        </div>
                        <div className="rounded-xl border border-primary/15 bg-baby-powder/90 p-2 text-center">
                          <p className="text-sm font-semibold text-text">{collaborator.completedProjects}</p>
                          <p className="text-[10px] uppercase tracking-[0.08em] text-text/55">projects</p>
                        </div>
                      </div>

                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {collaborator.skills.slice(0, 4).map((skill, idx) => (
                          <span
                            key={idx}
                            className="rounded-full border border-primary/15 bg-primary/10 px-2.5 py-1 text-[11px] font-medium text-primary"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>

                      <div className="mt-3 flex items-center justify-between text-xs uppercase tracking-[0.08em] text-text/55">
                        <span className="inline-flex items-center gap-1">
                          <Clock size={12} className="text-primary" />
                          {collaborator.responseTime}
                        </span>
                        <span className="font-semibold text-primary">{collaborator.category}</span>
                      </div>

                      <div className="mt-4 overflow-hidden rounded-xl border border-primary/10">
                        <img
                          src={preview}
                          alt={`${collaborator.name} portfolio preview`}
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = '/default-profile.png';
                          }}
                          className="h-24 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>

                      <button
                        onClick={() => router.push(`/CollaboratorProfilePage/${collaborator.userId}`)}
                        className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-primary-light px-4 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-baby-powder transition-all duration-300 hover:-translate-y-0.5"
                      >
                        View Profile and Hire
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          {!loading && !error && filteredCollaborators.length === 0 && (
            <div className="premium-card rounded-3xl p-10 text-center">
              <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Search size={24} />
              </div>
              <h3 className="font-display mt-4 text-3xl text-text">No collaborators match your filters</h3>
              <p className="mt-2 text-text/70">Try broadening your search or clearing filters to see more profiles.</p>
              <button
                onClick={clearFilters}
                className="mt-5 rounded-xl bg-primary px-5 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-baby-powder"
              >
                Reset Filters
              </button>
            </div>
          )}
        </section>

        <section className="mt-12 rounded-[2rem] border border-primary/20 bg-gradient-to-br from-primary/10 to-accent2/10 p-6 sm:p-8">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">How it works</p>
            <h2 className="font-display mt-2 text-3xl text-text sm:text-4xl">A premium collaboration workflow</h2>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-4">
            {[
              {
                title: 'Browse Experts',
                text: 'Use smart filters to discover relevant profiles.',
                icon: Search,
              },
              {
                title: 'Discuss Needs',
                text: 'Connect directly and align on deliverables.',
                icon: MessageCircle,
              },
              {
                title: 'Hire Safely',
                text: 'Structured requests with clear scope and timelines.',
                icon: CheckCircle2,
              },
              {
                title: 'Build Together',
                text: 'Execute faster with trusted collaborators.',
                icon: Heart,
              },
            ].map((item) => (
              <article key={item.title} className="premium-card rounded-2xl p-4 text-center">
                <item.icon className="mx-auto text-primary" size={20} />
                <h3 className="mt-3 text-base font-semibold text-text">{item.title}</h3>
                <p className="mt-1 text-sm text-text/66">{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-[2rem] border border-primary/20 bg-gradient-to-r from-primary to-accent2 p-6 text-center text-baby-powder sm:p-8">
          <h2 className="font-display text-3xl sm:text-4xl">Ready to offer your own skills?</h2>
          <p className="mx-auto mt-3 max-w-2xl text-baby-powder/90">
            Join the URAAN collaborator network and grow your freelance profile while helping other founders.
          </p>
          <button
            onClick={() => router.push('/BecomeCollaboratorPage')}
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-baby-powder px-5 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-primary"
          >
            <Users size={14} />
            Become a Collaborator
          </button>
        </section>
      </div>
    </div>
  );
};

export default CollaborationPage;
