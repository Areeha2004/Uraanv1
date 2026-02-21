import React from 'react';
import { AlertTriangle, Calendar, DollarSign, User } from 'lucide-react';
import CollaborationStatusBadge from './CollaborationStatusBadge';
import { Collaboration } from '../types/collaboration';

interface CollaborationTableProps {
  collaborations: Collaboration[];
  currentUserId: string;
  getCollaboratorInfo: (collaboration: Collaboration, currentUserId: string) => {
    collaborator: { id: string; name: string; image?: string };
    role: string;
    isClient: boolean;
  };
  formatDaysLeft: (daysLeft?: number) => { text: string; isOverdue: boolean } | null;
  onUpdateCollaboration?: (updated: Collaboration) => void;
}

const CollaborationTable: React.FC<CollaborationTableProps> = ({
  collaborations,
  currentUserId,
  getCollaboratorInfo,
  formatDaysLeft,
}) => {
  const formatBudget = (budget?: string | number | null) => {
    if (!budget) return 'Not specified';
    if (typeof budget === 'number') return `PKR ${budget.toLocaleString()}`;
    return budget;
  };

  const formatDate = (dateString?: string | null) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const calculateDaysLeft = (deadline?: string | null) => {
    if (!deadline) return null;
    const now = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - now.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="premium-card overflow-hidden rounded-3xl border border-primary/15 bg-baby-powder/85">
      <div className="hidden overflow-x-auto lg:block">
        <table className="w-full min-w-[900px]">
          <thead className="border-b border-primary/15 bg-primary/8">
            <tr>
              <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-[0.08em] text-text/62">Collaborator</th>
              <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-[0.08em] text-text/62">Role</th>
              <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-[0.08em] text-text/62">Project</th>
              <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-[0.08em] text-text/62">Status</th>
              <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-[0.08em] text-text/62">Budget</th>
              <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-[0.08em] text-text/62">Deadline</th>
              <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-[0.08em] text-text/62">Created</th>
            </tr>
          </thead>
          <tbody>
            {collaborations.map((collaboration, index) => {
              const { collaborator, role } = getCollaboratorInfo(collaboration, currentUserId);
              const daysLeft = calculateDaysLeft(collaboration.deadline);
              const daysLeftInfo = formatDaysLeft(daysLeft ?? undefined);
              return (
                <tr
                  key={collaboration.id}
                  className={`border-b border-primary/10 transition-colors hover:bg-primary/5 ${
                    index % 2 === 0 ? 'bg-baby-powder/80' : 'bg-baby-powder/60'
                  }`}
                >
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={collaborator.image || '/default-profile.png'}
                        alt={collaborator.name}
                        className="h-10 w-10 rounded-full border border-primary/20 object-cover"
                      />
                      <p className="text-sm font-semibold text-text">{collaborator.name}</p>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <p className="inline-flex items-center gap-1 text-xs uppercase tracking-[0.08em] text-text/65">
                      <User size={12} className="text-primary" />
                      {role}
                    </p>
                  </td>
                  <td className="px-4 py-4">
                    <div>
                      <p className="max-w-xs truncate text-sm font-semibold text-text">
                        {collaboration.title || 'Untitled collaboration'}
                      </p>
                      <p className="max-w-xs truncate text-xs text-text/62">
                        {collaboration.projectDescription || 'No description'}
                      </p>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <CollaborationStatusBadge status={collaboration.status} size="sm" />
                  </td>
                  <td className="px-4 py-4">
                    <p className="inline-flex items-center gap-1 text-sm text-text">
                      <DollarSign size={14} className="text-primary" />
                      {formatBudget(collaboration.budget)}
                    </p>
                  </td>
                  <td className="px-4 py-4">
                    <div className="space-y-1">
                      <p className="inline-flex items-center gap-1 text-sm text-text">
                        <Calendar size={14} className="text-primary" />
                        {collaboration.deadline ? formatDate(collaboration.deadline) : 'No deadline'}
                      </p>
                      {daysLeftInfo && (
                        <p
                          className={`inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.08em] ${
                            daysLeftInfo.isOverdue ? 'text-red-600' : 'text-sky-700'
                          }`}
                        >
                          {daysLeftInfo.isOverdue && <AlertTriangle size={11} />}
                          {daysLeftInfo.text}
                        </p>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-xs uppercase tracking-[0.08em] text-text/55">
                    {formatDate(collaboration.createdAt)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="space-y-3 p-4 lg:hidden">
        {collaborations.map((collaboration) => {
          const { collaborator, role } = getCollaboratorInfo(collaboration, currentUserId);
          const daysLeft = calculateDaysLeft(collaboration.deadline);
          const daysLeftInfo = formatDaysLeft(daysLeft ?? undefined);
          return (
            <article key={collaboration.id} className="rounded-2xl border border-primary/15 bg-baby-powder/92 p-4">
              <div className="mb-3 flex items-start justify-between gap-2">
                <div className="flex items-center gap-3">
                  <img
                    src={collaborator.image || '/default-profile.png'}
                    alt={collaborator.name}
                    className="h-10 w-10 rounded-full border border-primary/20 object-cover"
                  />
                  <div>
                    <p className="text-sm font-semibold text-text">{collaborator.name}</p>
                    <p className="text-[11px] uppercase tracking-[0.08em] text-text/55">{role}</p>
                  </div>
                </div>
                <CollaborationStatusBadge status={collaboration.status} size="sm" />
              </div>

              <p className="text-sm font-semibold text-text">{collaboration.title || 'Untitled collaboration'}</p>
              <p className="mt-1 text-sm text-text/65 line-clamp-2">
                {collaboration.projectDescription || 'No description'}
              </p>

              <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                <p className="inline-flex items-center gap-1 text-xs uppercase tracking-[0.08em] text-text/60">
                  <DollarSign size={13} className="text-primary" />
                  {formatBudget(collaboration.budget)}
                </p>
                <p className="inline-flex items-center gap-1 text-xs uppercase tracking-[0.08em] text-text/60">
                  <Calendar size={13} className="text-primary" />
                  {collaboration.deadline ? formatDate(collaboration.deadline) : 'No deadline'}
                </p>
              </div>
              {daysLeftInfo && (
                <p
                  className={`mt-2 inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.08em] ${
                    daysLeftInfo.isOverdue ? 'text-red-600' : 'text-sky-700'
                  }`}
                >
                  {daysLeftInfo.isOverdue && <AlertTriangle size={11} />}
                  {daysLeftInfo.text}
                </p>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default CollaborationTable;
