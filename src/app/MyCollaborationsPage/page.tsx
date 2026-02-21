'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { AlertCircle, Briefcase, Clock, Filter, RefreshCcw, Search, Sparkles, Users } from 'lucide-react';

import { Collaboration } from '@/components/types/collaboration';
import CollaborationCard from '../../components/collaboration/CollaborationCard';
import CollaborationTable from '../../components/collaboration/CollaborationTable';

interface CollaboratorInfo {
  collaborator: { id: string; name: string; image?: string };
  role: string;
  isClient: boolean;
}

const MyCollaborationsPage: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [collaborations, setCollaborations] = useState<Collaboration[]>([]);
  const [activeCollaborations, setActiveCollaborations] = useState<Collaboration[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeLoading, setActiveLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/LoginPage');
    }
  }, [status, router]);

  const fetchActiveCollaborations = useCallback(async () => {
    try {
      setActiveLoading(true);
      const res = await fetch('/api/collaborations/active', { credentials: 'include' });
      if (!res.ok) throw new Error('Failed to fetch active collaborations');
      const data: Collaboration[] = await res.json();
      setActiveCollaborations(data);
    } catch (err: unknown) {
      console.error('Error fetching active collaborations:', err);
    } finally {
      setActiveLoading(false);
    }
  }, []);

  const fetchCollaborations = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams();
      if (roleFilter !== 'all') params.append('role', roleFilter);
      if (statusFilter !== 'all') params.append('status', statusFilter);

      const res = await fetch(`/api/collaborations?${params.toString()}`, {
        credentials: 'include',
      });

      if (!res.ok) throw new Error('Failed to fetch collaborations');
      const data: Collaboration[] = await res.json();
      setCollaborations(data);
    } catch (err: unknown) {
      console.error('Error fetching collaborations:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [roleFilter, statusFilter]);

  useEffect(() => {
    if (status === 'authenticated') {
      fetchActiveCollaborations();
    }
  }, [status, fetchActiveCollaborations]);

  useEffect(() => {
    if (status === 'authenticated') {
      fetchCollaborations();
    }
  }, [status, fetchCollaborations]);

  const getCollaboratorInfo = (collaboration: Collaboration, currentUserId: string): CollaboratorInfo => {
    const isClient = collaboration.requesterId === currentUserId;
    const collaborator = isClient ? collaboration.receiver : collaboration.requester;
    const role = isClient ? "I'm Hiring" : "I'm Being Hired";
    return { collaborator, role, isClient };
  };

  const formatDaysLeft = (daysLeft?: number) => {
    if (daysLeft === undefined || daysLeft === null) return null;
    if (daysLeft < 0) return { text: `Overdue by ${Math.abs(daysLeft)} days`, isOverdue: true };
    if (daysLeft === 0) return { text: 'Due today', isOverdue: false };
    return { text: `${daysLeft} days left`, isOverdue: false };
  };

  const currentUserId = session?.user?.id || '';

  const stats = useMemo(() => {
    const pending = collaborations.filter((item) => item.status === 'pending').length;
    const inProgress = collaborations.filter((item) => item.status === 'in_progress').length;
    const completed = collaborations.filter((item) => item.status === 'completed').length;
    return [
      { label: 'Active Projects', value: activeCollaborations.length, icon: Clock },
      { label: 'Pending', value: pending, icon: AlertCircle },
      { label: 'In Progress', value: inProgress, icon: Briefcase },
      { label: 'Completed', value: completed, icon: Sparkles },
    ];
  }, [activeCollaborations.length, collaborations]);

  if (status === 'loading') {
    return (
      <div className="relative isolate min-h-screen overflow-hidden px-4 pb-10 pt-8 sm:px-6 lg:px-8">
        <div className="aurora-bg absolute inset-0" />
        <div className="luxury-grid absolute inset-0 opacity-[0.18]" />
        <div className="relative mx-auto flex max-w-4xl items-center justify-center pt-20">
          <div className="premium-card rounded-3xl px-8 py-10 text-center">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            <p className="mt-3 text-sm font-semibold uppercase tracking-[0.08em] text-primary">Loading collaborations</p>
          </div>
        </div>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return null;
  }

  return (
    <div className="relative isolate min-h-screen overflow-hidden px-4 pb-12 pt-8 sm:px-6 lg:px-8">
      <div className="aurora-bg absolute inset-0" />
      <div className="luxury-grid absolute inset-0 opacity-[0.18]" />
      <div className="pointer-events-none absolute -left-24 top-24 h-80 w-80 rounded-full bg-primary/20 blur-3xl animate-float-gentle" />
      <div className="pointer-events-none absolute -right-24 top-36 h-96 w-96 rounded-full bg-accent2/20 blur-3xl animate-float-delayed" />

      <div className="relative mx-auto max-w-7xl">
        <section className="premium-card rounded-[2rem] border border-primary/20 p-6 sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">Workspace</p>
              <h1 className="font-display mt-2 text-4xl leading-tight text-text sm:text-5xl">
                My Collaborations
              </h1>
              <p className="mt-3 max-w-3xl text-primary leading-relaxed text-text/72">
                Monitor active projects, review requests, and manage all collaboration engagements in one premium control center.
              </p>
            </div>
            <button
              onClick={() => {
                fetchActiveCollaborations();
                fetchCollaborations();
              }}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-primary/25 bg-baby-powder px-4 py-3 text-xs font-semibold uppercase tracking-[0.08em] text-primary transition-colors hover:border-primary/40"
            >
              <RefreshCcw size={14} />
              Refresh Data
            </button>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {stats.map((stat) => (
              <article key={stat.label} className="rounded-2xl border border-primary/15 bg-baby-powder/90 p-3">
                <div className="flex items-center justify-between">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-text/55">{stat.label}</p>
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <stat.icon size={15} />
                  </span>
                </div>
                <p className="mt-2 text-xl font-semibold text-text">{stat.value}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-6 premium-card rounded-3xl border border-primary/15 p-5">
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.1em] text-primary">
            <Filter size={15} />
            Smart Filters
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-[0.08em] text-text/55">Role</label>
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="w-full rounded-xl border border-primary/20 bg-baby-powder/90 px-3 py-2.5 text-sm text-text focus:border-primary/40 focus:outline-none"
              >
                <option value="all">All Roles</option>
                <option value="requester">I&apos;m Hiring</option>
                <option value="receiver">I&apos;m Being Hired</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-[0.08em] text-text/55">Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full rounded-xl border border-primary/20 bg-baby-powder/90 px-3 py-2.5 text-sm text-text focus:border-primary/40 focus:outline-none"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="accepted">Accepted</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="declined">Declined</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={() => {
                  setRoleFilter('all');
                  setStatusFilter('all');
                }}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-primary/20 bg-baby-powder px-4 py-2.5 text-sm font-semibold uppercase tracking-[0.08em] text-primary transition-colors hover:border-primary/35"
              >
                <Search size={14} />
                Clear Filters
              </button>
            </div>
          </div>
        </section>

        <section className="mt-8">
          <div className="mb-5 flex items-center gap-3">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-baby-powder">
              <Clock size={18} />
            </div>
            <h2 className="font-display text-3xl text-text">Active Projects</h2>
          </div>

          {activeLoading ? (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="premium-card animate-pulse rounded-3xl p-5">
                  <div className="h-4 w-1/3 rounded bg-primary/10" />
                  <div className="mt-4 h-20 rounded-xl bg-primary/10" />
                  <div className="mt-4 h-10 rounded-xl bg-primary/10" />
                </div>
              ))}
            </div>
          ) : activeCollaborations.length === 0 ? (
            <div className="premium-card rounded-3xl p-10 text-center">
              <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Briefcase size={24} />
              </div>
              <h3 className="font-display mt-4 text-3xl text-text">No active projects yet</h3>
              <p className="mt-2 text-text/68">
                Active collaborations will appear here once a request is accepted and started.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
              {activeCollaborations.map((collaboration) => {
                const { collaborator, role, isClient } = getCollaboratorInfo(collaboration, currentUserId);
                const daysLeftInfo = formatDaysLeft(collaboration.daysLeft);

                return (
                  <CollaborationCard
                    key={collaboration.id}
                    collaboration={collaboration}
                    collaborator={collaborator}
                    role={role}
                    isClient={isClient}
                    daysLeftInfo={daysLeftInfo}
                  />
                );
              })}
            </div>
          )}
        </section>

        <section className="mt-10">
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent2 text-baby-powder">
              <Users size={18} />
            </div>
            <h2 className="font-display text-3xl text-text">All Collaborations</h2>
            <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-primary">
              {collaborations.length} total
            </span>
          </div>

          {loading ? (
            <div className="premium-card rounded-3xl p-6">
              <div className="animate-pulse space-y-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="h-14 rounded-xl bg-primary/10" />
                ))}
              </div>
            </div>
          ) : error ? (
            <div className="premium-card rounded-3xl p-10 text-center">
              <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100 text-red-600">
                <AlertCircle size={24} />
              </div>
              <h3 className="font-display mt-4 text-3xl text-text">Could not load collaborations</h3>
              <p className="mt-2 text-text/70">{error}</p>
              <button
                onClick={fetchCollaborations}
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-baby-powder"
              >
                Retry
              </button>
            </div>
          ) : collaborations.length === 0 ? (
            <div className="premium-card rounded-3xl p-10 text-center">
              <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Users size={24} />
              </div>
              <h3 className="font-display mt-4 text-3xl text-text">No collaborations found</h3>
              <p className="mt-2 text-text/70">
                {roleFilter !== 'all' || statusFilter !== 'all'
                  ? 'Try broadening your filters to see more results.'
                  : 'Start collaborating to build your project history.'}
              </p>
              <button
                onClick={() => router.push('/CollaborationPage')}
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-primary-light px-5 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-baby-powder"
              >
                Find Collaborators
              </button>
            </div>
          ) : (
            <CollaborationTable
              collaborations={collaborations}
              currentUserId={currentUserId}
              getCollaboratorInfo={getCollaboratorInfo}
              formatDaysLeft={formatDaysLeft}
              onUpdateCollaboration={(updated) => {
                setCollaborations((prev) => prev.map((item) => (item.id === updated.id ? updated : item)));
                setActiveCollaborations((prev) => {
                  const isActive = updated.status === 'accepted' || updated.status === 'in_progress';
                  const exists = prev.some((item) => item.id === updated.id);

                  if (isActive && exists) {
                    return prev.map((item) => (item.id === updated.id ? updated : item));
                  }
                  if (isActive && !exists) {
                    return [updated, ...prev];
                  }
                  if (!isActive && exists) {
                    return prev.filter((item) => item.id !== updated.id);
                  }
                  return prev;
                });
              }}
            />
          )}
        </section>
      </div>
    </div>
  );
};

export default MyCollaborationsPage;
