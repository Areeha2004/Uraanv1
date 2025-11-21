"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
// pages/my-collaborations.tsx
import { Collaboration } from '@/components/types/collaboration';

import {
  Users,
  Filter,
  Calendar,
  DollarSign,
  Clock,
  AlertCircle,
  CheckCircle,
  User,
  Briefcase,
} from "lucide-react";
import CollaborationCard from "../../components/collaboration/CollaborationCard";
import CollaborationTable from "../../components/collaboration/CollaborationTable";
import CollaborationStatusBadge from "../../components/collaboration/CollaborationStatusBadge";

interface CollaborationTableProps {
  collaborations: Collaboration[];
  currentUserId: string;
  getCollaboratorInfo: (
    collaboration: Collaboration,
    currentUserId: string
  ) => {
    collaborator: { id: string; name: string; image?: string };
    role: string;
    isClient: boolean;
  };
  formatDaysLeft: (
    daysLeft?: number
  ) => { text: string; isOverdue: boolean } | null;
}
const MyCollaborationsPage: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [collaborations, setCollaborations] = useState<Collaboration[]>([]);
  const [activeCollaborations, setActiveCollaborations] = useState<Collaboration[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeLoading, setActiveLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Redirect if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/LoginPage");
    }
  }, [status, router]);

  // Fetch active collaborations
  const fetchActiveCollaborations = async () => {
    try {
      setActiveLoading(true);
      const res = await fetch('/api/collaborations/active', {
        credentials: 'include',
      });
      if (!res.ok) throw new Error('Failed to fetch active collaborations');
      const data = await res.json();
      setActiveCollaborations(data);
    } catch (err: any) {
      console.error('Error fetching active collaborations:', err);
    } finally {
      setActiveLoading(false);
    }
  };

  // Fetch all collaborations
  const fetchCollaborations = async () => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams();
      if (roleFilter !== 'all') {
        params.append('role', roleFilter);
      }
      if (statusFilter !== 'all') {
        params.append('status', statusFilter);
      }

      const res = await fetch(`/api/collaborations?${params.toString()}`, {
        credentials: 'include',
      });

      if (!res.ok) throw new Error('Failed to fetch collaborations');
      const data = await res.json();
      setCollaborations(data);
    } catch (err: any) {
      console.error('Error fetching collaborations:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    if (status === "authenticated") {
      fetchActiveCollaborations();
      fetchCollaborations();
    }
  }, [status]);

  // Refetch when filters change
  useEffect(() => {
    if (status === "authenticated") {
      fetchCollaborations();
    }
  }, [roleFilter, statusFilter, status]);

  // Helper function to get collaborator info
  const getCollaboratorInfo: CollaborationTableProps['getCollaboratorInfo'] = (
  collaboration,
  currentUserId
) => {
  const isClient = collaboration.requesterId === currentUserId;
  const collaborator = isClient
    ? collaboration.receiver
    : collaboration.requester;
  const role = isClient ? "I'm Hiring" : "I'm Being Hired";
  return { collaborator, role, isClient };
};


  // Helper function to format days left
  const formatDaysLeft = (daysLeft?: number) => {
    if (daysLeft === undefined || daysLeft === null) return null;
    if (daysLeft < 0) {
      return { text: `Overdue by ${Math.abs(daysLeft)} days`, isOverdue: true };
    }
    if (daysLeft === 0) {
      return { text: "Due today", isOverdue: false };
    }
    return { text: `${daysLeft} days left`, isOverdue: false };
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return null;
  }

  const currentUserId = session?.user?.id || '';

  return (
    <div className="min-h-screen pt-16 px-4 sm:px-6 lg:px-8">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-base via-baby-powder to-secondary/20"></div>
      <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-accent2/10 to-primary/10 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto py-12">
        {/* Header */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-text mb-2">
                My <span className="bg-gradient-to-r from-primary to-accent1 bg-clip-text text-transparent">Collaborations</span>
              </h1>
              <p className="text-lg text-text/70">
                Manage all your collaboration projects in one place
              </p>
            </div>

            {/* Active Collaborations Badge */}
            <div className="flex items-center space-x-2 bg-glass-bg backdrop-blur-sm border border-secondary/20 rounded-2xl px-6 py-3">
              <Users className="text-primary" size={20} />
              <span className="text-text font-medium">Active Projects:</span>
              <span className="bg-primary text-baby-powder px-3 py-1 rounded-full font-bold">
                {activeCollaborations.length}
              </span>
            </div>
          </div>

          {/* Filters */}
          <div className="mt-8 bg-glass-bg backdrop-blur-sm border border-secondary/20 rounded-2xl p-6">
            <div className="flex items-center space-x-4 mb-4">
              <Filter className="text-text/60" size={20} />
              <span className="font-medium text-text">Filter by:</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text/70 mb-2">Role</label>
                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="w-full p-3 bg-baby-powder/50 border border-secondary/30 rounded-xl text-text focus:outline-none focus:border-primary"
                >
                  <option value="all">All Roles</option>
                  <option value="requester">I'm Hiring</option>
                  <option value="receiver">I'm Being Hired</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-text/70 mb-2">Status</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full p-3 bg-baby-powder/50 border border-secondary/30 rounded-xl text-text focus:outline-none focus:border-primary"
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
            </div>
          </div>
        </div>

        {/* Active Collaborations Section */}
        <div className="mb-12">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-light rounded-xl flex items-center justify-center">
              <Clock size={20} className="text-baby-powder" />
            </div>
            <h2 className="text-2xl font-bold text-text">Active Projects</h2>
          </div>

          {activeLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-glass-bg backdrop-blur-sm border border-secondary/20 rounded-2xl p-6 animate-pulse">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-secondary/30 rounded-full"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-secondary/30 rounded mb-2"></div>
                      <div className="h-3 bg-secondary/20 rounded w-2/3"></div>
                    </div>
                  </div>
                  <div className="h-16 bg-secondary/20 rounded mb-4"></div>
                  <div className="flex justify-between items-center">
                    <div className="h-6 bg-secondary/30 rounded w-20"></div>
                    <div className="h-4 bg-secondary/20 rounded w-16"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : activeCollaborations.length === 0 ? (
            <div className="bg-glass-bg backdrop-blur-sm border border-secondary/20 rounded-2xl p-12 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="text-primary" size={24} />
              </div>
              <h3 className="text-lg font-bold text-text mb-2">No Active Projects</h3>
              <p className="text-text/60">You don't have any active collaborations at the moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
        </div>

        {/* All Collaborations Section */}
        <div>
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-accent2 to-accent2-light rounded-xl flex items-center justify-center">
              <Users size={20} className="text-baby-powder" />
            </div>
            <h2 className="text-2xl font-bold text-text">All Collaborations</h2>
            <span className="text-text/60">({collaborations.length} total)</span>
          </div>

          {loading ? (
            <div className="bg-glass-bg backdrop-blur-sm border border-secondary/20 rounded-2xl p-6">
              <div className="animate-pulse space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-center space-x-4 py-4">
                    <div className="w-12 h-12 bg-secondary/30 rounded-full"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-secondary/30 rounded w-1/4"></div>
                      <div className="h-3 bg-secondary/20 rounded w-1/2"></div>
                    </div>
                    <div className="h-6 bg-secondary/30 rounded w-20"></div>
                    <div className="h-4 bg-secondary/20 rounded w-16"></div>
                  </div>
                ))}
              </div>
            </div>
          ) : error ? (
            <div className="bg-glass-bg backdrop-blur-sm border border-red-200 rounded-2xl p-12 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="text-red-500" size={24} />
              </div>
              <h3 className="text-lg font-bold text-text mb-2">Error Loading Collaborations</h3>
              <p className="text-text/60 mb-4">{error}</p>
              <button
                onClick={fetchCollaborations}
                className="bg-primary text-baby-powder px-6 py-2 rounded-xl hover:bg-primary-light transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : collaborations.length === 0 ? (
            <div className="bg-glass-bg backdrop-blur-sm border border-secondary/20 rounded-2xl p-12 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-primary" size={24} />
              </div>
              <h3 className="text-lg font-bold text-text mb-2">No Collaborations Found</h3>
              <p className="text-text/60 mb-6">
                {roleFilter !== 'all' || statusFilter !== 'all' 
                  ? 'Try adjusting your filters to see more results.'
                  : 'Start collaborating with other entrepreneurs to see your projects here.'
                }
              </p>
              {roleFilter !== 'all' || statusFilter !== 'all' ? (
                <button
                  onClick={() => {
                    setRoleFilter('all');
                    setStatusFilter('all');
                  }}
                  className="bg-primary text-baby-powder px-6 py-3 rounded-xl hover:bg-primary-light transition-colors"
                >
                  Clear Filters
                </button>
              ) : (
                <button
                  onClick={() => router.push('/CollaborationPage')}
                  className="bg-primary text-baby-powder px-6 py-3 rounded-xl hover:bg-primary-light transition-colors"
                >
                  Find Collaborators
                </button>
              )}
            </div>
          ) : (
            // inside page.tsx where you render CollaborationTable (replace the existing call)
<CollaborationTable
  collaborations={collaborations}
  currentUserId={currentUserId}
  getCollaboratorInfo={getCollaboratorInfo}
  formatDaysLeft={formatDaysLeft}
  onUpdateCollaboration={(updated) => {
    // update local state to keep view consistent after action
    setCollaborations((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
    // also refresh activeCollaborations if needed:
    setActiveCollaborations((prev) => {
      const exists = prev.find((p) => p.id === updated.id);
      if (exists) return prev.map((p) => (p.id === updated.id ? updated : p));
      // if status moved to in_progress or accepted and should be in active list, optionally add it
      if (updated.status === 'in_progress' || updated.status === 'accepted') {
        return [updated, ...prev];
      }
      // if status moved out of active set (completed/cancelled), remove it
      if (updated.status === 'completed' || updated.status === 'cancelled' || updated.status === 'declined') {
        return prev.filter((p) => p.id !== updated.id);
      }
      return prev;
    });
  }}
/>

          )}
        </div>
      </div>
    </div>
  );
};

export default MyCollaborationsPage;